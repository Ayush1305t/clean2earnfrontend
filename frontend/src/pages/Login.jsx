import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { getApiUrl, getNetworkErrorMessage, parseApiResponse } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await parseApiResponse(res);

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(getNetworkErrorMessage(err, 'Server error. Please try again.'));
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex items-center justify-center min-h-[80vh]">
      {/* Background Decorators */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-light-green/20 rounded-full blur-[100px] z-[-1]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-blue/20 rounded-full blur-[120px] z-[-1]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-cyan-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/20">
            <LogIn size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-3 text-lg font-medium">Sign in to your Clean2Earn account</p>
        </div>

        <div className="glass p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-semibold text-center relative z-10"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                <Mail size={16} /> Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-slate-700 ml-1 group-focus-within:text-light-green-dark transition-colors flex items-center gap-2">
                <Lock size={16} /> Password
              </label>
              <input
                required
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-indigo-700 text-white font-bold text-lg py-5 rounded-2xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 font-medium relative z-10">
            Don't have an account?{' '}
            <Link to="/register" className="text-light-green-dark font-bold hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
