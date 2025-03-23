'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCart, getPokeballs, patchCartItem, removeItemFromCart } from '@/app/utils/api';
import Image from "next/image";
import { useCart } from '@/context/CartContext';

const CartPage = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [pokeballs, setPokeballs] = useState<any[]>([]);
    const [message, setMessage] = useState<string>(''); // Message for success/error
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null); // Which dropdown is open
    const { updateCartCount } = useCart();
    
    // Fetch cart items and available Pokéballs
    useEffect(() => {
        const fetchCartAndPokeballs = async () => {
            try {
                const cartData = await getCart(); // Get cart items
                setCartItems(cartData.items); // Set cart items

                const pokeballsData = await getPokeballs(); // Get available Pokéballs
                setPokeballs(pokeballsData); // Set Pokéballs list
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartAndPokeballs();
    }, []);

    // Handle changing the Pokéball for a cart item
    const handlePokeballChange = async (cartItemId: number, newPokeballId: number) => {
        try {
            const result = await patchCartItem(cartItemId, newPokeballId);
            setMessage(result.message);
            const updatedCartData = await getCart();
            setCartItems(updatedCartData.items);
        } catch (error) {
            setMessage('Error changing PokéBall.');
        }
    };

    // Handle quantity change for a cart item
    const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return; // Prevent quantity less than 1
        try {
            const result = await patchCartItem(cartItemId, undefined, newQuantity);
            setMessage(result.message);
            const updatedCartData = await getCart();
            setCartItems(updatedCartData.items);
            updateCartCount();
        } catch (error) {
            setMessage('Error updating quantity.');
        }
    };

    // Handle removing an item from the cart
    const handleRemoveItem = async (cartItemId: number) => {
        console.log(cartItemId)
        try {
            const result = await removeItemFromCart(cartItemId);
            setMessage(result.message);
            const updatedCartData = await getCart();
            setCartItems(updatedCartData.items);
            updateCartCount();
        } catch (error) {
            setMessage('Error removing item.');
        }
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
      };

    return (
        <main className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto text-white">
                <h1 className="text-4xl mb-8 text-center">Your Cart</h1>

                {message && (
                    <div className="bg-accents text-white p-4 rounded text-center mb-4">
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {cartItems.length > 0 ? (
                        cartItems.map((item: any) => (
                            <div key={item.id} className="flex flex-col md:flex-row gap-4 items-center justify-between bg-secondary p-4 lg:px-20 rounded-lg mb-4">
                                {/* Item details */}
                                <div className="flex items-center space-x-4">
                                    <Image src={item.pokemon.sprite} alt={item.pokemon.name} width={80} height={80} className="w-20 h-20 object-cover" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.pokemon.name}</h2>
                                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                        <p className="text-sm text-gray-400">Price per Item: {item.pokemon.base_price * item.pokeball.catch_rate_multiplier}</p>
                                        <p className="text-sm text-gray-400">Total: {item.price}</p>
                                    </div>
                                </div>

                                {/* Controls: Change PokéBall, Quantity, Remove */}
                                <div className="flex flex-col items-center space-y-2">
                                    {/* PokéBall section */}
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            src={item.pokeball.sprite}
                                            alt={item.pokeball.name}
                                            height={40}
                                            width={40}
                                            className="w-10 h-10"
                                        />
                                        <span className="text-sm">{item.pokeball.name}</span>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(isDropdownOpen === item.id ? null : item.id)}
                                            className="bg-accents cursor-pointer text-white p-2 rounded-lg flex items-center space-x-2"
                                        >
                                            <span className="mr-2">Change PokéBall</span>
                                        </button>
                                        {isDropdownOpen === item.id && (
                                            <ul className="absolute top-12 left-0 bg-black text-white w-full rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                                                {pokeballs.map((pokeball) => (
                                                    <li
                                                        key={pokeball.id}
                                                        className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-600"
                                                        onClick={() => {
                                                            handlePokeballChange(item.id, pokeball.id);
                                                            setIsDropdownOpen(null);
                                                        }}
                                                    >
                                                        <Image
                                                            src={pokeball.sprite}
                                                            alt={pokeball.name}
                                                            width={24}
                                                            height={24}
                                                            className="w-6 h-6 mr-2"
                                                        />
                                                        <span>{pokeball.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Quantity controls */}
                                    <div className="flex items-center space-x-2 mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                            className="bg-accents cursor-pointer px-2 py-1 rounded hover:bg-gray-600 transition"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                            className="bg-accents cursor-pointer px-2 py-1 rounded hover:bg-gray-600 transition"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove button */}
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="mt-2 cursor-pointer bg-red-600 px-3 py-1 rounded hover:bg-red-500 transition text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Display total price */}
                {cartItems.length > 0 && (
                    <div className="mt-8 text-white text-xl font-semibold text-center">
                        <p>Total Price: ${calculateTotalPrice()}</p>
                    </div>
                )}

                {/* Button to go to checkout */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/orders/checkout')}
                        className="px-6 py-3 bg-accents text-white rounded-lg hover:bg-primary transition duration-200 cursor-pointer"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
