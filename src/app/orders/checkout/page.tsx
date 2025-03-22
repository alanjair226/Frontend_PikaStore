'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCart, getCardsByUser, Order } from '@/app/utils/api';

interface CartItem {
    id: number;
    quantity: number;
    price: string;
    pokemon: {
        id: number;
        name: string;
        sprite: string;
    };
}

interface Card {
    id: number;
    card_number: string;
    expiration_date: string;
    cardholder_name: string;
    deletedAt: string | null;
}

const CheckoutPage = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('');

    // Function to fetch cart data
    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCartItems(data.items);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setMessage('Error fetching cart');
        }
    };

    // Function to fetch user cards
    const fetchCards = async () => {
        try {
            const data = await getCardsByUser();
            setCards(data);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setMessage('Error fetching cards');
        }
    };

    useEffect(() => {
        fetchCart();
        fetchCards();
    }, []);

    // Calculate total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + parseFloat(item.price) * item.quantity;
        }, 0).toFixed(2);
    };

    // Handle order creation
    const handlePlaceOrder = async () => {
        if (!selectedCardId) {
            setMessage('Please select a card to place the order.');
            return;
        }
        try {
            const response = await Order(selectedCardId);
            setMessage(response.message);
            // Optionally, redirect to the orders page after successful order creation
            router.push('/orders');
        } catch (error) {
            console.error('Error placing order:', error);
            setMessage('Error placing order');
        }
    };

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto text-white">
                <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

                {message && (
                    <div className="bg-red-500 text-white p-4 rounded mb-6 text-center">
                        {message}
                    </div>
                )}

                {/* Cart Summary */}
                <div className="bg-secondary rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 mb-4">
                                <Image
                                    src={item.pokemon.sprite}
                                    alt={item.pokemon.name}
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 rounded"
                                />
                                <div>
                                    <h3 className="text-xl">{item.pokemon.name}</h3>
                                    <p className="text-gray-300 text-sm">Quantity: {item.quantity}</p>
                                    <p className="text-gray-300 text-sm">
                                        Price: ${parseFloat(item.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <div className="mt-4 text-xl font-semibold">
                        Total Price: ${calculateTotalPrice()}
                    </div>
                </div>

                {/* Card Selection */}
                <div className="bg-secondary rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Select a Payment Card</h2>
                    {cards.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    onClick={() => setSelectedCardId(card.id)}
                                    className={`p-4 border rounded cursor-pointer ${
                                        selectedCardId === card.id
                                            ? 'border-accents'
                                            : 'border-white'
                                    }`}
                                >
                                    <p className="font-semibold">{card.card_number}</p>
                                    <p className="text-sm text-gray-300">
                                        Cardholder: {card.cardholder_name}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Expires: {card.expiration_date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No cards found. Please add a card.</p>
                    )}
                </div>

                {/* Place Order Button */}
                <div className="text-center">
                    <button
                        onClick={handlePlaceOrder}
                        className="px-6 py-3 bg-accents text-white rounded-lg hover:bg-primary transition duration-200 cursor-pointer"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;
