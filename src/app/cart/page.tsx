'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCart } from '@/app/utils/api'; // Función para obtener el carrito
import { getPokeballs, patchCartItem } from '@/app/utils/api'; // Función para obtener Pokébolas y actualizar el carrito

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]); // Artículos en el carrito
  const [pokeballs, setPokeballs] = useState<any[]>([]); // Lista de todas las pokébolas
  const [message, setMessage] = useState<string>(''); // Mensaje para mostrar cambios

  // Fetch cart items and available pokeballs
  useEffect(() => {
    const fetchCartAndPokeballs = async () => {
      try {
        const cartData = await getCart(); // Obtiene los artículos del carrito
        setCartItems(cartData.items); // Establece los artículos del carrito
  
        const pokeballsData = await getPokeballs(); // Obtiene todas las pokébolas disponibles
        setPokeballs(pokeballsData); // Establece las pokébolas
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
  
    fetchCartAndPokeballs();
  }, []);
  

  const handlePokeballChange = async (cartItemId: number, newPokeballId: number) => {
    try {
       const result = await patchCartItem(cartItemId, newPokeballId); // Actualiza la Pokébola
       setMessage(result.message); // Muestra el mensaje de éxito
       // Obtén nuevamente los datos del carrito
       const updatedCartData = await getCart();
       setCartItems(updatedCartData.items); // Fuerza la actualización de la UI
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

                  {/* Dropdown to change PokéBall */}
                  <select
                    className="bg-gray-700 text-white p-2 rounded-lg"
                    onChange={(e) => handlePokeballChange(item.id, Number(e.target.value))}
                    value={item.pokeball.id}
                  >
                    {pokeballs.map((pokeball) => (
                      <option key={pokeball.id} value={pokeball.id}>
                        {pokeball.name}
                      </option>
                    ))}
                  </select>
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
