import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../products';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const product = products.find(p => p.id === parseInt(id ?? ''));
  if (!product) return <div className="container">Product not found.</div>;

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  // Generate 4 thumb variants from same image with different crops
  const thumbs = [
    product.image,
    product.image.replace('fit=crop', 'fit=crop&crop=top'),
    product.image.replace('fit=crop', 'fit=crop&crop=bottom'),
    product.image.replace('fit=crop', 'fit=crop&crop=left'),
    product.image.replace('fit=crop', 'fit=crop&crop=right'),
  ];

  const related = products.filter(p => p.category === product.category && p.id !== product.id);
  const [toastMsg, setToastMsg] = useState(false);

  function showToast() {
    setToastMsg(true);
    setTimeout(() => setToastMsg(false), 2000);
  }

  function handleAdd() {
    for (let i = 0; i < qty; i++) dispatch({ type: 'ADD', item: product! });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="pd-wrapper">
      {/* ── Banner ── */}
      <div className="cat-page-banner">
        <div className="cat-page-banner-inner">
          <h1 className="cat-page-title">{product.name}</h1>
          <div className="pd-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span onClick={() => navigate('/categories')}>Categories</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span onClick={() => navigate(`/categories/${encodeURIComponent(product.category)}`)}>{product.category}</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span className="pd-breadcrumb-current">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Detail Body ── */}
      <div className="container">
        <div className="pd-body">

          {/* Left — Gallery */}
          <div className="pd-gallery">
            <div className="pd-main-img">
              <img src={thumbs[activeImg]} alt={product.name} />
              {discount && <span className="pcard-badge">-{discount}%</span>}
            </div>
            <div className="pd-thumbs-wrap">
              <div className="pd-thumbs" ref={thumbsRef}>
                {thumbs.map((t, i) => (
                  <div key={i} className={`pd-thumb${activeImg === i ? ' pd-thumb--active' : ''}`} onClick={() => setActiveImg(i)}>
                    <img src={t} alt={`view ${i + 1}`} />
                  </div>
                ))}
              </div>
              <button className="pd-thumbs-chevron" onClick={() => thumbsRef.current?.scrollBy({ left: 100, behavior: 'smooth' })}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Right — Info */}
          <div className="pd-info">
            <span className="pd-category">{product.category}</span>
            <h2 className="pd-title">{product.name}</h2>

            {/* Price */}
            <div className="pd-price-row">
              <span className="pd-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="pd-original">${product.originalPrice.toFixed(2)}</span>
                  <span className="pd-discount-badge">-{discount}% OFF</span>
                </>
              )}
            </div>
            {product.originalPrice && (
              <p className="pd-savings">You save ${(product.originalPrice - product.price).toFixed(2)}</p>
            )}

            <div className="pd-divider" />

            {/* Description */}
            <p className="pd-desc">{product.description}</p>

            <div className="pd-divider" />

            {/* Qty */}
            <div className="pd-qty-row">
              <span className="pd-label">Quantity</span>
              <div className="pd-qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pd-actions">
              <button className="pd-btn-cart" onClick={handleAdd}>
                {added ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                )}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="pd-btn-buy" onClick={handleAdd}>Buy Now</button>
            </div>

            {/* Meta */}
            <div className="pd-meta">
              <div className="pd-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                Free delivery on orders over ₹4,999
              </div>
              <div className="pd-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                1 Year Warranty
              </div>
              <div className="pd-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
                Easy 30-day returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {added && <div className="toast">Added to cart!</div>}
      {toastMsg && <div className="toast">✅ Added to cart!</div>}

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div className="container">
          <div className="pd-related">
            <div className="pd-related-header">
              <div>
                <h3 className="pd-related-title">More from {product.category}</h3>
                <p className="pd-related-sub">You might also like these</p>
              </div>
              <button className="view-all-cats-btn" onClick={() => navigate(`/categories/${encodeURIComponent(product.category)}`)}>View all →</button>
            </div>
            <div className="products-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} onAdd={showToast} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
