'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { getCardsByUser, registerCard } from '@/app/utils/api';

interface Card {
    id: number;
    card_number: string;
    expiration_date: string;
    cardholder_name: string;
    deletedAt: string | null;
}

interface FormValues {
    cardNumber: string;
    cardholderName: string;
    expirationMonth: string;
    expirationYear: string;
}

const CardsPage = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [message, setMessage] = useState('');
    const { handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            cardNumber: '',
            cardholderName: '',
            expirationMonth: '',
            expirationYear: ''
        }
    });

    // Function to fetch cards
    const fetchCards = async () => {
        try {
            const data = await getCardsByUser();
            setCards(data);
        } catch (error) {
            console.error('Error fetching cards:', error);
            setMessage('Error fetching cards');
        }
    };

    // Load cards when the component mounts
    useEffect(() => {
        fetchCards();
    }, []);

    // Handle form submission: concatenate month/year, register the card, and update the list
    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const expirationDate = `${data.expirationMonth}/${data.expirationYear}`;
        try {
            const response = await registerCard(data.cardNumber, expirationDate, data.cardholderName);
            setMessage(response.message);
            reset(); // Reset the form fields
            await fetchCards(); // Update the cards list
        } catch (error) {
            setMessage('Error registering card');
            console.error('Error registering card:', error);
        }
    };

    return (
        <main className="bg-gray-900 min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto text-white">
                <h1 className="text-4xl mb-8 text-center">Your Cards</h1>

                {message && (
                    <div className="bg-green-500 text-white p-4 rounded text-center mb-4">
                        {message}
                    </div>
                )}

                <div className="space-y-8">
                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <div key={card.id} className="flex flex-col bg-gray-800 p-4 rounded-lg mb-4">
                                <h2 className="text-lg font-semibold">Card Number: {card.card_number}</h2>
                                <p>Expiration Date: {card.expiration_date}</p>
                                <p>Cardholder: {card.cardholder_name}</p>
                            </div>
                        ))
                    ) : (
                        <p>Your cards list is empty.</p>
                    )}
                </div>

                {/* Container to limit the form width */}
                <div className="max-w-md mx-auto mt-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Field for card number */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-white" htmlFor="cardNumber">Card Number (16 digits)</label>
                            <Controller
                                name="cardNumber"
                                control={control}
                                rules={{
                                    required: 'Card number is required',
                                    validate: (value) => /^[0-9]{16}$/.test(value) || 'Card number must be 16 digits'
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="cardNumber"
                                        type="text"
                                        className="p-2 rounded-lg text-white bg-gray-700 w-full"
                                        placeholder="Enter 16 digit card number"
                                    />
                                )}
                            />
                            {errors.cardNumber && typeof errors.cardNumber.message === 'string' && (
                                <span className="text-red-500 text-sm">
                                    {errors.cardNumber.message}
                                </span>
                            )}
                        </div>

                        {/* Field for cardholder name */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-white" htmlFor="cardholderName">Cardholder Name</label>
                            <Controller
                                name="cardholderName"
                                control={control}
                                rules={{ required: 'Cardholder name is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        id="cardholderName"
                                        type="text"
                                        className="p-2 rounded-lg text-white bg-gray-700 w-full"
                                        placeholder="Enter cardholder name"
                                    />
                                )}
                            />
                            {errors.cardholderName && typeof errors.cardholderName.message === 'string' && (
                                <span className="text-red-500 text-sm">
                                    {errors.cardholderName.message}
                                </span>
                            )}
                        </div>

                        {/* Group month and year fields in the same row */}
                        <div className="flex space-x-4">
                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="text-white" htmlFor="expirationMonth">Expiration Month (MM)</label>
                                <Controller
                                    name="expirationMonth"
                                    control={control}
                                    rules={{
                                        required: 'Expiration month is required',
                                        validate: (value) => /^(0[1-9]|1[0-2])$/.test(value) || 'Invalid month, use MM format'
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id="expirationMonth"
                                            type="text"
                                            className="p-2 rounded-lg text-white bg-gray-700 w-full"
                                            placeholder="MM"
                                        />
                                    )}
                                />
                                {errors.expirationMonth && typeof errors.expirationMonth.message === 'string' && (
                                    <span className="text-red-500 text-sm">
                                        {errors.expirationMonth.message}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col space-y-2">
                                <label className="text-white" htmlFor="expirationYear">Expiration Year (YY)</label>
                                <Controller
                                    name="expirationYear"
                                    control={control}
                                    rules={{
                                        required: 'Expiration year is required',
                                        validate: (value) => /^\d{2}$/.test(value) || 'Invalid year, use YY format'
                                    }}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            id="expirationYear"
                                            type="text"
                                            className="p-2 rounded-lg text-white bg-gray-700 w-full"
                                            placeholder="YY"
                                        />
                                    )}
                                />
                                {errors.expirationYear && typeof errors.expirationYear.message === 'string' && (
                                    <span className="text-red-500 text-sm">
                                        {errors.expirationYear.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-accents text-white rounded-lg hover:bg-primary transition duration-200"
                            >
                                Save Card
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default CardsPage;
