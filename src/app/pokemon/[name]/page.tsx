'use client'

import { useState, useEffect } from 'react';
import { getPokemonDetailsFromPokeAPI } from '@/app/utils/pokeapi';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { addPokemonToCart } from '@/app/utils/api';
import { useCart } from '@/context/CartContext'; // Importa el hook useCart

const typeColorMapping: Record<string, { normal: string; hover: string }> = {
    fire: { normal: 'rgba(255,69,0,0.8)', hover: 'rgba(255,69,0,1)' },
    water: { normal: 'rgba(0,191,255,0.8)', hover: 'rgba(0,191,255,1)' },
    grass: { normal: 'rgba(34,139,34,0.8)', hover: 'rgba(34,139,34,1)' },
    electric: { normal: 'rgba(255,215,0,0.8)', hover: 'rgba(255,215,0,1)' },
    psychic: { normal: 'rgba(255,105,180,0.8)', hover: 'rgba(255,105,180,1)' },
    fighting: { normal: 'rgba(255,140,0,0.8)', hover: 'rgba(255,140,0,1)' },
    bug: { normal: 'rgba(107,142,35,0.8)', hover: 'rgba(107,142,35,1)' },
    rock: { normal: 'rgba(128,128,128,0.8)', hover: 'rgba(128,128,128,1)' },
    ground: { normal: 'rgba(210,180,140,0.8)', hover: 'rgba(210,180,140,1)' },
    ghost: { normal: 'rgba(75,0,130,0.8)', hover: 'rgba(75,0,130,1)' },
    dragon: { normal: 'rgba(106,90,205,0.8)', hover: 'rgba(106,90,205,1)' },
    ice: { normal: 'rgba(173,216,230,0.8)', hover: 'rgba(173,216,230,1)' },
    dark: { normal: 'rgba(47,79,79,0.8)', hover: 'rgba(47,79,79,1)' },
    steel: { normal: 'rgba(192,192,192,0.8)', hover: 'rgba(192,192,192,1)' },
    fairy: { normal: 'rgba(255,182,193,0.8)', hover: 'rgba(255,182,193,1)' },
    normal: { normal: 'rgba(169,169,169,0.8)', hover: 'rgba(169,169,169,1)' },
};

export default function PokemonDetails() {
    const [message, setMessage] = useState<string>('');
    const { name } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const { updateCartCount } = useCart(); // Obtén la función para actualizar el contador del carrito

    const [pokemon, setPokemon] = useState<any>(null);
    const [price, setPrice] = useState(searchParams.get('price') || 'N/A');
    const [id, setId] = useState(searchParams.get('id') || 'N/A');
    const [glowStyle, setGlowStyle] = useState({});

    // Fetch Pokémon details after the component mounts
    useEffect(() => {
        console.log(id);
        const fetchPokemon = async () => {
            try {
                const data = await getPokemonDetailsFromPokeAPI(String(name));
                console.log(data); // Log the fetched data to see the structure
                setPokemon(data);

                // Calculate the glow based on the primary type
                if (data.types && data.types.length > 0) {
                    const primaryType = data.types[0].type.name.toLowerCase();
                    const mapping = typeColorMapping[primaryType];
                    if (mapping) {
                        setGlowStyle({
                            filter: `drop-shadow(0 0 20px ${mapping.normal})`,
                            transition: 'filter 0.3s',
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        };

        fetchPokemon();
    }, [name]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            router.push('/auth/login'); // Redirigir al login si no está logueado
        } else {
            try {
                const result = await addPokemonToCart(Number(id)); // Llamada a la función para agregar el Pokémon al carrito
                setMessage(result.message); // Mostrar el mensaje de éxito
                updateCartCount(); // Actualiza el contador del carrito
            } catch (error) {
                setMessage('Error adding Pokémon to cart. Please try again.'); // Mensaje de error
            }
        }
    };

    if (!pokemon) {
        return (
            <div className="p-4 text-white flex justify-center items-center min-h-screen">
                Loading Pokémon details...
            </div>
        );
    }

    return (
        <main className="bg-gray-900 min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="text-white block mb-4 text-xl">
                    &larr; Back to Catalog
                </Link>
                <h1 className="text-4xl text-white capitalize mb-8 text-center">{pokemon.name}</h1>

                <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                    <div className="flex justify-center mb-8 md:mb-0 md:w-1/2">
                        <img
                            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
                            alt={pokemon.name}
                            className="w-72 h-72 object-contain transition duration-300"
                            style={glowStyle}
                        />
                    </div>

                    <div className="text-white text-lg space-y-4 flex flex-col justify-center md:w-1/2">
                        <p><strong>Height:</strong> {pokemon.height || 'N/A'}</p>
                        <p><strong>Weight:</strong> {pokemon.weight || 'N/A'}</p>
                        <p><strong>Base Experience:</strong> {pokemon.base_experience || 'N/A'}</p>
                        <p><strong>Types:</strong> {pokemon.types?.map((t: any) => t.type.name).join(', ') || 'N/A'}</p>
                        <p><strong>Abilities:</strong> {pokemon.abilities?.map((a: any) => a.ability.name).join(', ') || 'N/A'}</p>
                        <p><strong>Our Price:</strong> ${price}</p>

                        <button onClick={handleAddToCart} className="mt-4 px-6 py-3 bg-accents cursor-pointer text-white rounded hover:bg-primary transition duration-300">
                            Add to Cart
                        </button>
                        {message && (
                            <div className="mt-4 text-center p-4 bg-green-500 text-white rounded">
                                {message}  {/* Mostramos el mensaje de éxito o error */}
                            </div>
                        )}
                    </div>
                </div>

                {pokemon.stats && (
                    <div className="mt-12">
                        <h2 className="text-2xl text-white mb-4">Stats</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {pokemon.stats.map((stat: any) => (
                                <div key={stat.stat.name} className="flex flex-col items-center bg-gray-800 p-4 rounded">
                                    <span className="text-white font-bold capitalize">{stat.stat.name}</span>
                                    <span className="text-white">{stat.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
