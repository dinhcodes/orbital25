'use client';

import { useState } from 'react';
import { useAuth } from './authContext';

export default function Login() {
  const {
    user,
    signInWithGoogle,
    signUpWithEmail,
    loginWithEmail,
    logOut,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-16 bg-gray-800 text-black flex flex-col gap-4 max-w-md mx-auto rounded-lg">
      {user ? (
        <>
          <span>Hello, {user.displayName || user.email}</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={logOut}>
            Log out
          </button>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>

          <button
            onClick={signInWithGoogle}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Log in with Google
          </button>

          <button
            onClick={() =>
              setMode((prev) => (prev === 'login' ? 'signup' : 'login'))
            }
            className="text-sm underline text-gray-600 mt-2"
          >
            {mode === 'login'
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Log In'}
          </button>
        </>
      )}
    </div>
  );
}