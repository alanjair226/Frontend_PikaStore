import axios from 'axios';

// Base URL for the PokéAPI
const POKEAPI_URL = 'https://pokeapi.co/api/v2';

// Function to get details of a Pokémon by its name
export const getPokemonDetailsFromPokeAPI = async (pokemonName: string) => {
    try {
        const response = await axios.get(`${POKEAPI_URL}/pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon details from PokéAPI:', error);
        throw error;
    }
};

// Function to get all available Pokémon types from the PokéAPI
export const getPokemonTypesFromPokeAPI = async () => {
    try {
        const response = await axios.get(`${POKEAPI_URL}/type`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon types from PokéAPI:', error);
        throw error;
    }
};
