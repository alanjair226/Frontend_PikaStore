'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in by checking if the token exists in cookies
  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // If token exists, the user is logged in
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-2">
          <img
            src="/Logo.PNG" // Make sure the logo image is in the public folder
            alt="PikaStore Logo"
            className="w-10 h-10"
          />
          <div className="text-white text-xl">PikaStore</div>
        </div>
        {/* Authentication Buttons */}
        <div className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login">
                <button className="text-white">Login</button>
              </Link>
              <Link href="/auth/register">
                <button className="text-white">Register</button>
              </Link>
            </>
          ) : (
            <Link href="/profile">
              <button className="text-white">Profile</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
