import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const CART_STORAGE_KEY = 'cartItems';

const saveCartToStorage = (cartItems) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
};

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);
  return savedCart ? JSON.parse(savedCart) : [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(loadCartFromStorage());

  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  const addToCart = async (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    saveCartToStorage(updatedCartItems);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    saveCartToStorage(updatedCartItems);
  };

  const updateCartItem = (updatedItem) => {
    const updatedCartItems = cartItems.map((item) => item.id === updatedItem.id ? updatedItem : item);
    setCartItems(updatedCartItems);
    saveCartToStorage(updatedCartItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.medCost * (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, calculateTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
