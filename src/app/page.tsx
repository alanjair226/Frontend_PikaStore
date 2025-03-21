'use client';

import { useEffect, useState } from 'react';
import { getPokemons } from '@/app/utils/api'; // Function that calls /pokemon/pagination
import { getPokemonTypesFromPokeAPI } from '@/app/utils/pokeapi'; // Function to get available types from PokéAPI
import PokemonCard from '@/components/PokemonCard';

export default function Home() {
  // Catalog state holds the API response: { data, currentPage, totalPages, totalItems }
  const [catalog, setCatalog] = useState({
    data: [] as any[],
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);
  
  // State to manage the current page for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // States for filters and search
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to hold available Pokémon types from PokéAPI
  const [types, setTypes] = useState<any[]>([]);

  // Fetch catalog data from our API when currentPage, filters, or search term change
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const response = await getPokemons(currentPage, selectedType, selectedCategory, searchTerm);
        // This response should match the endpoint structure: { data, currentPage, totalPages, totalItems }
        setCatalog(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching catalog:', error);
        setLoading(false);
      }
    };

    fetchCatalog();
  }, [currentPage, selectedType, selectedCategory, searchTerm]);

  // Fetch available Pokémon types from the PokéAPI on component mount
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await getPokemonTypesFromPokeAPI();
        // Assuming the API response has a 'results' field containing an array of type objects
        setTypes(data.results);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  // Handlers for pagination controls
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < catalog.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl mb-4 text-white">Pokémon Catalog</h1>
      
      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        {/* Filter for Type */}
        <div className=' text-white'>
          <label className="text-white mr-2">Type:</label>
          <select
            value={selectedType}
            onChange={(e) => { setCurrentPage(1); setSelectedType(e.target.value); }}
            className="p-2 rounded"
          >
            <option value="">All Types</option>
            {types.map((type: any) => (
              <option key={type.name} value={type.name} className=' text-black'>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        {/* Filter for Category */}
        <div className='text-white'>
          <label className="text-white mr-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => { setCurrentPage(1); setSelectedCategory(e.target.value); }}
            className="p-2 rounded "
          >
            <option value="" className='text-black'>All Categories</option>
            <option value="normal"  className='text-black'>Normal</option>
            <option value="mythical"  className='text-black'>Mythical</option>
            <option value="legendary"  className='text-black'>Legendary</option>
          </select>
        </div>
        <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => { setCurrentPage(1); setSearchTerm(e.target.value); }}
          className="p-2 rounded w-full sm:w-64 text-white border-b-2 rounded-b-sm border-b-gray-500"
        />
      </div>
      </div>
      
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <>
          {/* Grid for displaying Pokémon cards */}
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
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">
              Page {currentPage} of {catalog.totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === catalog.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
