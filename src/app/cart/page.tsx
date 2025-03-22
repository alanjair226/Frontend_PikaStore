'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCart } from '@/app/utils/api'; // Function to fetch cart data
import { getPokeballs, patchCartItem } from '@/app/utils/api'; // Function to fetch Pokéballs and update the cart

const CartPage = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<any[]>([]); // Cart items
    const [pokeballs, setPokeballs] = useState<any[]>([]); // List of available Pokéballs
    const [message, setMessage] = useState<string>(''); // Message to show success or error
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null); // Track which dropdown is open

    // Fetch cart items and available Pokéballs
    useEffect(() => {
        const fetchCartAndPokeballs = async () => {
            try {
                const cartData = await getCart(); // Get cart items
                setCartItems(cartData.items); // Set the cart items

                const pokeballsData = await getPokeballs(); // Get available Pokéballs
                setPokeballs(pokeballsData); // Set the Pokéballs
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchCartAndPokeballs(); // Trigger fetching cart and Pokéballs
    }, []);


    const handlePokeballChange = async (cartItemId: number, newPokeballId: number) => {
        try {
            const result = await patchCartItem(cartItemId, newPokeballId); // Update Pokéball
            setMessage(result.message); // Show success message
            // Fetch cart data again to reflect changes
            const updatedCartData = await getCart();
            setCartItems(updatedCartData.items); // Force UI update with new data
        } catch (error) {
            setMessage('Error changing PokéBall.');
        }
    };

    return (
        <main className="bg-gray-900 min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto text-white">
                <h1 className="text-4xl mb-8 text-center">Your Cart</h1>

                {/* Message for success/error */}
                {message && (
                    <div className="bg-green-500 text-white p-4 rounded text-center mb-4">
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {cartItems.length > 0 ? (
                        cartItems.map((item: any) => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-4">
                                <div className="flex items-center space-x-4">
                                    <img src={item.pokemon.sprite} alt={item.pokemon.name} className="w-20 h-20 object-cover" />
                                    <div>
                                        <h2 className="text-lg font-semibold">{item.pokemon.name}</h2>
                                        <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {/* Show the current PokéBall */}
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={item.pokeball.sprite}
                                            alt={item.pokeball.name}
                                            className="w-10 h-10"
                                        />
                                        <span className="text-sm">{item.pokeball.name}</span>
                                    </div>

                                    {/* Custom Dropdown to change PokéBall */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(isDropdownOpen === item.id ? null : item.id)}
                                            className="bg-gray-700 text-white p-2 rounded-lg flex items-center space-x-2"
                                        >
                                            <span className="mr-2">Change PokéBall</span>
                                        </button>
                                        {isDropdownOpen === item.id && (
                                            <ul className="absolute top-12 left-0 bg-gray-700 text-white w-full rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                                                {pokeballs.map((pokeball) => (
                                                    <li
                                                        key={pokeball.id}
                                                        className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-600"
                                                        onClick={() => {
                                                            handlePokeballChange(item.id, pokeball.id);
                                                            setIsDropdownOpen(null); // Close the dropdown after selection
                                                        }}
                                                    >
                                                        <img
                                                            src={pokeball.sprite}
                                                            alt={pokeball.name}
                                                            className="w-6 h-6 mr-2"
                                                        />
                                                        <span>{pokeball.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Button to go to checkout */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => router.push('/checkout')}
                        className="px-6 py-3 bg-accents text-white rounded-lg hover:bg-primary transition duration-200"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </main>
    );
};

export default CartPage;
