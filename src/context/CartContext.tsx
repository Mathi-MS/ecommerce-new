import React, { createContext, useContext, useReducer, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

type CartAction =
  | { type: 'ADD'; item: Product }
  | { type: 'REMOVE'; id: number }
  | { type: 'UPDATE_QTY'; id: number; qty: number };

interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'UPDATE_QTY':
      return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i);
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartContext.Provider value={{ cart, dispatch, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
