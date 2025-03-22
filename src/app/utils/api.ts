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
        throw error;
    }
};

// Function to get a specific Pokémon by ID
export const getPokemonById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/pokemon/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to register a user
export const registerUser = async (userData: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
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

        return response.data.items.reduce((total: any, item: any) => total + item.quantity, 0);
    } catch (error) {
        throw error;
    }
};

export const getCart = async () => {
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

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const patchCartItem = async (cartItemId: number, newPokeballId: number) => {
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
        const response = await axios.patch(`${API_URL}/cart/update-item`, {
            userId,
            cartItemId,
            newPokeballId
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            }
        });

        if (response.status === 200) {

            return { message: 'PokeBall changed' };
        } else {
            throw new Error('Failed to change PokeBall');
        }
    } catch (error) {
        throw error;
    }
};

export const getPokeballs = async () => {
    try {
        // Get token from cookies
        const token = Cookies.get('token');

        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get(`${API_URL}/pokeballs`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addPokemonToCart = async (pokemonId: number) => {
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
            return { message: 'Pokemon added to cart successfully' };
        } else {
            throw new Error('Failed to add Pokémon to cart');
        }

    } catch (error) {
        throw error; // Will be handled by the calling component
    }
};


export const registerCard = async (cardNumber: string, expirationDate: string, cardholderName: string) => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No token found');
        }

        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.post(
            `${API_URL}/cards`,
            {
                user: userId,
                card_number: cardNumber,
                expiration_date: expirationDate,
                cardholder_name: cardholderName,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 201) {
            return { message: 'Card registered successfully' };
        } else {
            throw new Error('Failed to register card');
        }
    } catch (error) {
        throw error;
    }
};

export const getCardsByUser = async () => {
    try {
        // Get the token from cookies
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No token found');
        }

        // Decode the token to get the userId
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        // Make the GET request to fetch the user's cards
        const response = await axios.get(`${API_URL}/cards/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in the authorization header
            },
        });

        return response.data; // Return the cards data
    } catch (error) {
        throw error;
    }
};


export const getCardById = async (cardId: number) => {
    try {
        // Get the token from cookies
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No token found');
        }

        // Make the GET request to fetch the specific card by ID
        const response = await axios.get(`${API_URL}/cards/card/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Send token in the authorization header
            },
        });

        return response.data; // Return the specific card data
    } catch (error) {
        throw error;
    }
};


export const getOrders = async () => {
    try {
        const token = Cookies.get('token');
        if (!token) {
            throw new Error('No token found');
        }

        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.post(
            `${API_URL}/orders/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response.data
    } catch (error) {
        throw error;
    }
};

