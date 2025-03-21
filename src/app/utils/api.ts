import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to get the list of Pokémon from OUR API
export const getPokemons = async (page: number, type: string, category: string, search?: string) => {
    try {
        const response = await axios.get(`${API_URL}/pokemon/pagination`, {
            params: { page, type, category, search },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};

// Function to get a specific Pokémon by ID
export const getPokemonById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/pokemon/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error);
        throw error;
    }
};

// Function to register a user
export const registerUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};
