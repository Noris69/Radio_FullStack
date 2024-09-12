"use client";

import React, { useState } from 'react';
import axios, {AxiosError} from 'axios';
import { useRouter } from 'next/navigation'; // Utilisation de next/navigation pour la redirection
import InputField from './InputField';
import Header from './Header';

const LoginForm: React.FC = () => {
  const router = useRouter(); // Initialisation de useRouter depuis next/navigation
  const [formState, setFormState] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleToggleForm = () => {
    setFormState(formState === 'login' ? 'register' : 'login');
    setError(null);
    setSuccessMessage(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://radio-fullstack.onrender.com/api/users/login', { email, password });
      console.log('Login successful:', res.data);
  
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('role', res.data.role);
  
      if (res.data.role === 'admin') {
        router.push('/OrderList');
      } else {
        router.push('/');
      }
    } catch (err) {
      const error = err as AxiosError;  // Type assertion
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError('Invalid Credentials');
    }
  };
  

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !phone) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await axios.post('https://radio-fullstack.onrender.com/api/users/register', {
        username,
        email,
        password,
        phone,
      });
      console.log('Registration successful:', res.data);
      setSuccessMessage('Registration successful!');
      setError(null);

      // Cachez automatiquement la notification après 2 secondes et passez au formulaire de connexion
      setTimeout(() => {
        setSuccessMessage(null);
        setFormState('login');
      }, 2000);
    } catch (err) {
      const error = err as AxiosError; // Assert err as AxiosError
      console.error(error.response?.data || error.message); // Safely access error response      setError('User already exists or other registration error');
    }
  };

  const handleForgotPassword = () => {
    setFormState('forgotPassword');
  };

  return (
    <>
      {formState === 'login' && (
        <>
          <Header />
          <form className="flex flex-col items-end w-full max-w-md mx-auto" onSubmit={handleLogin}>
            {error && <div className="text-red-500">{error}</div>}
            <InputField
              type="email"
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 text-base font-bold text-white bg-blue-600 rounded-xl"
            >
              تسجيل الدخول
            </button>
            <p className="mt-6 text-sm font-medium mb-20">
              ليس لديك حساب ؟{' '}
              <a href="#" onClick={handleToggleForm} className="font-bold text-blue-600">
                تسجل الآن
              </a>
            </p>
          </form>
        </>
      )}

      {formState === 'register' && (
        <form className="flex flex-col items-end w-full max-w-md mx-auto" onSubmit={handleRegister}>
          {error && <div className="text-red-500">{error}</div>}
          {successMessage && (
            <div className="text-green-500">
              {successMessage}
            </div>
          )}
          <InputField
            type="text"
            placeholder="الاسم الكامل"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="رقم الهاتف"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 text-base font-bold text-white bg-blue-600 rounded-xl"
          >
            تسجيل الآن
          </button>
          <p className="mt-6 text-sm font-medium text-center mb-20">
            لديك حساب؟{' '}
            <a href="#" onClick={handleToggleForm} className="font-bold text-blue-600">
              تسجيل الدخول
            </a>
          </p>
        </form>
      )}

      {formState === 'forgotPassword' && (
        <form className="flex flex-col items-center w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold tracking-wide text-slate-900 mb-4">نسيت كلمة السر</h2>
          <p className="text-sm leading-6 text-slate-500 mb-6">
            أدخل عنوان البريد الإلكتروني المرتبط بحسابك وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
          </p>
          <InputField
            type="email"
            placeholder="البريد الإلكتروني"
            value=""  // Champ non contrôlé
            onChange={() => {}}  // Handler vide
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 text-base font-bold text-white bg-blue-600 rounded-xl"
          >
            متابعة
          </button>
          <a href="#" onClick={() => setFormState('login')} className="mt-4 text-blue-600">
            العودة إلى تسجيل الدخول
          </a>
        </form>
      )}
    </>
  );
};

export default LoginForm;
