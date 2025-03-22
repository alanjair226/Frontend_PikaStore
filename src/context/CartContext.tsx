'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartItemsNumber } from '@/app/utils/api';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';

const CartContext = createContext<any>(null);

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    // If the user is not logged in, reset the cart count to 0
    if (!isLoggedIn) {
      setCartItemsCount(0);
      return;
    }
    // Only fetch cart items if the token exists (user is logged in)
    const fetchCartItems = async () => {
      try {
        const itemsCount = await getCartItemsNumber();
        setCartItemsCount(itemsCount);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [isLoggedIn]); // re-run effect when isLoggedIn changes

  const updateCartCount = async () => {
    if (!isLoggedIn) {
      setCartItemsCount(0);
      return;
    }
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
