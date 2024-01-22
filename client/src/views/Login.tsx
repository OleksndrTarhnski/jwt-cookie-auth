import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm<ILoginForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res = await api.post('/login', data);
      console.log(res);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
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

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
