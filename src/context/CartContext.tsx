'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartItemsNumber } from '@/app/utils/api';
import Cookies from 'js-cookie';

const CartContext = createContext<any>(null);

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    // Only fetch cart items if the token exists (user is logged in)
    if (!Cookies.get('token')) return;
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
    // Only update the cart count if the token exists
    if (!Cookies.get('token')) return;
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
