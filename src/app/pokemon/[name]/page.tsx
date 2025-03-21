// src/app/pokemon/[name]/page.tsx
import { getPokemonDetailsFromPokeAPI } from '@/app/utils/pokeapi';
import Link from 'next/link';

interface PokemonDetailsProps {
    params: {
        name: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Mapeo de colores para cada tipo (usado para el glow en la imagen)
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

export default async function PokemonDetails({ params, searchParams }: PokemonDetailsProps) {
    const { name } = params;
    const ourPrice = searchParams.price ? searchParams.price : 'N/A';

    let pokemon;
    try {
        pokemon = await getPokemonDetailsFromPokeAPI(name);
    } catch (error) {
        return (
            <div className="p-4 text-white flex justify-center items-center min-h-screen">
                Error fetching Pokémon details.
            </div>
        );
    }

    // Calcula el glow según el tipo principal
    let glowStyle = {};
    if (pokemon.types && pokemon.types.length > 0) {
        const primaryType = pokemon.types[0].type.name.toLowerCase();
        const mapping = typeColorMapping[primaryType];
        if (mapping) {
            glowStyle = {
                filter: `drop-shadow(0 0 20px ${mapping.normal})`,
                transition: 'filter 0.3s',
            };
        }
    }

    return (
        <main className="bg-gray-900 min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="text-white  block mb-4 text-xl">
                    &larr; Back to Catalog
                </Link>
                <h1 className="text-4xl text-white capitalize mb-8 text-center">{pokemon.name}</h1>

                {/* Layout responsivo: vertical en móvil, horizontal en pantallas grandes */}
                <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                    {/* Columna izquierda: imagen */}
                    <div className="flex justify-center mb-8 md:mb-0 md:w-1/2">
                        <img
                            src={
                                pokemon.sprites.other?.['official-artwork']?.front_default ||
                                pokemon.sprites.front_default
                            }
                            alt={pokemon.name}
                            className="w-72 h-72 object-contain transition duration-300"
                            style={glowStyle}
                        />
                    </div>

                    {/* Columna derecha: detalles y botón */}
                    <div className="text-white text-lg space-y-4 flex flex-col justify-center md:w-1/2">
                        <p><strong>Height:</strong> {pokemon.height}</p>
                        <p><strong>Weight:</strong> {pokemon.weight}</p>
                        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
                        <p><strong>Types:</strong> {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
                        <p><strong>Abilities:</strong> {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</p>
                        <p><strong>Our Price:</strong> ${ourPrice}</p>

                        <button className="mt-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Sección de Stats para ocupar más pantalla y mostrar más info */}
                {pokemon.stats && (
                    <div className="mt-12">
                        <h2 className="text-2xl text-white mb-4">Stats</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {pokemon.stats.map((stat: any) => (
                                <div
                                    key={stat.stat.name}
                                    className="flex flex-col items-center bg-gray-800 p-4 rounded"
                                >
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
