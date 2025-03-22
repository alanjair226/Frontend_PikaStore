'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext'; // Importa el hook de contexto

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemsCount, updateCartCount } = useCart(); // Obtén el contador y la función para actualizarlo
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      router.push('/auth/login');  // Redirect to login if not logged in
    } else {
      router.push('/cart');  // Otherwise, go to the cart page
    }
  };
  return (
    <nav className="bg-accents p-4 px-4 font-pixel md:px-24 lg:px-32">
      <div className="flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-2 gap-4">
          <Image
            src="/Logo.PNG"
            alt="PikaStore Logo"
            width={48}
            height={48}
          />
          <div className="text-white text-xl md:text-3xl">PikaStore</div>
        </div>

        {/* Authentication & Cart */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <Image
              src="/cart.svg"
              alt="PikaStore Cart"
              width={48}
              height={48}
            />
            {/* Display the number of items in the cart */}
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
            <div className="relative">
              {/* Profile Button */}
              <button onClick={toggleMenu} className="text-white text-lg cursor-pointer">Profile</button>
              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-48 p-2 z-50">
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-600"><Link href="/profile">My Profile</Link></li>
                    <li className="py-2 px-4 hover:bg-gray-600"><Link href="/orders">My Orders</Link></li>
                    <li className="py-2 px-4 hover:bg-gray-600"><Link href="/cards">My Cards</Link></li>
                    <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={logout}>Logout</li>
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
