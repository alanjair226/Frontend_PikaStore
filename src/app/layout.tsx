import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import './globals.css';
import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'PikaStore',
  description: 'Pokémon e-commerce site',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <html lang="en">
          <body className="bg-background min-h-screen pt-24">
            <Navbar />
            {children}
            <Footer/>
          </body>
        </html>
      </CartProvider>
    </AuthProvider>
  );
}
