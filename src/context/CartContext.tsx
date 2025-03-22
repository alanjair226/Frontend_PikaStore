'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartItemsNumber } from '@/app/utils/api';

const CartContext = createContext<any>(null);

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    // Fetch the cart item count whenever the user logs in
    const fetchCartItems = async () => {
      try {
        const itemsCount = await getCartItemsNumber();
        setCartItemsCount(itemsCount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const updateCartCount = async () => {
    try {
      const itemsCount = await getCartItemsNumber();
      setCartItemsCount(itemsCount);
    } catch (error) {
      console.error('Error updating cart item count:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItemsCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
