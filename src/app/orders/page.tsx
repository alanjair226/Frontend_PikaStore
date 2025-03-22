'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getOrders } from '@/app/utils/api';
import Image from 'next/image';

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

    useEffect(() => {
        fetchOrders();
    }, [router]);

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-white mb-10">My Orders</h1>

                {message && (
                    <div className="bg-red-500 text-white p-4 rounded mb-6 text-center">
                        {message}
                    </div>
                )}

                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {orders.map((order, index) => (
                            <div key={order.id} className="bg-secondary rounded-lg shadow-lg p-6 flex flex-col">
                                <div className="mb-4">
                                    {/* Display a sequential order number (e.g., Order #1) instead of the order ID */}
                                    <h2 className="text-2xl font-semibold text-white">Order #{index + 1}</h2>
                                    <p className="text-gray-300 text-sm">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                    <p className="mt-2 text-lg text-white">Total: ${order.total_price}</p>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-white mb-2">Items:</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4 bg-primary p-3 rounded">
                                                <Image
                                                    src={item.pokemon.sprite}
                                                    alt={item.pokemon.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded"
                                                />
                                                <div>
                                                    <h4 className="text-white font-semibold">{item.pokemon.name}</h4>
                                                    <p className="text-gray-300 text-sm">Qty: {item.quantity}</p>
                                                    <p className="text-gray-300 text-sm">Price: ${item.price}</p>
                                                </div>
                                                <Image
                                                    src={item.pokeball.sprite}
                                                    alt={item.pokeball.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-10 h-10"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4 border-t border-gray-600 pt-4">
                                    <p className="text-sm text-gray-300">
                                        Card: {order.card.card_number} - {order.card.cardholder_name}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Expires: {order.card.expiration_date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-white">No orders found.</p>
                )}
            </div>
        </main>
    );
};

export default OrdersPage;
