// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages publiques
import Login from './pages/Login/Login';

// Pages protégées (tous rôles)
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import Chat from './pages/Chat/Chat';
import Settings from './pages/Settings/Settings';
import Calendar from './pages/Calendar/Calendar';
import Help from './pages/Help/Help';

// Pages Enseignant uniquement
import Upload from './pages/Upload/Upload';

// Pages Admin uniquement
import Users from './pages/Admin/Users';
import Resources from './pages/Admin/Resources';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ==================== */}
          {/* Routes publiques */}
          {/* ==================== */}
          <Route path="/login" element={<Login />} />
          
          {/* Redirection de la racine vers login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* ==================== */}
          {/* Routes pour tous les utilisateurs connectés */}
          {/* ==================== */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/courses" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          
          <Route path="/help" element={
            <ProtectedRoute>
              <Help />
            </ProtectedRoute>
          } />
          
          {/* ==================== */}
          {/* Routes pour les enseignants uniquement */}
          {/* ==================== */}
          <Route path="/upload" element={
            <ProtectedRoute requiredRole="enseignant">
              <Upload />
            </ProtectedRoute>
          } />
          
          {/* ==================== */}
          {/* Routes pour les administrateurs uniquement */}
          {/* ==================== */}
          <Route path="/admin/users" element={
            <ProtectedRoute requiredRole="admin">
              <Users />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/resources" element={
            <ProtectedRoute requiredRole="admin">
              <Resources />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/resources/edit/:id" element={
            <ProtectedRoute requiredRole="admin">
              <div style={{ 
                padding: '2rem', 
                textAlign: 'center',
                background: 'white',
                borderRadius: '12px',
                margin: '2rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h1 style={{ color: '#0f2b4b', marginBottom: '1rem' }}>
                  Page d'édition de ressource
                </h1>
                <p style={{ color: '#6b7280' }}>
                  Cette fonctionnalité est en cours de développement...
                </p>
              </div>
            </ProtectedRoute>
          } />
          
          {/* ==================== */}
          {/* Route pour les pages non trouvées (404) */}
          {/* ==================== */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;