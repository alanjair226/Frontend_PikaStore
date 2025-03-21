'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable

  // Check if the user is logged in by checking if the token exists in cookies
  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // If token exists, the user is logged in
  }, []);

  // Función para manejar la visibilidad del menú
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    // Redirigir o hacer algo después del logout, como ir al home
  };

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
            <div className="relative">
              {/* Profile Button */}
              <button onClick={toggleMenu} className="text-white">Profile</button>
              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg w-48 p-2">
                  <ul>
                    <li className="py-2 px-4 hover:bg-gray-600"><Link href="/profile">My Profile</Link></li>
                    <li className="py-2 px-4 hover:bg-gray-600"><Link href="/orders">My Orders</Link></li>
                    <li className="py-2 px-4 hover:bg-gray-600"><Link href="/cards">My Cards</Link></li>
                    <li className="py-2 px-4 hover:bg-gray-600 cursor-pointer" onClick={handleLogout}>Logout</li>
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
