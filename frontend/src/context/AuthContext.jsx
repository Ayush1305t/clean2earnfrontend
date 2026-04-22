import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('eco_token') || localStorage.getItem('token');
    const savedUser = localStorage.getItem('eco_user');

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        localStorage.setItem('eco_token', savedToken);
        localStorage.removeItem('token');
      } catch {
        localStorage.removeItem('eco_token');
        localStorage.removeItem('token');
        localStorage.removeItem('eco_user');
      }
    }

    setLoading(false);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('eco_token', authToken);
    localStorage.setItem('eco_user', JSON.stringify(userData));
    localStorage.removeItem('token');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('eco_token');
    localStorage.removeItem('token');
    localStorage.removeItem('eco_user');
  };

  const updateUser = (updatedData) => {
    setUser((currentUser) => {
      const mergedUser = { ...(currentUser || {}), ...updatedData };
      localStorage.setItem('eco_user', JSON.stringify(mergedUser));
      return mergedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
