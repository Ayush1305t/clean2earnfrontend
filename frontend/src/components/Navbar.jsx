import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Leaf } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Upload', path: '/upload' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 dark:border-white/10 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary-light/10 dark:bg-primary-light/20 text-emerald-500 dark:text-primary-light group-hover:scale-110 transition-transform">
                <Leaf size={24} className="dark:text-glow" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                Clean<span className="text-emerald-500 dark:text-primary-light">2</span>Earn
              </span>
            </NavLink>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                      isActive
                        ? 'text-emerald-600 dark:text-primary-light bg-black/5 dark:bg-white/10'
                        : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:bg-black/5 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <NavLink
                to="/join-beta"
                className={({ isActive }) =>
                  `ml-2 px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-500 text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20'
                      : 'glass border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:border-emerald-500 dark:hover:border-primary-light'
                  }`
                }
              >
                Join Beta
              </NavLink>

              <div className="pl-4 ml-4 border-l border-slate-200 dark:border-slate-700 font-normal">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass border-t border-black/5 dark:border-white/10 overflow-hidden"
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600 dark:text-primary-light bg-black/5 dark:bg-white/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:bg-black/5 dark:hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <NavLink
              to="/join-beta"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-base font-bold text-center transition-all duration-300 mt-4 ${
                  isActive
                    ? 'bg-emerald-500 text-white dark:text-slate-900 shadow-lg shadow-emerald-500/20'
                    : 'glass border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-primary-light hover:border-emerald-500 dark:hover:border-primary-light'
                }`
              }
            >
              Join Beta
            </NavLink>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
