// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  // Vérifier si l'utilisateur est connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (requiredRole && user.role !== requiredRole) {
    // Rediriger vers le dashboard si pas les droits
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;