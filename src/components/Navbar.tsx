import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import { FiPhone, FiMail } from 'react-icons/fi';
import CartDrawer from './CartDrawer';

const announcements = [
  'Free Shipping Across India for All Orders Over ₹4,999',
  'Use code FIRST10 for 10% off your first order!',
  'New arrivals every week — Shop Now!',
];

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Hinges & Drawer Runners', items: ['Hinges', 'Drawer Runners', 'Soft Close'] },
  { label: 'Wardrobe & Bed Fittings', items: ['Wardrobe Lifts', 'Bed Fittings', 'Sliding Systems'] },
  { label: 'Kitchen Fittings & Accessories', items: ['Pull-out Baskets', 'Corner Units', 'Handles'] },
  { label: 'Door & Bath Fittings', items: ['Door Closers', 'Towel Bars', 'Hooks'] },
  { label: 'Locking Systems', items: ['Cam Locks', 'Deadbolts', 'Padlocks'] },
  { label: 'Other', items: ['Tools', 'Adhesives', 'Accessories'] },
];

function NavLinks() {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { cart, setCartOpen } = useCart();
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile search on page scroll, tap outside, or Escape
  const searchRowRef = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mobileSearchOpen) return;
    const startY = window.scrollY;
    function handleScroll() {
      // Small threshold so the keyboard opening / focus nudge doesn't close it
      if (Math.abs(window.scrollY - startY) > 40) setMobileSearchOpen(false);
    }
    function handleOutside(e: PointerEvent) {
      const target = e.target as Node;
      if (searchRowRef.current?.contains(target) || searchBtnRef.current?.contains(target)) return;
      setMobileSearchOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileSearchOpen(false);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('pointerdown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerdown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [mobileSearchOpen]);

  // Lock page scroll and allow Escape to close while the drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [mobileOpen]);

  return (
    <div ref={navRef}>
      <div className="middle-bar">
        <div className="middle-bar-inner">
          <div className="contact-info">
            <span><FiPhone size={13} /> +91 9876543211</span>
            <span><FiMail size={13} /> sunglasses@gmail.com</span>
          </div>
          <Link to="/" className="brand">
            <div className="brand-logo">S</div>
            <span className="brand-name">SHOP REACT</span>
          </Link>
          <div className="middle-right">
            <SearchBar />
            <button
              ref={searchBtnRef}
              className="icon-btn mobile-search-btn"
              title="Search"
              aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
              aria-expanded={mobileSearchOpen}
              onClick={() => setMobileSearchOpen(o => !o)}
            >
              {mobileSearchOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              }
            </button>
            <button className="icon-btn badge-btn" title="Cart" onClick={() => setCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </button>
            <button className="hamburger" onClick={() => setMobileOpen(true)} title="Menu" aria-label="Open menu" aria-expanded={mobileOpen}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
        {mobileSearchOpen && (
          <div className="mobile-search-row" ref={searchRowRef}>
            <SearchBar autoFocus onDone={() => setMobileSearchOpen(false)} />
          </div>
        )}
      </div>

      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {navLinks.map(link => (
            <div
              key={link.label}
              className="nav-item"
              // Hover only for real mice; on touch tablets the tap (onClick) toggles instead
              onPointerEnter={e => e.pointerType === 'mouse' && link.items && setOpenDropdown(link.label)}
              onPointerLeave={e => e.pointerType === 'mouse' && setOpenDropdown(null)}
            >
              {link.to ? (
                <Link to={link.to} className="nav-link">{link.label}</Link>
              ) : (
                <span
                  className="nav-link"
                  onClick={() => setOpenDropdown(o => o === link.label ? null : link.label)}
                >
                  {link.label}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: 4 }}><polyline points="6 9 12 15 18 9"/></svg>
                </span>
              )}
              {link.items && openDropdown === link.label && (
                <div className="dropdown">
                  {link.items.map(item => (
                    <div key={item} className="dropdown-item">{item}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Rendered in body: the sticky header's transform would otherwise trap position: fixed */}
      {createPortal(
        <>
          <div
            className={`mobile-overlay${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(false)}
          />
          <aside className={`mobile-menu${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen}>
            <div className="mobile-menu-header">
              <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
                <div className="brand-logo">S</div>
                <span className="brand-name">SHOP REACT</span>
              </Link>
              <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="mobile-menu-body">
              {navLinks.map(link => (
                <div key={link.label}>
                  {link.to ? (
                    <div className="mobile-nav-link" onClick={() => { navigate(link.to!); setMobileOpen(false); }}>{link.label}</div>
                  ) : (
                    <>
                      <div
                        className={`mobile-nav-link${mobileExpanded === link.label ? ' expanded' : ''}`}
                        onClick={() => setMobileExpanded(e => e === link.label ? null : link.label)}
                      >
                        {link.label}
                        <svg className="mobile-nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      </div>
                      {mobileExpanded === link.label && (
                        <div className="mobile-sub-list">
                          {link.items?.map(item => (
                            <div key={item} className="mobile-sub" onClick={() => setMobileOpen(false)}>{item}</div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <a href="tel:+919876543211"><FiPhone size={14} /> +91 9876543211</a>
              <a href="mailto:sunglasses@gmail.com"><FiMail size={14} /> sunglasses@gmail.com</a>
            </div>
          </aside>
        </>,
        document.body
      )}
    </div>
  );
}

export default function Navbar() {
  const [annIdx, setAnnIdx] = useState(0);
  const [annDismissed, setAnnDismissed] = useState(false);
  const [annHidden, setAnnHidden] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setAnnHidden(y > lastScrollY.current && y > 40);
      lastScrollY.current = y;
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      setShowSticky(headerBottom <= 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setAnnIdx(i => (i + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Normal header — stays in document flow */}
      <header ref={headerRef}>
        {!annDismissed && (
          <div className={`announcement-bar${annHidden ? ' ann-hidden' : ''}`}>
            <button className="ann-arrow" onClick={() => setAnnIdx(i => (i - 1 + announcements.length) % announcements.length)}>&#8249;</button>
            <span>{announcements[annIdx]}</span>
            <button className="ann-arrow" onClick={() => setAnnIdx(i => (i + 1) % announcements.length)}>&#8250;</button>
            <button className="ann-close" onClick={() => setAnnDismissed(true)}>&#10005;</button>
          </div>
        )}
        <NavLinks />
      </header>

      {/* Sticky header — fixed, slides in from top after original is out of view */}
      <div className={`sticky-header${showSticky ? ' sticky-header--visible' : ''}`}>
        <NavLinks />
      </div>
      <CartDrawer />
    </>
  );
}
