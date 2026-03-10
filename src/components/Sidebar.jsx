// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  FolderOpen,
  FileText
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

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

  if (!user) return null;

  return (
    <aside className={`sidebar-white ${collapsed ? 'collapsed' : ''}`}>
      {/* Header avec logo et nom EST Salé */}
      <div className="sidebar-white-header">
        <div className="sidebar-white-logo-container">
          <img src="/logo.png" alt="EST Salé" className="sidebar-white-logo" />
          {!collapsed && <span className="sidebar-white-brand">EST Salé</span>}
        </div>
        <button 
          className="sidebar-white-toggle" 
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Développer' : 'Réduire'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Profil utilisateur */}
      <div className="sidebar-white-user">
        <div className="sidebar-white-avatar">
          {user?.username?.charAt(0).toUpperCase()}
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
        {/* Section Accueil - pour tous */}
        <div className="sidebar-white-section">
          {!collapsed && <p className="sidebar-white-section-title">Accueil</p>}
          <button
            className={`sidebar-white-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/dashboard')}
            title={collapsed ? 'Tableau de bord' : ''}
          >
            <Home size={18} />
            {!collapsed && <span>Tableau de bord</span>}
          </button>
        </div>

        {/* Section Étudiant */}
        {user.role === 'etudiant' && (
          <div className="sidebar-white-section">
            {!collapsed && <p className="sidebar-white-section-title">Étudiant</p>}
            <button
              className={`sidebar-white-item ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => navigate('/courses')}
              title={collapsed ? 'Mes cours' : ''}
            >
              <BookOpen size={18} />
              {!collapsed && <span>Mes cours</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/downloads' ? 'active' : ''}`}
              onClick={() => navigate('/downloads')}
              title={collapsed ? 'Téléchargements' : ''}
            >
              <Download size={18} />
              {!collapsed && <span>Téléchargements</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/chat' ? 'active' : ''}`}
              onClick={() => navigate('/chat')}
              title={collapsed ? 'Chat IA' : ''}
            >
              <MessageCircle size={18} />
              {!collapsed && <span>Chat IA</span>}
            </button>
          </div>
        )}

        {/* Section Enseignant */}
        {user.role === 'enseignant' && (
          <div className="sidebar-white-section">
            {!collapsed && <p className="sidebar-white-section-title">Enseignant</p>}
            <button
              className={`sidebar-white-item ${location.pathname === '/upload' ? 'active' : ''}`}
              onClick={() => navigate('/upload')}
              title={collapsed ? 'Ajouter un cours' : ''}
            >
              <Upload size={18} />
              {!collapsed && <span>Ajouter un cours</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => navigate('/courses')}
              title={collapsed ? 'Gérer les cours' : ''}
            >
              <BookOpen size={18} />
              {!collapsed && <span>Gérer les cours</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/chat' ? 'active' : ''}`}
              onClick={() => navigate('/chat')}
              title={collapsed ? 'Chat IA' : ''}
            >
              <MessageCircle size={18} />
              {!collapsed && <span>Chat IA</span>}
            </button>
          </div>
        )}

        {/* Section Administrateur */}
        {user.role === 'admin' && (
          <div className="sidebar-white-section">
            {!collapsed && <p className="sidebar-white-section-title">Administration</p>}
            <button
              className={`sidebar-white-item ${location.pathname === '/admin/users' ? 'active' : ''}`}
              onClick={() => navigate('/admin/users')}
              title={collapsed ? 'Utilisateurs' : ''}
            >
              <Users size={18} />
              {!collapsed && <span>Utilisateurs</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/admin/resources' ? 'active' : ''}`}
              onClick={() => navigate('/admin/resources')}
              title={collapsed ? 'Ressources' : ''}
            >
              <FolderOpen size={18} />
              {!collapsed && <span>Ressources</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/courses' ? 'active' : ''}`}
              onClick={() => navigate('/courses')}
              title={collapsed ? 'Tous les cours' : ''}
            >
              <BookOpen size={18} />
              {!collapsed && <span>Tous les cours</span>}
            </button>
            <button
              className={`sidebar-white-item ${location.pathname === '/chat' ? 'active' : ''}`}
              onClick={() => navigate('/chat')}
              title={collapsed ? 'Chat IA' : ''}
            >
              <MessageCircle size={18} />
              {!collapsed && <span>Chat IA</span>}
            </button>
          </div>
        )}

        {/* Section Générale - pour tous */}
        <div className="sidebar-white-section">
          {!collapsed && <p className="sidebar-white-section-title">Général</p>}
          <button
            className={`sidebar-white-item ${location.pathname === '/calendar' ? 'active' : ''}`}
            onClick={() => navigate('/calendar')}
            title={collapsed ? 'Calendrier' : ''}
          >
            <Calendar size={18} />
            {!collapsed && <span>Calendrier</span>}
          </button>
          <button
            className={`sidebar-white-item ${location.pathname === '/settings' ? 'active' : ''}`}
            onClick={() => navigate('/settings')}
            title={collapsed ? 'Paramètres' : ''}
          >
            <Settings size={18} />
            {!collapsed && <span>Paramètres</span>}
          </button>
          <button
            className={`sidebar-white-item ${location.pathname === '/help' ? 'active' : ''}`}
            onClick={() => navigate('/help')}
            title={collapsed ? 'Aide' : ''}
          >
            <HelpCircle size={18} />
            {!collapsed && <span>Aide</span>}
          </button>
        </div>
      </nav>

      {/* Bouton de déconnexion */}
      <div className="sidebar-white-footer">
        <button 
          className="sidebar-white-item logout" 
          onClick={handleLogout}
          title={collapsed ? 'Déconnexion' : ''}
        >
          <LogOut size={18} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;