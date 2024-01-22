/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';

interface IRegisterForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Registration: React.FC = () => {
  const { 
    register, 
    handleSubmit,
    watch,
    formState: { errors } 
  } = useForm<IRegisterForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      const { confirmPassword, ...reqBody } = data;
      const res = await api.post('/register', reqBody);
      console.log(res);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label 
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="userName"
        >
          Full Name
        </label>
        <input
          {...register('userName', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*\s*$/i,
              message: "Name contains invalid symbols"
            }
          })}
          id="userName"
          className="w-full border rounded py-2 px-3"
        />
        {
          errors.email && 
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        }
      </div>

      <div className="mb-4">
        <label 
          className="block text-gray-700 text-sm font-bold mb-2"
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
          className="w-full border rounded py-2 px-3"
        />
        {
          errors.email && 
          <p className="text-red-500 text-xs mt-1">
            {errors.email.message}
          </p>
        }
      </div>

      <div className="mb-4">
        <label 
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          {...register('password', { required: 'This field is required' })}
          id="password"
          className="w-full border rounded py-2 px-3"
          type="password"
        />
        {
          errors.password && 
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        }
      </div>

      <div className="mb-4">
        <label 
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          {...register('confirmPassword', { 
            required: 'This field is required',
            validate: (value: string) => watch('password') !== value ? 'Passwords don\'t match' : ''
          })}
          id="confirmPassword"
          className="w-full border rounded py-2 px-3"
          type="password"
        />
        {
          errors.password && 
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        }
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default Registration;
