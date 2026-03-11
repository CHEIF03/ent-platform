// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simulation de connexion
    return new Promise((resolve) => {
      setTimeout(() => {
        let userData = null;
        
        if (username === 'etudiant' && password === '123456') {
          userData = {
            id: 1,
            username: 'etudiant',
            firstName: 'Jean',
            lastName: 'Dupont',
            email: 'jean.dupont@est.um5.ac.ma',
            role: 'etudiant'
          };
        } else if (username === 'enseignant' && password === '123456') {
          userData = {
            id: 2,
            username: 'enseignant',
            firstName: 'Marie',
            lastName: 'Martin',
            email: 'marie.martin@est.um5.ac.ma',
            role: 'enseignant'
          };
        } else if (username === 'admin' && password === '123456') {
          userData = {
            id: 3,
            username: 'admin',
            firstName: 'Admin',
            lastName: 'EST',
            email: 'admin@est.um5.ac.ma',
            role: 'admin'
          };
        }

        if (userData) {
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve({ success: true, user: userData });
        } else {
          resolve({ success: false, error: 'Identifiants incorrects' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};