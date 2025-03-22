import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

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

export const getCartItemsNumber = async () => {
    try {
        // Get token from cookies
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No token found');
        }

        // Decode the token to get the userId from the payload
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        // Make the request to the cart endpoint with userId
        const response = await axios.get(`${API_URL}/cart/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
        });

        return response.data.items.length; // Return the number of items in the cart
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

export const addPokemonToCart = async (pokemonId: number) => {
    console.log(pokemonId)
    try {
        // Get token from cookies
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No token found');
        }

        // Decode the token to get the userId from the payload
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        // Make the request to add the Pokémon to the cart
        const response = await axios.post(`${API_URL}/cart/add`, {
            userId,
            pokemonId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            }
        });

        // Check if the response status is 201 (Created)
        if (response.status === 201) {
            console.log('Pokemon added to cart successfully!');
            return { message: 'Pokemon added to cart successfully' };
        } else {
            throw new Error('Failed to add Pokémon to cart');
        }

    } catch (error) {
        console.error('Error adding Pokémon to cart:', error);
        throw error; // Will be handled by the calling component
    }
};
