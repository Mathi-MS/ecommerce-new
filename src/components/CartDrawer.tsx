import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, dispatch, cartOpen, setCartOpen } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);

  function goToCart() {
    setCartOpen(false);
    navigate('/cart');
  }

  return (
    <>
      {cartOpen && <div className="drawer-overlay" onClick={() => setCartOpen(false)} />}
      <div className={`cart-drawer${cartOpen ? ' cart-drawer--open' : ''}`}>

        {/* ── Header ── */}
        <div className="cd-header">
          <div className="cd-header-left">
            <div className="cd-header-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <div>
              <h3 className="cd-title">Shopping Cart</h3>
              <p className="cd-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button className="cd-close" onClick={() => setCartOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* ── Items ── */}
        <div className="cd-body">
          {cart.length === 0 ? (
            <div className="cd-empty">
              <div className="cd-empty-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
              </div>
              <h4 className="cd-empty-title">Your cart is empty</h4>
              <p className="cd-empty-sub">Looks like you haven't added anything yet.</p>
              <button className="cd-empty-btn" onClick={() => setCartOpen(false)}>Start Shopping</button>
            </div>
          ) : (
            <div className="cd-items">
              {cart.map(item => {
                const discount = item.originalPrice
                  ? Math.round((1 - item.price / item.originalPrice) * 100)
                  : null;
                return (
                  <div key={item.id} className="cd-item">
                    <div className="cd-item-img-wrap">
                      <img src={item.image} alt={item.name} />
                      {discount && <span className="cd-item-badge">-{discount}%</span>}
                    </div>
                    <div className="cd-item-info">
                      <p className="cd-item-cat">{item.category}</p>
                      <p className="cd-item-name">{item.name}</p>
                      <div className="cd-item-price-row">
                        <span className="cd-item-price">${item.price.toFixed(2)}</span>
                        {item.originalPrice && <span className="cd-item-original">${item.originalPrice.toFixed(2)}</span>}
                      </div>
                      <div className="cd-item-actions">
                        <div className="cd-qty">
                          <button onClick={() => item.qty === 1
                            ? dispatch({ type: 'REMOVE', id: item.id })
                            : dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}>+</button>
                        </div>
                        <button className="cd-remove" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {cart.length > 0 && (
          <div className="cd-footer">
            <div className="cd-subtotal">
              <span>Subtotal <span className="cd-subtotal-note">({totalItems} items)</span></span>
              <span className="cd-subtotal-price">${total.toFixed(2)}</span>
            </div>
            <p className="cd-shipping-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              Free shipping on orders over ₹4,999
            </p>
            <button className="cd-checkout-btn" onClick={goToCart}>
              View Full Cart
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
