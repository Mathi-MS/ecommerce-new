import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../products';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=500&fit=crop',
    tag: 'New Collection',
    title: 'Big or small,\nmake it better.',
    desc: 'From the first coat of paint to that one missing screw, find the good stuff for every fix, refresh and big idea.',
    btn: 'Explore the Shop',
  },
  {
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=500&fit=crop',
    tag: 'Summer Sale',
    title: 'Up to 40% off\non top brands.',
    desc: 'Shop the biggest deals of the season. Limited time offers on electronics, fashion, and more.',
    btn: 'Shop the Sale',
  },
  {
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1400&h=500&fit=crop',
    tag: 'Free Shipping',
    title: 'Delivered to\nyour doorstep.',
    desc: 'Free shipping on all orders over ₹4,999. Fast, reliable delivery with real-time tracking.',
    btn: 'Start Shopping',
  },
];

const categories_list = [
  { name: 'Paints', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&h=200&fit=crop' },
  { name: 'Tools', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop' },
  { name: 'Lighting', image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=200&h=200&fit=crop' },
  { name: 'Flooring', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
  { name: 'Plumbing', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&h=200&fit=crop' },
  { name: 'Electrical', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=200&fit=crop' },
  { name: 'Hardware', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&h=200&fit=crop' },
  { name: 'Garden', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop' },
  { name: 'Safety', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop' },
  { name: 'Adhesives', image: 'https://images.unsplash.com/photo-1609205807107-2d5e9e5e5e5e?w=200&h=200&fit=crop' },
  { name: 'Storage', image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=200&h=200&fit=crop' },
  { name: 'Doors', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop' },
  { name: 'Windows', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop' },
  { name: 'Fasteners', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop' },
  { name: 'Cleaning', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop' },
];

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Delivery that shows up',
    desc: 'Careful packing, clear updates',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Good stuff, fairly priced',
    desc: 'Picked for everyday projects',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    title: 'Real people, real advice',
    desc: 'Not sure? Just ask us',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    title: 'Easy to get started',
    desc: 'Essentials in one place',
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState<string>('All');
  const [toast, setToast] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const navigate = useNavigate();
  const catScrollRef = useRef<HTMLDivElement>(null);

  // Carousel auto-advance
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Category auto-scroll every 2s
  useEffect(() => {
    const el = catScrollRef.current;
    if (!el) return;
    const t = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: 180, behavior: 'smooth' });
      }
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const categories: string[] = ['All', ...new Set(products.map(p => p.category))];
  const filtered = category === 'All' ? products : products.filter(p => p.category === category);

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  function handleViewAll() {
    if (window.innerWidth <= 768) {
      navigate('/categories');
    } else {
      setDrawerOpen(true);
    }
  }

  return (
    <>
      {/* ── Carousel ── */}
      <div className="carousel-wrapper">
        <div className="carousel">
        {slides.map((s, i) => (
          <div key={i} className={`carousel-slide${i === current ? ' active' : ''}`}>
            <img src={s.image} alt={s.title} className="carousel-img" />
            <div className="carousel-overlay" />
            <div className="carousel-content">
              <div className="carousel-inner">
                <span className="carousel-tag">{s.tag}</span>
                <h1 className="carousel-title">{s.title}</h1>
                <p className="carousel-desc">{s.desc}</p>
                <button className="carousel-btn" onClick={() => navigate('/')}>{s.btn} →</button>
              </div>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="carousel-arrow carousel-arrow--prev" onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}>&#8249;</button>
        <button className="carousel-arrow carousel-arrow--next" onClick={() => setCurrent(c => (c + 1) % slides.length)}>&#8250;</button>

        {/* Dots */}
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button key={i} className={`carousel-dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />
          ))}
        </div>
        </div>
      </div>
      <div className="features-wrapper">
        <section className="features-strip">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              <div className="feature-icon">{f.icon}</div>
              <div>
                <p className="feature-title">{f.title}</p>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ── Categories ── */}
      <div className="cat-section">
        <div className="cat-section-header">
          <div>
            <h2 className="cat-section-title">Shop by Category</h2>
            <p className="cat-section-sub">Explore our wide range of products across all categories</p>
          </div>
          <button className="view-all-cats-btn" onClick={handleViewAll}>View All Categories →</button>
        </div>
        <div className="cat-scroll" ref={catScrollRef}>
          {categories_list.map((cat, i) => (
            <div key={i} className="cat-card" onClick={() => navigate(`/categories/${encodeURIComponent(cat.name)}`)}>
              <div className="cat-card-img">
                <img src={cat.image} alt={cat.name} />
              </div>
              <p className="cat-card-name">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Promo Banner ── */}
      <div className="container">
        <div className="promo-banner">
          <div className="promo-banner-circles" />
          <div className="promo-banner-content">
            <p className="promo-banner-eyebrow">THIS WEEK'S GOOD FIND</p>
            <h2 className="promo-banner-title">Give your walls a fresh start.</h2>
            <p className="promo-banner-sub">Save ₹300 on selected 4 L interior paints. A little colour goes a long way.</p>
          </div>
          <button className="promo-banner-btn">Shop paint deals ↗</button>
        </div>
      </div>

      {/* ── Products ── */}
      <div className="container">
        <div className="products-section-header">
          <h2 className="products-section-title">Our Best Products</h2>
          <p className="products-section-sub">Handpicked favourites loved by thousands of customers</p>
        </div>
        <div className="category-filters">
          {categories.map(c => (
            <button
              key={c}
              className={`cat-btn${category === c ? ' cat-btn--active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="products-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={showToast} />
          ))}
        </div>
      </div>

      {/* ── Categories Drawer ── */}
      {drawerOpen && <div className="drawer-overlay" onClick={() => { setDrawerOpen(false); setDrawerSearch(''); }} />}
      <div className={`cat-drawer${drawerOpen ? ' cat-drawer--open' : ''}`}>
        <div className="cat-drawer-header">
          <div className="cat-drawer-header-bg">
            <button className="cat-drawer-close" onClick={() => { setDrawerOpen(false); setDrawerSearch(''); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="cat-drawer-header-body">
              <div className="cat-drawer-header-left">
                <div className="cat-drawer-header-icon-wrap">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                <div>
                  <h3 className="cat-drawer-title">Categories</h3>
                  <p className="cat-drawer-subtitle">{categories_list.length} departments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cat-drawer-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            placeholder="Search categories..."
            value={drawerSearch}
            onChange={e => setDrawerSearch(e.target.value)}
            autoFocus
          />
          {drawerSearch && <button className="cat-drawer-search-clear" onClick={() => setDrawerSearch('')}>✕</button>}
        </div>
        <div className="cat-drawer-list">
          {categories_list.filter(c => c.name.toLowerCase().includes(drawerSearch.toLowerCase())).map((cat, i) => (
            <div key={i} className="cat-drawer-item" onClick={() => { setDrawerOpen(false); setDrawerSearch(''); navigate(`/categories/${encodeURIComponent(cat.name)}`); }}>
              <img src={cat.image} alt={cat.name} className="cat-drawer-img" />
              <span className="cat-drawer-name">{cat.name}</span>
              <svg className="cat-drawer-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          ))}
          {categories_list.filter(c => c.name.toLowerCase().includes(drawerSearch.toLowerCase())).length === 0 && (
            <p className="cat-drawer-empty">No categories found</p>
          )}
        </div>
        <div className="cat-drawer-footer">
          <button className="cat-drawer-fullpage" onClick={() => { setDrawerOpen(false); setDrawerSearch(''); navigate('/categories'); }}>
            View Full Page
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {toast && <div className="toast">✅ Added to cart!</div>}
    </>
  );
}
