import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../products';
import { Product } from '../types';

function highlight(text: string, query: string) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="search-highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface SearchBarProps {
  autoFocus?: boolean;
  /** Called after the user picks a result, e.g. to close the mobile search row */
  onDone?: () => void;
}

export default function SearchBar({ autoFocus, onDone }: SearchBarProps = {}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const trimmed = query.trim();

  const matched: Product[] = trimmed
    ? products.filter(p =>
        p.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        p.category.toLowerCase().includes(trimmed.toLowerCase())
      )
    : [];

  // suggestions: unique category + name combos that contain the query
  const suggestions: string[] = trimmed
    ? Array.from(
        new Set(
          products
            .filter(p => p.name.toLowerCase().includes(trimmed.toLowerCase()))
            .map(p => p.name)
        )
      ).slice(0, 4)
    : [];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleViewAll() {
    setOpen(false);
    navigate(`/?q=${encodeURIComponent(trimmed)}`);
    onDone?.();
  }

  function handleSuggestion(s: string) {
    setQuery(s);
    navigate(`/?q=${encodeURIComponent(s)}`);
    setOpen(false);
    onDone?.();
  }

  function handleProductClick(id: number) {
    setOpen(false);
    navigate(`/product/${id}`);
    onDone?.();
  }

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className={`search-pill${open ? ' search-pill--active' : ''}`}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="I'm looking for..."
          autoFocus={autoFocus}
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => { if (e.key === 'Enter' && trimmed) handleViewAll(); }}
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); setOpen(false); }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {open && trimmed && (
        <div className="search-panel">
          <p className="search-panel-title">
            Search for <strong>"{trimmed}"</strong>
          </p>

          {suggestions.length > 0 && (
            <>
              <p className="search-section-label">Suggestions</p>
              <div className="search-suggestions">
                {suggestions.map(s => (
                  <span key={s} className="search-suggestion-tag" onClick={() => handleSuggestion(s)}>
                    {highlight(s, trimmed)}
                  </span>
                ))}
              </div>
            </>
          )}

          {matched.length > 0 && (
            <div className="search-products">
              {matched.slice(0, 3).map(p => (
                <div key={p.id} className="search-product-card" onClick={() => handleProductClick(p.id)}>
                  <img src={p.image} alt={p.name} />
                  <div className="search-product-info">
                    <p className="search-product-name">{highlight(p.name, trimmed)}</p>
                    <p className="search-product-price">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {matched.length === 0 && (
            <p className="search-no-results">No products found for "{trimmed}"</p>
          )}

          {matched.length > 0 && (
            <div className="search-view-all">
              <button onClick={handleViewAll}>View All Results</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
