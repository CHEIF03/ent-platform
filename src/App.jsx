// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// ===== PAGES PUBLIQUES (sans sidebar) =====
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

// ===== PAGES PROTÉGÉES (avec sidebar) =====
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import Chat from './pages/Chat/Chat';
import Downloads from './pages/Downloads/Downloads';
import Upload from './pages/Upload/Upload';
import Settings from './pages/Settings/Settings';
import Calendar from './pages/Calendar/Calendar';
import Help from './pages/Help/Help';
import Messages from './pages/Messages/Messages';

// ===== PAGES ADMIN =====
import AdminUsers from './pages/Admin/Users';
import AdminResources from './pages/Admin/Resources';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ============================= */}
          {/* 1. ROUTES PUBLIQUES */}
          {/* ============================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* ============================= */}
          {/* 2. ROUTES POUR TOUS LES UTILISATEURS CONNECTÉS */}
          {/* ============================= */}
          
          {/* Tableau de bord */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Gestion des cours */}
          <Route 
            path="/courses" 
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            } 
          />

          {/* Chat IA */}
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } 
          />

          {/* Téléchargements (pour étudiants) */}
          <Route 
            path="/downloads" 
            element={
              <ProtectedRoute>
                <Downloads />
              </ProtectedRoute>
            } 
          />

          {/* Messagerie */}
          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } 
          />

          {/* Paramètres */}
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />

          {/* Calendrier */}
          <Route 
            path="/calendar" 
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } 
          />

          {/* Aide */}
          <Route 
            path="/help" 
            element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } 
          />

          {/* ============================= */}
          {/* 3. ROUTES ENSEIGNANT UNIQUEMENT */}
          {/* ============================= */}
          
          {/* Upload de cours (réservé aux enseignants) */}
          <Route 
            path="/upload" 
            element={
              <ProtectedRoute requiredRole="enseignant">
                <Upload />
              </ProtectedRoute>
            } 
          />

          {/* ============================= */}
          {/* 4. ROUTES ADMIN UNIQUEMENT */}
          {/* ============================= */}
          
          {/* Gestion des utilisateurs */}
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            } 
          />

          {/* Gestion des ressources */}
          <Route 
            path="/admin/resources" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminResources />
              </ProtectedRoute>
            } 
          />

          {/* Édition de ressource (sous-route) */}
          <Route 
            path="/admin/resources/edit/:id" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminResources />
              </ProtectedRoute>
            } 
          />

          {/* ============================= */}
          {/* 5. ROUTE 404 - PAGE NON TROUVÉE */}
          {/* ============================= */}
          
          <Route path="*" element={<Navigate to="/login" replace />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;