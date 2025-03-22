'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-accents p-4 px-4 font-pixel md:px-24 lg:px-32">
      <div className="flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-2 gap-4">
          <img
            src="/Logo.PNG"
            alt="PikaStore Logo"
            className="w-12 h-12"
          />
          <div className="text-white text-xl md:text-3xl">PikaStore</div>
        </div>
        {/* Authentication Buttons */}
        <div className="flex space-x-4">
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
