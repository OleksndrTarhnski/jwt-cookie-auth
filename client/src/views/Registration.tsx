/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';

interface IRegisterForm {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
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
      const { confirmPassword, agreeTerms, ...reqBody } = data;
      const res = await api.post('/register', reqBody);
      console.log(res);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6">
      <h1 className="text-2xl mb-8 text-gray-700">
        Sign up
      </h1>
      <div className="mb-4">
        <label 
          className="block text-gray-500 text-sm font-semibold mb-2"
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
          className="w-full text-gray-500 font-semibold border-2 border-gray-400 rounded-3xl py-2 px-4 focus:border-violet-500 focus:shadow-md"
        />
        {
          errors.userName && 
          <p className="text-red-500 text-xs font-semibold mt-1">
            {errors.userName.message}
          </p>
        }
      </div>

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
          className="block text-gray-500 font-semibold text-sm mb-2"
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

      <div className="mb-4">
        <label 
          className="block text-gray-500 text-sm font-semibold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          {...register('confirmPassword', { 
            required: 'This field is required',
            validate: (value: string) => {
              if (watch('password') !== value) return 'Passwords don\'t match'
            }
          })}
          id="confirmPassword"
          className="w-full text-gray-500 font-semibold border-2 border-gray-400 rounded-3xl py-2 px-4 focus:border-violet-500 focus:shadow-md"
          type="password"
        />
        {
          errors.confirmPassword && 
          <p className="text-red-500 text-xs font-semibold mt-1">
            {errors.confirmPassword.message}
          </p>
        }
      </div>

      <div className="mb-7 flex items-center">
        <input
          {...register('agreeTerms', { required: true })}
          id="agreeToTerms"
          type="checkbox"
          className="mr-2"
        />
        <label 
          className={`text-sm ${errors.agreeTerms ? 'text-red-500' : 'text-gray-500'}`}
          htmlFor="agreeToTerms"
        >
          I agree to the terms and conditions
        </label>
      </div>

      <button 
        type="submit" 
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-2 px-4 rounded-3xl font-light w-full hover:shadow-lg"
      >
        Sign up
      </button>

      <p className="text-gray-500 text-sm mt-4">
        Already have account?{' '}
        <Link 
          to="/login"
          className="text-violet-500"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default Registration;
