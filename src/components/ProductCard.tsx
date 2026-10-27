import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface Props {
  product: Product;
  onAdd: () => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch({ type: 'ADD', item: product });
    onAdd();
  }

  return (
    <div className="pcard" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="pcard-img-wrap">
        <img src={product.image} alt={product.name} className="pcard-img" />
        {discount && <span className="pcard-badge">-{discount}%</span>}
      </div>
      <div className="pcard-body">
        <span className="pcard-category">{product.category}</span>
        <h3 className="pcard-name">{product.name}</h3>
        <div className="pcard-price-row">
          <span className="pcard-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="pcard-original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <button className="pcard-btn" onClick={handleAdd}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
