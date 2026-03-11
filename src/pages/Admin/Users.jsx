// src/pages/Admin/Users.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  UserCheck,
  UserX,
  GraduationCap,
  Briefcase,
  Shield,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';
import './Admin.css';

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // États
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'

  // Données simulées des utilisateurs
  const [users, setUsers] = useState([
    { 
      id: 1, 
      firstName: 'Jean', 
      lastName: 'Dupont', 
      email: 'jean.dupont@est.um5.ac.ma',
      phone: '0612345678',
      role: 'etudiant',
      status: 'actif',
      filiere: 'Génie Informatique',
      niveau: '2ème année',
      dateInscription: '2024-09-15',
      lastLogin: '2025-03-10'
    },
    { 
      id: 2, 
      firstName: 'Marie', 
      lastName: 'Martin', 
      email: 'marie.martin@est.um5.ac.ma',
      phone: '0623456789',
      role: 'enseignant',
      status: 'actif',
      departement: 'Informatique',
      grade: 'Professeur',
      dateInscription: '2023-09-01',
      lastLogin: '2025-03-11'
    },
    { 
      id: 3, 
      firstName: 'Pierre', 
      lastName: 'Bernard', 
      email: 'pierre.bernard@est.um5.ac.ma',
      phone: '0634567890',
      role: 'etudiant',
      status: 'inactif',
      filiere: 'Génie Électrique',
      niveau: '3ème année',
      dateInscription: '2024-09-15',
      lastLogin: '2025-02-28'
    },
    { 
      id: 4, 
      firstName: 'Sophie', 
      lastName: 'Petit', 
      email: 'sophie.petit@est.um5.ac.ma',
      phone: '0645678901',
      role: 'admin',
      status: 'actif',
      dateInscription: '2022-09-01',
      lastLogin: '2025-03-11'
    },
    { 
      id: 5, 
      firstName: 'Thomas', 
      lastName: 'Dubois', 
      email: 'thomas.dubois@est.um5.ac.ma',
      phone: '0656789012',
      role: 'enseignant',
      status: 'en_attente',
      departement: 'Génie Civil',
      grade: 'Maître de Conférences',
      dateInscription: '2025-03-01',
      lastLogin: null
    },
    { 
      id: 6, 
      firstName: 'Léa', 
      lastName: 'Moreau', 
      email: 'lea.moreau@est.um5.ac.ma',
      phone: '0667890123',
      role: 'etudiant',
      status: 'actif',
      filiere: 'Gestion',
      niveau: '1ère année',
      dateInscription: '2024-09-15',
      lastLogin: '2025-03-09'
    }
  ]);

  // Statistiques
  const stats = {
    total: users.length,
    etudiants: users.filter(u => u.role === 'etudiant').length,
    enseignants: users.filter(u => u.role === 'enseignant').length,
    admins: users.filter(u => u.role === 'admin').length,
    actifs: users.filter(u => u.status === 'actif').length,
    inactifs: users.filter(u => u.status === 'inactif').length,
    enAttente: users.filter(u => u.status === 'en_attente').length
  };

  // Fonctions de filtrage
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Fonctions d'action
  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  const handleToggleStatus = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'actif' ? 'inactif' : 'actif' }
        : u
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(u => u.id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  const handleApproveUser = (userId) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: 'actif' }
        : u
    ));
  };

  const handleRejectUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir rejeter cette inscription ?')) {
      setUsers(users.filter(u => u.id !== userId));
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    }
  };

  // Rendu du badge de rôle
  const getRoleBadge = (role) => {
    switch(role) {
      case 'etudiant':
        return (
          <span className="role-badge etudiant">
            <GraduationCap size={14} />
            Étudiant
          </span>
        );
      case 'enseignant':
        return (
          <span className="role-badge enseignant">
            <Briefcase size={14} />
            Enseignant
          </span>
        );
      case 'admin':
        return (
          <span className="role-badge admin">
            <Shield size={14} />
            Administrateur
          </span>
        );
      default:
        return null;
    }
  };

  // Rendu du badge de statut
  const getStatusBadge = (status) => {
    switch(status) {
      case 'actif':
        return (
          <span className="status-badge actif">
            <CheckCircle size={14} />
            Actif
          </span>
        );
      case 'inactif':
        return (
          <span className="status-badge inactif">
            <XCircle size={14} />
            Inactif
          </span>
        );
      case 'en_attente':
        return (
          <span className="status-badge en-attente">
            <UserX size={14} />
            En attente
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-page">
      <Sidebar />
      
      <div className="main-content">
        {/* En-tête */}
        <div className="admin-header">
          <div>
            <h1>Gestion des utilisateurs</h1>
            <p>Gérez les comptes étudiants, enseignants et administrateurs</p>
          </div>
          
          <div className="header-actions">
            <button className="btn-secondary" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              {viewMode === 'grid' ? <Eye size={18} /> : <EyeOff size={18} />}
              {viewMode === 'grid' ? 'Vue liste' : 'Vue grille'}
            </button>
            
            <button className="btn-primary">
              <UserPlus size={18} />
              Nouvel utilisateur
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="stats-grid">
          <div className="stat-card">
            <Users size={24} className="stat-icon" />
            <div>
              <span className="stat-label">Total</span>
              <span className="stat-value">{stats.total}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <GraduationCap size={24} className="stat-icon" />
            <div>
              <span className="stat-label">Étudiants</span>
              <span className="stat-value">{stats.etudiants}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Briefcase size={24} className="stat-icon" />
            <div>
              <span className="stat-label">Enseignants</span>
              <span className="stat-value">{stats.enseignants}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Shield size={24} className="stat-icon" />
            <div>
              <span className="stat-label">Admins</span>
              <span className="stat-value">{stats.admins}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <CheckCircle size={24} className="stat-icon success" />
            <div>
              <span className="stat-label">Actifs</span>
              <span className="stat-value">{stats.actifs}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <UserX size={24} className="stat-icon warning" />
            <div>
              <span className="stat-label">En attente</span>
              <span className="stat-value">{stats.enAttente}</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="admin-toolbar">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-actions">
            <button 
              className={`filter-button ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filtres
            </button>
            
            <button className="icon-button">
              <Download size={18} />
            </button>
            
            <button className="icon-button">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        {/* Panneau de filtres */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Rôle</label>
              <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="all">Tous les rôles</option>
                <option value="etudiant">Étudiants</option>
                <option value="enseignant">Enseignants</option>
                <option value="admin">Administrateurs</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Statut</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="all">Tous les statuts</option>
                <option value="actif">Actifs</option>
                <option value="inactif">Inactifs</option>
                <option value="en_attente">En attente</option>
              </select>
            </div>

            <div className="filter-actions">
              <button className="btn-secondary" onClick={() => {
                setSelectedRole('all');
                setSelectedStatus('all');
              }}>
                Réinitialiser
              </button>
            </div>
          </div>
        )}

        {/* Sélection multiple */}
        {selectedUsers.length > 0 && (
          <div className="bulk-actions">
            <span>{selectedUsers.length} utilisateur(s) sélectionné(s)</span>
            <button className="bulk-button">
              <Lock size={18} />
              Activer
            </button>
            <button className="bulk-button">
              <Unlock size={18} />
              Désactiver
            </button>
            <button className="bulk-button delete">
              <Trash2 size={18} />
              Supprimer
            </button>
          </div>
        )}

        {/* Tableau des utilisateurs */}
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Utilisateur</th>
                <th>Contact</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Dernière connexion</th>
                <th style={{ width: '120px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className={selectedUsers.includes(user.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td>
                    <div className="user-cell">
                      <div className="user-avatar">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div>
                        <div className="user-name">{user.firstName} {user.lastName}</div>
                        <div className="user-detail">{user.filiere || user.departement || '-'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-cell">
                      <div><Mail size={14} /> {user.email}</div>
                      <div><Phone size={14} /> {user.phone}</div>
                    </div>
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>
                    {user.lastLogin ? (
                      <span className="login-date">
                        <Calendar size={14} />
                        {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                      </span>
                    ) : (
                      <span className="login-date never">Jamais</span>
                    )}
                  </td>
                  <td>
                    <div className="action-buttons">
                      {user.status === 'en_attente' ? (
                        <>
                          <button 
                            className="action-btn approve"
                            onClick={() => handleApproveUser(user.id)}
                            title="Approuver"
                          >
                            <CheckCircle size={16} />
                          </button>
                          <button 
                            className="action-btn reject"
                            onClick={() => handleRejectUser(user.id)}
                            title="Rejeter"
                          >
                            <XCircle size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            className="action-btn"
                            onClick={() => handleToggleStatus(user.id)}
                            title={user.status === 'actif' ? 'Désactiver' : 'Activer'}
                          >
                            {user.status === 'actif' ? <Lock size={16} /> : <Unlock size={16} />}
                          </button>
                          <button 
                            className="action-btn"
                            title="Modifier"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button className="pagination-button">Précédent</button>
          <span className="pagination-info">Page 1 sur 3</span>
          <button className="pagination-button">Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;