import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import './globals.css';
import { ReactNode } from 'react';

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
      <html lang="en">
        <body className="bg-background min-h-screen ">
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
