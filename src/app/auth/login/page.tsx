'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/utils/api';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const router = useRouter();
  const { login } = useAuth(); // Use hook to access context
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser(data);
      login(response.token);
      
      // redirect to catalog
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid credentials or server error.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-secondary p-8 rounded shadow">
        <h1 className="text-2xl text-white mb-4 text-center">Login</h1>
        
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
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
            Login
          </button>
        </form>
        
        {/* Link to Register */}
        <div className="mt-4 text-center">
          <p className="text-white text-sm">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-accents underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
