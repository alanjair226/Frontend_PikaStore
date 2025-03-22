'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/utils/api';
import { useState } from 'react';

interface RegisterFormInputs {
    username: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form submission: call registerUser and redirect to login on success
    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            const response = await registerUser(data);
            router.push('/auth/login');
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage('Registration failed. Please try again.');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-secondary p-8 rounded shadow">
                <h1 className="text-2xl text-white mb-4 text-center">Register</h1>

                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label htmlFor="username" className="text-white block mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            className="w-full p-2 rounded border-b-2 border-white text-white"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="text-white block mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full p-2 rounded border-b-2 border-white text-white"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label htmlFor="password" className="text-white block mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full p-2 rounded border-b-2 border-white text-white"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-2 rounded hover:bg-accents transition"
                    >
                        Register
                    </button>
                </form>

                {/* Link to Login */}
                <div className="mt-4 text-center">
                    <p className="text-white text-sm">
                        Already have an account?{' '}
                        <a href="/auth/login" className="text-accents underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
