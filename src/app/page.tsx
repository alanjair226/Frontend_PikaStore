'use client';

import { useEffect, useState } from 'react';
import { getPokemons } from '@/app/utils/api'; // Function that calls /pokemon/pagination
import PokemonCard from '@/components/PokemonCard';

export default function Home() {
  const [catalog, setCatalog] = useState({
    data: [] as any[],
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch catalog data from our API when the component mounts
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await getPokemons(1, '', '');
        // This response should match the endpoint structure: { data, currentPage, totalPages, totalItems }
        setCatalog(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching catalog:', error);
      }
    };

    fetchCatalog();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4 text-white">Pokémon Catalog</h1>
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catalog.data.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              sprite={pokemon.sprite}
              base_price={pokemon.base_price}
              category={pokemon.category}
            />
          ))}
        </div>
      )}
    </main>
  );
}
