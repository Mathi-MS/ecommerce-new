import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const savings = cart.reduce((sum, i) => sum + ((i.originalPrice ?? i.price) - i.price) * i.qty, 0);
  const shipping = subtotal >= 4999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) return (
    <div className="cart-page-wrapper">
      <div className="cat-page-banner">
        <div className="cat-page-banner-inner">
          <h1 className="cat-page-title">Shopping Cart</h1>
          <div className="pd-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span className="pd-breadcrumb-current">Shopping Cart</span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="cart-empty-state">
          <div className="cart-empty-icon">
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h2 className="cart-empty-title">Your cart is empty</h2>
          <p className="cart-empty-sub">Looks like you haven't added anything yet. Start exploring our products!</p>
          <button className="cart-empty-btn" onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cart-page-wrapper">
      {/* Banner */}
      <div className="cat-page-banner">
        <div className="cat-page-banner-inner">
          <h1 className="cat-page-title">Shopping Cart</h1>
          <div className="pd-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="pd-breadcrumb-sep">›</span>
            <span className="pd-breadcrumb-current">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cart-layout">

          {/* ── Left: Items ── */}
          <div className="cart-items-col">
            <div className="cart-items-header">
              <span>Product</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
            </div>

            {cart.map(item => {
              const discount = item.originalPrice
                ? Math.round((1 - item.price / item.originalPrice) * 100)
                : null;
              return (
                <div className="cart-row" key={item.id}>
                  {/* Image */}
                  <div className="cart-row-product">
                    <div className="cart-row-img-wrap">
                      <img src={item.image} alt={item.name} />
                      {discount && <span className="pcard-badge">-{discount}%</span>}
                    </div>
                    <div className="cart-row-info">
                      <span className="cart-row-cat">{item.category}</span>
                      <p className="cart-row-name">{item.name}</p>
                      {item.originalPrice && (
                        <p className="cart-row-save">You save ${((item.originalPrice - item.price) * item.qty).toFixed(2)}</p>
                      )}
                      <button className="cart-row-remove" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="cart-row-price">
                    <span className="cart-row-cur">${item.price.toFixed(2)}</span>
                    {item.originalPrice && <span className="cart-row-orig">${item.originalPrice.toFixed(2)}</span>}
                  </div>

                  {/* Qty */}
                  <div className="cart-row-qty">
                    <button onClick={() => item.qty === 1 ? dispatch({ type: 'REMOVE', id: item.id }) : dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}>+</button>
                  </div>

                  {/* Total */}
                  <div className="cart-row-total">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Summary ── */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <h3 className="cart-summary-title">Order Summary</h3>

              <div className="cart-summary-rows">
                <div className="cart-summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="cart-summary-row cart-summary-row--green">
                    <span>Total Savings</span>
                    <span>−${savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="cart-free">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {shipping > 0 && (
                <p className="cart-free-note">
                  Add <strong>${(4999 - subtotal).toFixed(2)}</strong> more for free shipping!
                </p>
              )}

              <button className="cart-checkout-btn" onClick={() => alert('Checkout coming soon!')}>
                Proceed to Checkout
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
              </button>

              <div className="cart-trust">
                <div className="cart-trust-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  Secure Checkout
                </div>
                <div className="cart-trust-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
                  Easy Returns
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
