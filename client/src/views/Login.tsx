/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { api } from '../api';

interface ILogin {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<ILogin>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await api.post('/login', data);
      console.log(res);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6">
      <h1 className="text-2xl mb-8 text-gray-700">
        Sign in
      </h1>

      <div className="mb-4">
        <label 
          className="block text-gray-500 text-sm font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,12}$/i,
              message: 'Invalid email address'
            },
          })}
          id="email"
          className="w-full text-gray-500 font-semibold border-2 border-gray-400 rounded-3xl py-2 px-4 focus:border-violet-500 focus:shadow-md"
        />
        {
          errors.email && 
          <p className="text-red-500 text-xs font-semibold mt-1">
            {errors.email.message}
          </p>
        }
      </div>

      <div className="mb-4">
        <label 
          className="block text-gray-500 text-sm font-semibold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          {...register('password', { required: 'This field is required' })}
          id="password"
          className="w-full text-gray-500 font-semibold border-2 border-gray-400 rounded-3xl py-2 px-4 focus:border-violet-500 focus:shadow-md"
          type="password"
        />
        {
          errors.password && 
          <p className="text-red-500 text-xs font-semibold mt-1">
            {errors.password.message}
          </p>
        }
      </div>

      <button 
        type="submit" 
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-3xl font-light w-full hover:shadow-lg"
      >
        Login
      </button>

      <p className="text-gray-500 text-sm mt-4">
        Not registered yet?{' '}
        <Link 
          to="/register"
          className="text-violet-500"
        >
          Sign up
        </Link>{' '}
        here!
      </p>
    </form>
  );
};

export default Login;
