# PikaStore Frontend

## Project Description

PikaStore is an e-commerce website inspired by the Pokémon universe. The application allows users to:

- Register and log in.
- Browse a catalog of Pokémon.
- Manage a shopping cart.
- Place orders and view order history.
- Manage user profiles and payment cards.
- Access a dedicated "Pokedex" page for thematic Pokémon data.

## Technologies Used

- **Next.js:** A React framework for server-side rendering and static site generation.
- **React:** Library for building user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for rapidly building custom designs.
- **Axios:** HTTP client for making API requests.
- **react-hook-form:** Library for form management and validation.
- **JWT & Cookies:** For handling authentication and token management.

## Installation and Execution Instructions

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/alanjair226/Frontend_PikaStore.git
    cd Frontend_PikaStore
    ```
2. **Install Dependencies:**
    ```
    yarn install
    ```
3. **Configure Environment Variables:**
    - Create a .env.local file at the root of the project.
    - Add the necessary variables, for example:
    ```.env.local
    NEXT_PUBLIC_API_URL= https:localhost:3001 //NestJs App
    ```
4. **Run the Project in Development Mode:**
    ```bash
    yarn dev
    ```
    - Open your browser and navigate to http://localhost:3000.

## Additional Notes
Ensure that your backend/API is correctly configured and accessible via the NEXT_PUBLIC_API_URL specified in the environment variables.
