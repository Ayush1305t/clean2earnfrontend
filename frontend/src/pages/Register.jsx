import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { getApiUrl, getNetworkErrorMessage, parseApiResponse } from '../utils/api';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await parseApiResponse(res);

      if (!res.ok) {
        setError(data.message || 'Registration failed');
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
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-blue/20 rounded-full blur-[100px] z-[-1]" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-light-green/20 rounded-full blur-[120px] z-[-1]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/20">
            <UserPlus size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">Create Account</h1>
          <p className="text-slate-500 mt-3 text-lg font-medium">Join the Clean2Earn movement</p>
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
                <User size={16} /> Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ayush Tiwari"
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
              />
            </div>

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
                placeholder="Create a secure password"
                className="w-full bg-white/70 border border-sky-blue/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-light-green/30 focus:border-light-green-dark text-slate-900 transition-all shadow-inner"
              />
              <p className="text-xs text-slate-400 ml-1">Minimum 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-700 text-white font-bold text-lg py-5 rounded-2xl shadow-xl shadow-teal-500/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-slate-500 font-medium relative z-10">
            Already have an account?{' '}
            <Link to="/login" className="text-light-green-dark font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
