// app/layout.tsx
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
    <html lang="en">
      <body className="bg-gray-900 min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
