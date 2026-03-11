// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';
import { 
  Home, 
  BookOpen, 
  Download, 
  MessageCircle, 
  Upload, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleIcon = () => {
    switch(user?.role) {
      case 'etudiant': return '👨‍🎓';
      case 'enseignant': return '👨‍🏫';
      case 'admin': return '👨‍💼';
      default: return '👤';
    }
  };

  const getRoleLabel = () => {
    switch(user?.role) {
      case 'etudiant': return 'Étudiant';
      case 'enseignant': return 'Enseignant';
      case 'admin': return 'Administrateur';
      default: return 'Utilisateur';
    }
  };

  return (
    <aside className={`sidebar-white ${collapsed ? 'collapsed' : ''}`}>
      {/* Header */}
      <div className="sidebar-white-header">
        <div className="sidebar-white-logo-container">
          <img src="/logo.png" alt="EST Salé" className="sidebar-white-logo" />
          {!collapsed && <span className="sidebar-white-brand">EST Salé</span>}
        </div>
        <button 
          className="sidebar-white-toggle" 
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Profil */}
      <div className="sidebar-white-user">
        <div className="sidebar-white-avatar">
          {user?.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        {!collapsed && (
          <div className="sidebar-white-user-info">
            <span className="sidebar-white-user-name">{user?.username}</span>
            <span className="sidebar-white-user-role">
              {getRoleIcon()} {getRoleLabel()}
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-white-nav">
        {/* Accueil */}
        <div className="sidebar-white-section">
          {!collapsed && <p className="sidebar-white-section-title">ACCUEIL</p>}
          <button
            className={`sidebar-white-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
          >
            <Home size={18} />
            {!collapsed && <span>Tableau de bord</span>}
          </button>
        </div>

        {/* Étudiant */}
        {user.role === 'etudiant' && (
          <div className="sidebar-white-section">
            {!collapsed && <p className="sidebar-white-section-title">ÉTUDIANT</p>}
            <button
              className={`sidebar-white-item ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => navigate('/courses')}
            >
              <BookOpen size={18} />
              {!collapsed && <span>Mes cours</span>}
            </button>
            
            <button
              className={`sidebar-white-item ${location.pathname === '/downloads' ? 'active' : ''}`}
              onClick={() => navigate('/downloads')}
            >
              <Download size={18} />
              {!collapsed && <span>Téléchargements</span>}
            </button>
            
            <button
              className={`sidebar-white-item ${location.pathname === '/chat' ? 'active' : ''}`}
              onClick={() => navigate('/chat')}
            >
              <MessageCircle size={18} />
              {!collapsed && <span>Chat IA</span>}
            </button>
          </div>
        )}

        {/* Enseignant */}
        {user.role === 'enseignant' && (
          <div className="sidebar-white-section">
            {!collapsed && <p className="sidebar-white-section-title">ENSEIGNANT</p>}
            <button
              className={`sidebar-white-item ${location.pathname === '/upload' ? 'active' : ''}`}
              onClick={() => navigate('/upload')}
            >
              <Upload size={18} />
              {!collapsed && <span>Ajouter un cours</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => navigate('/courses')}
            >
              <BookOpen size={18} />
              {!collapsed && <span>Gérer les cours</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/chat' ? 'active' : ''}`}
              onClick={() => navigate('/chat')}
            >
              <MessageCircle size={18} />
              {!collapsed && <span>Chat IA</span>}
            </button>
          </div>
        )}

        {/* Administrateur */}
        {user.role === 'admin' && (
          <div className="sidebar-white-section">
            {!collapsed && <p className="sidebar-white-section-title">ADMINISTRATION</p>}
            <button
              className={`sidebar-white-item ${location.pathname === '/admin/users' ? 'active' : ''}`}
              onClick={() => navigate('/admin/users')}
            >
              <Users size={18} />
              {!collapsed && <span>Utilisateurs</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/admin/resources' ? 'active' : ''}`}
              onClick={() => navigate('/admin/resources')}
            >
              <FolderOpen size={18} />
              {!collapsed && <span>Ressources</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => navigate('/courses')}
            >
              <BookOpen size={18} />
              {!collapsed && <span>Tous les cours</span>}
            </button>
          </div>
        )}

        {/* Général - POUR TOUS LES UTILISATEURS */}
        <div className="sidebar-white-section">
          {!collapsed && <p className="sidebar-white-section-title">GÉNÉRAL</p>}
          
          {/* ✅ MESSAGES - Pour tous les utilisateurs */}
          <button
            className={`sidebar-white-item ${location.pathname === '/messages' ? 'active' : ''}`}
            onClick={() => navigate('/messages')}
          >
            <MessageCircle size={18} />
            {!collapsed && <span>Messages</span>}
          </button>
          
          <button
            className={`sidebar-white-item ${location.pathname === '/calendar' ? 'active' : ''}`}
            onClick={() => navigate('/calendar')}
          >
            <Calendar size={18} />
            {!collapsed && <span>Calendrier</span>}
          </button>
          
          <button
            className={`sidebar-white-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={() => navigate('/settings')}
          >
            <Settings size={18} />
            {!collapsed && <span>Paramètres</span>}
          </button>
          
          <button
            className={`sidebar-white-item ${location.pathname === '/help' ? 'active' : ''}`}
            onClick={() => navigate('/help')}
          >
            <HelpCircle size={18} />
            {!collapsed && <span>Aide</span>}
          </button>
        </div>
      </nav>

      {/* Déconnexion */}
      <div className="sidebar-white-footer">
        <button className="sidebar-white-item logout" onClick={handleLogout}>
          <LogOut size={18} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;