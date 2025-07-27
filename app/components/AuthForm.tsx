'use client';

import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loader from './Loader';
import axios from 'axios';
import { loginUser, registerUser } from '@/lib/authAPI';
type Props = {
  type: 'login' | 'signup';
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .when('type', {
      is: 'signup',
      then: (schema) => schema.oneOf([yup.ref('password')], 'Passwords must match'),
    }),
});

export default function AuthForm({ type }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const onSubmit = async (data: any) => {
  setLoading(true);
  try {
    const result =
      type === 'signup'
        ? await registerUser(data.email, data.password)
        : await loginUser(data.email, data.password);

    toast.success(
      type === 'signup' ? '🎉 Account created!' : '✅ Logged in successfully'
    );

    if (type === 'login') {
      if (result.accessToken) {
        localStorage.setItem('token', result.accessToken);
        // console.log('✔️ Stored token:', localStorage.getItem('token'));
      }
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
  } finally {
    setLoading(false);
  }
};
  // const onSubmit = async (data: any) => {
  //   setLoading(true);
  //   try {
  //     const endpoint =
  //       type === 'signup'
  //         ? 'http://localhost:5000/api/auth/register'
  //         : 'http://localhost:5000/api/auth/login';

  //     const payload = {
  //       email: data.email,
  //       password: data.password,
  //     };

  //     const response = await axios.post(endpoint, payload, {
  //       withCredentials: true, // in case you're using cookies
  //     });

  //     const result = response.data;

  //     toast.success(
  //       type === 'signup' ? '🎉 Account created!' : '✅ Logged in successfully'
  //     );

  //     if (type === 'login') {
  //       // Save access token if backend returns it
  //       if (result.accessToken) {
  //         localStorage.setItem('token', result.accessToken);
  //       }
  //       console.log('✔️ Stored token:', localStorage.getItem('token'));

  //       router.push('/dashboard');
  //     } else {
  //       router.push('/login');
  //     }
  //   } catch (error: any) {
  //     const message =
  //       error.response?.data?.message || error.message || 'Something went wrong';
  //     toast.error(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Loader loading={loading} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 rounded-2xl shadow-xl flex flex-col gap-6 transition-all"
        style={{
          backgroundColor: '#f9f3eb',
          border: '1px solid #f0d9a6',
        }}
      >
        <Typography
          variant="h4"
          className="text-center font-semibold tracking-tight"
          style={{ color: '#2e2e2e' }}
        >
          {type === 'signup' ? 'Create Account' : 'Welcome Back'}
        </Typography>

        {/* Email */}
        <TextField
          label="Email"
          fullWidth
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message as string}
          InputProps={{
            style: {
              borderRadius: 10,
              backgroundColor: '#fff8ee',
            },
          }}
        />

        {/* Password */}
        <TextField
          label="Password"
          fullWidth
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message as string}
          InputProps={{
            style: {
              borderRadius: 10,
              backgroundColor: '#fff8ee',
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password */}
        {type === 'signup' && (
          <TextField
            label="Confirm Password"
            fullWidth
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message as string}
            InputProps={{
              style: {
                borderRadius: 10,
                backgroundColor: '#fff8ee',
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          size="large"
          fullWidth
          style={{
            backgroundColor: '#f4e3c1',
            color: '#2e2e2e',
            fontWeight: 'bold',
            borderRadius: '12px',
            transition: 'all 0.2s',
          }}
          className="hover:bg-[#f0d9a6] active:scale-95"
        >
          {type === 'signup' ? 'Sign Up' : 'Login'}
        </Button>

        <Typography variant="body2" className="text-center text-sm" style={{ color: '#6b6b6b' }}>
          {type === 'signup' ? (
            <>
              Already have an account?{' '}
              <Link href="/login" className="text-[#d39243] font-medium hover:underline">
                Login
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{' '}
              <Link href="/signup" className="text-[#d39243] font-medium hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </Typography>
      </form>
    </>
  );
}
