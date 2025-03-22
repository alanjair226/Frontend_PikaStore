'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getOrders } from '@/app/utils/api';

// Define interfaces for Order data
interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  base_price: string;
  category: string;
}

interface Pokeball {
  id: number;
  name: string;
  sprite: string;
  catch_rate_multiplier: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  price: string;
  pokemon: Pokemon;
  pokeball: Pokeball;
}

interface Card {
  id: number;
  card_number: string;
  expiration_date: string;
  cardholder_name: string;
  deletedAt: string | null;
}

interface User {
  id: number;
  username: string;
  email: string;
}

interface Order {
  id: number;
  total_price: string;
  createdAt: string;
  items: OrderItem[];
  card: Card;
  user: User;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState('');
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Function to fetch orders for the logged-in user
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setMessage('Error fetching orders');
    }
  };

  // Load orders when the component mounts
  useEffect(() => {
    // Removed immediate redirection on reload.
    // If your route is already protected (e.g., via middleware), you can safely fetch orders here.
    fetchOrders();
  }, [router]);

  return (
    <main className="bg-gray-900 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto text-white">
        <h1 className="text-4xl mb-8 text-center">My Orders</h1>

        {message && (
          <div className="bg-red-500 text-white p-4 rounded text-center mb-4">
            {message}
          </div>
        )}

        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-gray-800 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
                <span className="text-lg">Total: ${order.total_price}</span>
              </div>
              <p className="text-sm text-gray-300">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
              {/* List order items */}
              <div className="mt-4 space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.pokemon.sprite}
                      alt={item.pokemon.name}
                      className="w-12 h-12"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.pokemon.name}</h3>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                      <p className="text-sm">Price: ${item.price}</p>
                    </div>
                    <img
                      src={item.pokeball.sprite}
                      alt={item.pokeball.name}
                      className="w-10 h-10"
                    />
                  </div>
                ))}
              </div>
              {/* Display card information used for the order */}
              <div className="mt-4">
                <p className="text-sm">
                  Card: {order.card.card_number} - {order.card.cardholder_name} (Expires: {order.card.expiration_date})
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
