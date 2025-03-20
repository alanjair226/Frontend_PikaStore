import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  base_price: string;
  category: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, sprite, base_price, category }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Pokémon image */}
      <img 
        src={sprite} 
        alt={name} 
        className="w-full h-48 object-contain p-4 bg-gray-900" 
      />
      <div className="p-4">
        {/* Pokémon name */}
        <h2 className="text-xl text-white capitalize">{name}</h2>
        {/* Pokémon price */}
        <p className="text-gray-300 text-sm mt-2">Price: ${base_price}</p>
        {/* Pokémon category */}
        <p className="text-gray-300 text-sm">Category: {category}</p>
        {/* Link to details */}
        <div className="mt-4">
        <Link
  href={`/pokemon/${name}`}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
>
  View Details
</Link>

        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
