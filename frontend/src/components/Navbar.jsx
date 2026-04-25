import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  X,
  Sparkles,
  LogIn,
  LogOut,
  User,
  House,
  LayoutDashboard,
  Upload,
  MessageCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAvatarUrl } from '../utils/avatar';

import realLeaf from '../assets/logo/real-leaf.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setScrolled(currentScroll > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navWidth = 100;
  const borderRadius = 0;

  const navLinks = [
    { name: 'Home', path: '/', icon: House },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload', path: '/upload', icon: Upload },
    { name: 'Contact', path: '/contact', icon: MessageCircle },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        width: `${navWidth}%`,
        borderRadius: `${borderRadius}px`,
        background: scrolled
          ? 'linear-gradient(135deg, rgba(248, 254, 254, 0.85) 0%, rgba(135, 206, 235, 0.12) 50%, rgba(144, 238, 144, 0.1) 100%)'
          : 'linear-gradient(135deg, rgba(248, 254, 254, 0.70) 0%, rgba(135, 206, 235, 0.08) 50%, rgba(144, 238, 144, 0.06) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled
          ? '2px solid rgba(135, 206, 235, 0.4)'
          : '1.5px solid rgba(135, 206, 235, 0.25)',
        boxShadow: scrolled
          ? '0 12px 50px rgba(135, 206, 235, 0.2), 0 0 30px rgba(144, 238, 144, 0.1)'
          : '0 8px 32px rgba(135, 206, 235, 0.08), 0 0 20px rgba(144, 238, 144, 0.05)',
      }}
      animate={{
        y: 0,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-full"
        style={{
          background: 'linear-gradient(90deg, transparent, #90EE90, #87CEEB, transparent)',
          opacity: 0.6,
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center gap-3 group relative"
            >
              <motion.div
                className="absolute -inset-2 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(144, 238, 144, 0.4), rgba(135, 206, 235, 0.3))',
                }}
              />

              <motion.div
                className="p-1.5 rounded-xl relative z-10 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(135, 206, 235, 0.2), rgba(144, 238, 144, 0.15))',
                  border: '1px solid rgba(144, 238, 144, 0.35)',
                  boxShadow: '0 0 15px rgba(144, 238, 144, 0.2), inset 0 0 8px rgba(135, 206, 235, 0.1)',
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 25px rgba(144, 238, 144, 0.4), inset 0 0 12px rgba(135, 206, 235, 0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <img src={realLeaf} alt="Logo" className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
                </motion.div>
              </motion.div>

              <motion.div
                className="relative z-10 hidden sm:block"
                animate={{ scale: scrollY > 200 ? 0.85 : 1 }}
              >
                <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-blue-dark bg-clip-text text-transparent">
                  Clean<span className="text-emerald-500">2</span>Earn
                </span>
                <motion.div
                  className="h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mt-1 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </NavLink>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={() =>
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative group overflow-hidden'
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-lg"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(144, 238, 144, 0.25), rgba(135, 206, 235, 0.15))'
                            : 'linear-gradient(135deg, rgba(144, 238, 144, 0.08), rgba(135, 206, 235, 0.05))',
                          border: isActive
                            ? '1.5px solid rgba(144, 238, 144, 0.35)'
                            : '1px solid rgba(144, 238, 144, 0.15)',
                          boxShadow: isActive
                            ? '0 0 20px rgba(144, 238, 144, 0.2), inset 0 0 10px rgba(135, 206, 235, 0.1)'
                            : '0 0 10px rgba(144, 238, 144, 0.08)',
                        }}
                        whileHover={{
                          boxShadow: '0 0 25px rgba(144, 238, 144, 0.3), inset 0 0 12px rgba(135, 206, 235, 0.15)',
                        }}
                        layoutId={isActive ? 'activeNav' : undefined}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />

                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-1 h-1 rounded-full bg-light-green-dark"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="w-1 h-1 rounded-full bg-sky-blue"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                          />
                        </motion.div>
                      )}

                      <span className={`relative z-10 flex items-center gap-2 text-xs sm:text-sm ${
                        isActive
                          ? 'text-light-green-dark'
                          : 'text-slate-700 group-hover:text-light-green-dark'
                      }`}>
                        <link.icon size={18} strokeWidth={2.2} />
                        <span className="hidden lg:inline">{link.name}</span>
                      </span>
                    </>
                  )}
                </NavLink>
              ))}

              <motion.div
                className="h-6 w-[1.5px] bg-gradient-to-b from-transparent via-sky-blue/40 to-transparent mx-2"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <NavLink
                to="/join-beta"
                className="relative group ml-2"
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      className="absolute -inset-1 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(144, 238, 144, 0.5), rgba(135, 206, 235, 0.3))',
                      }}
                    />

                    <motion.div
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #90EE90 0%, #228B22 100%)'
                          : 'linear-gradient(135deg, rgba(144, 238, 144, 0.25), rgba(135, 206, 235, 0.2))',
                        border: isActive
                          ? '1.5px solid #90EE90'
                          : '1.5px solid rgba(144, 238, 144, 0.4)',
                        boxShadow: isActive
                          ? '0 0 25px rgba(144, 238, 144, 0.6)'
                          : '0 0 15px rgba(144, 238, 144, 0.25)',
                      }}
                      whileHover={{
                        boxShadow: isActive
                          ? '0 0 35px rgba(144, 238, 144, 0.8)'
                          : '0 0 30px rgba(144, 238, 144, 0.5)',
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative px-6 py-2 rounded-xl flex items-center gap-2 font-bold text-sm whitespace-nowrap">
                      <motion.div
                        animate={{ rotate: [0, 20, -20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles size={16} className={isActive ? 'text-white' : 'text-light-green-dark'} />
                      </motion.div>
                      <span className={isActive ? 'text-white' : 'text-slate-700 group-hover:text-light-green-dark'}>
                        Join Beta
                      </span>
                    </div>
                  </>
                )}
              </NavLink>

              <motion.div
                className="h-6 w-[1.5px] bg-gradient-to-b from-transparent via-sky-blue/40 to-transparent mx-1"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {user ? (
                <div className="flex items-center gap-2 ml-1">
                  <div className="px-2 py-1.5 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-2" style={{ background: 'rgba(144,238,144,0.15)', border: '1px solid rgba(144,238,144,0.25)' }}>
                    <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-200">
                      <img 
                        src={getAvatarUrl(user.name)} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="hidden lg:inline">{user.name?.split(' ')[0]}</span>
                  </div>
                  <motion.button
                    onClick={() => { logout(); navigate('/'); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 flex items-center gap-1.5 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={14} />
                    <span className="hidden lg:inline">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="ml-1 px-5 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-2 transition-all hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
                    boxShadow: '0 0 15px rgba(16,185,129,0.25)',
                  }}
                >
                  <LogIn size={15} />
                  <span>Login</span>
                </NavLink>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-light-green-dark focus:outline-none transition-colors"
              style={{
                background: isOpen
                  ? 'linear-gradient(135deg, rgba(144, 238, 144, 0.2), rgba(135, 206, 235, 0.15))'
                  : 'transparent',
                border: isOpen ? '1px solid rgba(144, 238, 144, 0.2)' : 'none',
              }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            background: 'linear-gradient(135deg, rgba(248, 254, 254, 0.9) 0%, rgba(135, 206, 235, 0.15) 100%)',
            borderTop: '2px solid rgba(135, 206, 235, 0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 12px 50px rgba(135, 206, 235, 0.15)',
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-4 py-6 space-y-3">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={() =>
                    'block px-4 py-3 rounded-lg text-base font-semibold transition-all relative group overflow-hidden'
                  }
                >
                  {({ isActive }) => (
                    <>
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-lg"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(144, 238, 144, 0.25), rgba(135, 206, 235, 0.15))'
                            : 'linear-gradient(135deg, rgba(144, 238, 144, 0.1), rgba(135, 206, 235, 0.08))',
                          border: isActive
                            ? '1.5px solid rgba(144, 238, 144, 0.3)'
                            : '1px solid rgba(144, 238, 144, 0.15)',
                          boxShadow: isActive
                            ? '0 0 15px rgba(144, 238, 144, 0.2)'
                            : '0 0 8px rgba(144, 238, 144, 0.08)',
                        }}
                      />
                      <span className={`relative z-10 flex items-center gap-2 ${
                        isActive
                          ? 'text-light-green-dark'
                          : 'text-slate-700'
                      }`}>
                        <link.icon size={18} strokeWidth={2.2} />
                        {link.name}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <div className="w-2 h-2 rounded-full bg-light-green-dark" />
                        </motion.div>
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <NavLink
                to="/join-beta"
                onClick={() => setIsOpen(false)}
                className={() =>
                  'block px-4 py-3 rounded-lg text-base font-bold text-center transition-all duration-300 mt-4 relative overflow-hidden group'
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-lg"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #90EE90, #228B22)'
                          : 'linear-gradient(135deg, rgba(144, 238, 144, 0.2), rgba(135, 206, 235, 0.12))',
                        border: isActive
                          ? '1.5px solid rgba(144, 238, 144, 0.5)'
                          : '1.5px solid rgba(144, 238, 144, 0.2)',
                        boxShadow: isActive
                          ? '0 0 20px rgba(144, 238, 144, 0.4)'
                          : '0 0 12px rgba(144, 238, 144, 0.12)',
                      }}
                      whileHover={{
                        boxShadow: isActive
                          ? '0 0 30px rgba(144, 238, 144, 0.6)'
                          : '0 0 20px rgba(144, 238, 144, 0.25)',
                      }}
                    />
                    <span className={`relative z-10 flex items-center justify-center gap-2 ${isActive ? 'text-white' : 'text-slate-700 group-hover:text-light-green-dark'}`}>
                      <Sparkles size={16} />
                      Join Beta
                    </span>
                  </>
                )}
              </NavLink>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              {user ? (
                <button
                  onClick={() => { logout(); navigate('/'); setIsOpen(false); }}
                  className="w-full mt-3 px-4 py-3 rounded-lg text-base font-bold text-center text-red-500 flex items-center justify-center gap-2 transition-all"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  <LogOut size={18} />
                  Logout ({user.name?.split(' ')[0]})
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full mt-3 px-4 py-3 rounded-lg text-base font-bold text-center text-white flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #0ea5e9)',
                    boxShadow: '0 0 15px rgba(16,185,129,0.25)',
                  }}
                >
                  <LogIn size={18} />
                  Login / Register
                </NavLink>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
