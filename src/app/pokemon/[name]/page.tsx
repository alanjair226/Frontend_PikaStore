// src/app/pokemon/[name]/page.tsx
import { getPokemonDetailsFromPokeAPI } from '@/app/utils/pokeapi';
import Link from 'next/link';

interface PokemonDetailsProps {
  params: {
    name: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function PokemonDetails({ params, searchParams }: PokemonDetailsProps) {
  const { name } = params;
  // Get "Our Price" from query string; default to 'N/A'
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

  // Mapping colors for each Pokémon type
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

  // Calculate glow style based on primary type using inline styles
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
    <main className="p-4 bg-gray-900 min-h-screen flex flex-col items-center">
      <Link href="/" className="text-blue-500 underline self-start mb-4">
        &larr; Back to Catalog
      </Link>
      <h1 className="text-4xl text-white capitalize mb-4">{pokemon.name}</h1>
      <img
        src={
          pokemon.sprites.other?.['official-artwork']?.front_default ||
          pokemon.sprites.front_default
        }
        alt={pokemon.name}
        className="w-64 h-64 mb-4 object-contain transition duration-300"
        style={glowStyle}
      />
      <div className="text-white text-lg text-center space-y-2">
        <p>
          <strong>Height:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Weight:</strong> {pokemon.weight}
        </p>
        <p>
          <strong>Base Experience:</strong> {pokemon.base_experience}
        </p>
        <p>
          <strong>Types:</strong> {pokemon.types.map((t: any) => t.type.name).join(', ')}
        </p>
        <p>
          <strong>Abilities:</strong> {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}
        </p>
        <p>
          <strong>Our Price:</strong> ${ourPrice}
        </p>
      </div>
    </main>
  );
}
