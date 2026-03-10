// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Simulation de différents rôles selon l'email
          let role = 'etudiant';
          
          if (username.includes('enseignant')) {
            role = 'enseignant';
          } else if (username.includes('admin')) {
            role = 'admin';
          }

          const userData = {
            id: 1,
            username: username,
            email: username,
            role: role,
            token: 'fake-jwt-token'
          };
          
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          setLoading(false);
          resolve({ success: true, user: userData });
        }, 1500);
      });
    } catch (error) {
      setLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};