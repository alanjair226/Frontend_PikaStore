'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white py-8">
            {/* Main Footer Content */}
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Left Side: Logo and Store Name */}
                <div className="mb-4 md:mb-0">
                    <Link href="/">
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Image src="/Logo.PNG" alt="PikaStore Logo" width={40} height={40} />
                            <span className="text-xl font-bold">PikaStore</span>
                        </div>
                    </Link>
                    <p className="text-sm text-gray-400 mt-2">
                        © {new Date().getFullYear()} PikaStore. All rights reserved.
                    </p>
                </div>
                {/* Middle/Right Side: Navigation Links */}
                <div className="flex space-x-4">
                    <Link href="/about">
                        <button className="bg-accents px-3 py-1 rounded hover:bg-primary transition">
                            About Us
                        </button>
                    </Link>
                    <Link href="/contact">
                        <button className="bg-accents px-3 py-1 rounded hover:bg-primary transition">
                            Contact
                        </button>
                    </Link>
                    <Link href="/privacy">
                        <button className="bg-accents px-3 py-1 rounded hover:bg-primary transition">
                            Privacy Policy
                        </button>
                    </Link>
                    <Link href="/faq">
                        <button className="bg-accents px-3 py-1 rounded hover:bg-primary transition">
                            FAQ
                        </button>
                    </Link>
                </div>
            </div>
            {/* Humorous Section */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                <p className="text-sm text-gray-500">
                    Keep calm and catch 'em all... or at least shop with us!
                </p>
            </div>
        </footer>
    );
};

export default Footer;
