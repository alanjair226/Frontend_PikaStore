// src/components/PokemonCard.tsx
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  base_price: string;
  category: string;
  types: string[];  // Asegúrate de pasar los tipos del Pokémon
}

// Mapeo de colores para cada tipo
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

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, sprite, base_price, category, types }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
      {/* Pokémon image */}
      <img
        src={sprite}
        alt={name}
        className="w-full h-56 object-contain p-4 bg-background"
      />
      <div className="p-6">
        {/* Pokémon name */}
        <h2 className="text-2xl text-white font-semibold capitalize mb-2">{name}</h2>

        {/* Pokémon price */}
        <p className="text-white text-lg font-semibold mb-2">
          Price: <span className="text-yellow-400">${base_price}</span>
        </p>

        {/* Pokémon category */}
        <p className="text-gray-200 text-sm italic mb-4">Category: {category}</p>

        {/* Pokémon types */}
        <div className="flex gap-2 mb-4">
          {types.map((type) => {
            const { normal, hover } = typeColorMapping[type] || typeColorMapping['normal'];
            return (
              <span
                key={type}
                className="text-white px-3 py-1 rounded-lg text-sm hover:bg-opacity-80"
                style={{
                  backgroundColor: normal,
                  transition: 'background-color 0.3s ease-in-out',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = hover)}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = normal)}
              >
                {type}
              </span>
            );
          })}
        </div>

        {/* Link to details (pass our price as query parameter) */}
        <div className="mt-4">
          <Link
            href={`/pokemon/${name}?price=${base_price}`}
            className="bg-accents text-white text-center px-4 py-2 rounded-lg w-full block text-lg font-bold hover:bg-primary transition duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
