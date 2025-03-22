'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemsCount } = useCart();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push('/auth/login'); // Redirect to login if not logged in
    } else {
      router.push('/cart'); // Otherwise, go to the cart page
    }
  };

  // Close the menu if a click is detected outside of the profile menu area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-accents p-4 px-4 font-pixel md:px-24 lg:px-32 shadow">
      <div className="flex justify-between items-center">
        {/* Left Side: Logo & Home Link and Pokedex Link */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <div className="flex items-center space-x-2 gap-4 cursor-pointer">
              <Image
                src="/Logo.PNG"
                alt="PikaStore Logo"
                width={48}
                height={48}
              />
              <div className="text-white text-xl md:text-3xl">PikaStore</div>
            </div>
          </Link>
          <Link href="/">
            <div className="text-white text-lg cursor-pointer">Pokedex</div>
          </Link>
        </div>

        {/* Right Side: Cart & Authentication */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <Image
              src="/cart.svg"
              alt="PikaStore Cart"
              width={48}
              height={48}
            />
            {cartItemsCount > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex justify-center items-center">
                {cartItemsCount}
              </div>
            )}
          </div>

          {/* Authentication Buttons */}
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login">
                <button className="text-white text-lg cursor-pointer">Login</button>
              </Link>
              <Link href="/auth/register">
                <button className="text-white text-lg cursor-pointer">Register</button>
              </Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              {/* Profile Button */}
              <button onClick={toggleMenu} className="text-white text-lg cursor-pointer">Profile</button>
              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-48 p-2 z-50">
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-600">
                      <Link href="/profile">My Profile</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-600">
                      <Link href="/orders">My Orders</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-600">
                      <Link href="/cards">My Cards</Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={logout}>
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
