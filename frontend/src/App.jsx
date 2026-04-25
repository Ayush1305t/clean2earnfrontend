import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { Loader2 } from 'lucide-react';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Upload = lazy(() => import('./pages/Upload'));
const Contact = lazy(() => import('./pages/Contact'));
const JoinBeta = lazy(() => import('./pages/JoinBeta'));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh] w-full">
    <Loader2 size={40} className="text-emerald-500 animate-spin" />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#1e293b',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            padding: '1rem',
            fontWeight: '600',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="min-h-screen relative w-full overflow-x-hidden selection:bg-primary-light/30">
        <AnimatedBackground />

        <Navbar />

        <main className="relative z-10 w-full pt-10 min-h-screen flex flex-col">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/join-beta" element={<JoinBeta />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App


