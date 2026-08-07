import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      login(res.data.user, res.data.token);
    } catch (err) {
      // Fallback demo login for UI testing
      login({ name: 'Mahbuba Siddika', role: 'Student', email }, 'demo-jwt-token');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">Sign in</h1>
          <p className="text-neutral-400 text-xs mt-1">sign in and start learning</p>
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Login / Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-emerald-800/80 rounded-lg text-white placeholder-emerald-200 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-emerald-800/80 rounded-lg text-white placeholder-emerald-200 text-sm outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />

          <div className="flex items-center space-x-2 text-xs text-neutral-300">
            <input type="checkbox" id="remember" className="rounded bg-neutral-800 text-emerald-500" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 font-semibold text-sm rounded-lg hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        <div className="space-y-2.5 pt-2">
          <button className="w-full py-2.5 bg-blue-600 rounded-lg text-xs font-medium">Log in with Facebook</button>
          <button className="w-full py-2.5 bg-white text-black rounded-lg text-xs font-medium">Log in with Google</button>
          <button className="w-full py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium">Log in with Apple</button>
        </div>
      </div>
    </div>
  );
}