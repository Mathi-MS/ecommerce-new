import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../products';

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
  // product categories
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&h=200&fit=crop' },
  { name: 'Home', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=200&h=200&fit=crop' },
];

export default function CategoryDetail() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  const decoded = name ? decodeURIComponent(name) : '';
  const filtered = products.filter(p => p.category === decoded);

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  // All categories page (no name param or name === 'all')
  if (!decoded || decoded === 'all') {
    return (
      <div className="cat-page-wrapper">
        <div className="cat-page-banner">
          <div className="cat-page-banner-inner">
            <h1 className="cat-page-title">All Categories</h1>
            <div className="pd-breadcrumb">
              <span onClick={() => navigate('/')}>Home</span>
              <span className="pd-breadcrumb-sep">›</span>
              <span className="pd-breadcrumb-current">All Categories</span>
            </div>
          </div>
        </div>
        <div className="container" style={{marginTop: '2rem'}}>
          <div className="all-cats-grid">
            {categories_list.map((cat, i) => (
              <div key={i} className="all-cat-card" onClick={() => navigate(`/categories/${encodeURIComponent(cat.name)}`)}>
                <div className="all-cat-img"><img src={cat.image} alt={cat.name} /></div>
                <p className="all-cat-name">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cat-page-wrapper">
      <div className="cat-page-banner">
        <div className="cat-page-banner-inner">
          <h1 className="cat-page-title">{decoded}</h1>
          <div className="pd-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span onClick={() => navigate('/categories')}>Categories</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span className="pd-breadcrumb-current">{decoded}</span>
          </div>
        </div>
      </div>
      <div className="container" style={{marginTop: '2rem'}}>
        {filtered.length === 0 ? (
          <div className="cat-empty">
            <p>No products found in <strong>{decoded}</strong> yet.</p>
            <button className="view-all-cats-btn" onClick={() => navigate('/categories')}>Browse All Categories</button>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAdd={showToast} />
            ))}
          </div>
        )}
      </div>
      {toast && <div className="toast">✅ Added to cart!</div>}
    </div>
  );
}
