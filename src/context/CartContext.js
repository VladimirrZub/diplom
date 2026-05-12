import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('clearbreath_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed);
        if (parsed.length > 0) setIsVisible(true);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clearbreath_cart', JSON.stringify(items));
    setIsVisible(items.length > 0);
  }, [items]);

  const addToCart = (service) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) { removeFromCart(id); return; }
    setItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, isVisible, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, itemCount: items.length
    }}>
      {children}
    </CartContext.Provider>
  );
};