// src/pages/Admin/Users.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users as UsersIcon,
  UserPlus,
  UserCog,
  Search,
  Bell,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import './Users.css';

const Users = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    actifs: 0,
    inactifs: 0
  });

  // Formulaire d'ajout d'utilisateur
  const [newUser, setNewUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'etudiant',
    confirmPassword: ''
  });

  // Formulaire d'édition
  const [editUserData, setEditUserData] = useState({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    role: '',
    status: 'actif'
  });

  // Formulaire de réinitialisation de mot de passe
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Vérification de l'authentification et du rôle admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    loadUsers();
  }, [user, navigate]);

  const loadUsers = () => {
    setLoading(true);
    // Simulation de chargement des utilisateurs (à remplacer par appel API)
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          nom: 'Benali',
          prenom: 'Mohammed',
          email: 'mohammed.benali@est.um5.ac.ma',
          role: 'enseignant',
          status: 'actif',
          dateInscription: '2020-09-01',
          derniereConnexion: '2024-03-20 14:30'
        },
        {
          id: 2,
          nom: 'Alaoui',
          prenom: 'Fatima',
          email: 'fatima.alaoui@est.um5.ac.ma',
          role: 'enseignant',
          status: 'actif',
          dateInscription: '2019-10-15',
          derniereConnexion: '2024-03-19 09:15'
        },
        {
          id: 3,
          nom: 'Idrissi',
          prenom: 'Ahmed',
          email: 'ahmed.idrissi@est.um5.ac.ma',
          role: 'enseignant',
          status: 'actif',
          dateInscription: '2018-08-20',
          derniereConnexion: '2024-03-20 10:45'
        },
        {
          id: 4,
          nom: 'Amrani',
          prenom: 'Khadija',
          email: 'khadija.amrani@etu.um5.ac.ma',
          role: 'etudiant',
          status: 'actif',
          dateInscription: '2022-09-01',
          derniereConnexion: '2024-03-20 09:30'
        },
        {
          id: 5,
          nom: 'Berrada',
          prenom: 'Youssef',
          email: 'youssef.berrada@etu.um5.ac.ma',
          role: 'etudiant',
          status: 'inactif',
          dateInscription: '2022-09-01',
          derniereConnexion: '2024-02-15 11:20'
        },
        {
          id: 6,
          nom: 'Chraibi',
          prenom: 'Leila',
          email: 'leila.chraibi@etu.um5.ac.ma',
          role: 'etudiant',
          status: 'actif',
          dateInscription: '2021-09-01',
          derniereConnexion: '2024-03-20 11:15'
        },
        {
          id: 7,
          nom: 'El Fassi',
          prenom: 'Omar',
          email: 'omar.elfassi@admin.um5.ac.ma',
          role: 'admin',
          status: 'actif',
          dateInscription: '2010-03-15',
          derniereConnexion: '2024-03-20 08:00'
        }
      ];

      setUsers(mockUsers);
      
      // Calculer les statistiques
      const actifs = mockUsers.filter(u => u.status === 'actif').length;
      const inactifs = mockUsers.filter(u => u.status === 'inactif').length;
      
      setStats({
        total: mockUsers.length,
        actifs: actifs,
        inactifs: inactifs
      });
      
      setLoading(false);
    }, 1000);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Validation des mots de passe
    if (newUser.password !== newUser.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Simulation d'ajout (à remplacer par appel API vers Keycloak)
    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
      status: 'actif',
      dateInscription: new Date().toISOString().split('T')[0],
      derniereConnexion: 'Jamais'
    };

    setUsers([...users, newUserWithId]);
    
    // Mettre à jour les stats
    setStats({
      total: stats.total + 1,
      actifs: stats.actifs + 1,
      inactifs: stats.inactifs
    });

    setShowAddModal(false);
    resetNewUserForm();
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    
    // Simulation de modification
    const updatedUsers = users.map(u => 
      u.id === editUserData.id 
        ? { 
            ...u, 
            nom: editUserData.nom,
            prenom: editUserData.prenom,
            email: editUserData.email,
            role: editUserData.role,
            status: editUserData.status
          } 
        : u
    );
    
    setUsers(updatedUsers);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Simulation de réinitialisation
    alert(`Mot de passe réinitialisé pour ${selectedUser?.prenom} ${selectedUser?.nom}`);
    setShowResetPasswordModal(false);
    setResetPasswordData({ newPassword: '', confirmPassword: '' });
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(u => u.id === userId);
    
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${userToDelete.prenom} ${userToDelete.nom} ?`)) {
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
      
      // Mettre à jour les stats
      const newActifs = updatedUsers.filter(u => u.status === 'actif').length;
      const newInactifs = updatedUsers.filter(u => u.status === 'inactif').length;
      
      setStats({
        total: updatedUsers.length,
        actifs: newActifs,
        inactifs: newInactifs
      });
      
      setShowDeleteConfirm(null);
    }
  };

  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'actif' ? 'inactif' : 'actif' }
        : u
    );
    
    setUsers(updatedUsers);
    
    // Mettre à jour les stats
    const newActifs = updatedUsers.filter(u => u.status === 'actif').length;
    const newInactifs = updatedUsers.filter(u => u.status === 'inactif').length;
    
    setStats({
      total: updatedUsers.length,
      actifs: newActifs,
      inactifs: newInactifs
    });
  };

  const resetNewUserForm = () => {
    setNewUser({
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: 'etudiant',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  const openEditModal = (user) => {
    setEditUserData({
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const openResetPasswordModal = (user) => {
    setSelectedUser(user);
    setResetPasswordData({ newPassword: '', confirmPassword: '' });
    setShowResetPasswordModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      `${user.nom} ${user.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Si pas d'utilisateur ou pas admin, ne rien afficher (la redirection se fera via useEffect)
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="app">
      <Sidebar />
      
      <main className="main-content-with-sidebar">
        {/* Top Navigation */}
        <nav className="top-nav">
          <div className="nav-left">
            <div className="logo">
              <img src="/logo.png" alt="EST" />
              <span>EST Salé</span>
            </div>
          </div>

          <div className="nav-right">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un utilisateur..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="notif-btn">
              <Bell size={20} />
              <span className="notif-dot"></span>
            </button>

            <div className="user-menu">
              <div className="user-avatar">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.username || 'admin@test.com'}</span>
                <span className="user-role">Administrateur</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Wrapper */}
        <div className="content-wrapper">
          {/* Header Section */}
          <div className="content-header">
            <div>
              <h1 className="page-title">Gestion des utilisateurs</h1>
              <p className="page-subtitle">
                👨‍💼 Administrateur • Gérez les comptes utilisateurs
              </p>
            </div>
            <button className="add-user-btn" onClick={() => setShowAddModal(true)}>
              <UserPlus size={18} />
              <span>Ajouter un utilisateur</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="users-stats">
            <div className="stat-card">
              <div className="stat-icon total">
                <UsersIcon size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total utilisateurs</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon actif">
                <CheckCircle size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats.actifs}</span>
                <span className="stat-label">Actifs</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon inactif">
                <XCircle size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats.inactifs}</span>
                <span className="stat-label">Inactifs</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="users-filters">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${selectedRole === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedRole('all')}
              >
                Tous
              </button>
              <button 
                className={`filter-tab ${selectedRole === 'etudiant' ? 'active' : ''}`}
                onClick={() => setSelectedRole('etudiant')}
              >
                Étudiants
              </button>
              <button 
                className={`filter-tab ${selectedRole === 'enseignant' ? 'active' : ''}`}
                onClick={() => setSelectedRole('enseignant')}
              >
                Enseignants
              </button>
              <button 
                className={`filter-tab ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => setSelectedRole('admin')}
              >
                Administrateurs
              </button>
            </div>

            <div className="filter-actions">
              <button className="filter-action-btn" onClick={loadUsers}>
                <RefreshCw size={16} />
                Actualiser
              </button>
            </div>
          </div>

          {/* Users Table */}
          {loading ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Chargement des utilisateurs...</p>
            </div>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Utilisateur</th>
                    <th>Email</th>
                    <th>Rôle</th>
                    <th>Statut</th>
                    <th>Date d'inscription</th>
                    <th>Dernière connexion</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((userItem) => (
                    <tr key={userItem.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar-sm">
                            {userItem.prenom.charAt(0)}{userItem.nom.charAt(0)}
                          </div>
                          <div className="user-info-sm">
                            <span className="user-name-sm">
                              {userItem.prenom} {userItem.nom}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="user-email">{userItem.email}</span>
                      </td>
                      <td>
                        <span className={`role-badge ${userItem.role}`}>
                          {userItem.role === 'etudiant' && '👨‍🎓 Étudiant'}
                          {userItem.role === 'enseignant' && '👨‍🏫 Enseignant'}
                          {userItem.role === 'admin' && '👨‍💼 Admin'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${userItem.status}`}>
                          {userItem.status === 'actif' ? (
                            <><CheckCircle size={12} /> Actif</>
                          ) : (
                            <><XCircle size={12} /> Inactif</>
                          )}
                        </span>
                      </td>
                      <td>
                        <span className="date-cell">{userItem.dateInscription}</span>
                      </td>
                      <td>
                        <span className="date-cell">{userItem.derniereConnexion}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit"
                            onClick={() => openEditModal(userItem)}
                            title="Modifier"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button 
                            className="action-btn reset-password"
                            onClick={() => openResetPasswordModal(userItem)}
                            title="Réinitialiser mot de passe"
                          >
                            <Key size={16} />
                          </button>
                          <button 
                            className="action-btn toggle"
                            onClick={() => handleToggleStatus(userItem.id)}
                            title={userItem.status === 'actif' ? 'Désactiver' : 'Activer'}
                          >
                            {userItem.status === 'actif' ? <Lock size={16} /> : <Unlock size={16} />}
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => setShowDeleteConfirm(userItem.id)}
                            title="Supprimer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* Confirmation de suppression */}
                        {showDeleteConfirm === userItem.id && (
                          <div className="delete-confirm">
                            <p>Confirmer la suppression ?</p>
                            <div className="confirm-actions">
                              <button 
                                className="confirm-yes"
                                onClick={() => handleDeleteUser(userItem.id)}
                              >
                                Oui
                              </button>
                              <button 
                                className="confirm-no"
                                onClick={() => setShowDeleteConfirm(null)}
                              >
                                Non
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {filteredUsers.length > 0 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Modal d'ajout d'utilisateur */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Ajouter un utilisateur</h2>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom *</label>
                  <input
                    type="text"
                    value={newUser.prenom}
                    onChange={(e) => setNewUser({...newUser, prenom: e.target.value})}
                    placeholder="Jean"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom *</label>
                  <input
                    type="text"
                    value={newUser.nom}
                    onChange={(e) => setNewUser({...newUser, nom: e.target.value})}
                    placeholder="Dupont"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="jean.dupont@est.um5.ac.ma"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mot de passe *</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="••••••••"
                      required
                    />
                    <button 
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="form-group">
                  <label>Confirmer mot de passe *</label>
                  <input
                    type="password"
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Rôle *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  required
                >
                  <option value="etudiant">👨‍🎓 Étudiant</option>
                  <option value="enseignant">👨‍🏫 Enseignant</option>
                  <option value="admin">👨‍💼 Administrateur</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowAddModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  <UserPlus size={16} />
                  Créer l'utilisateur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal d'édition */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Modifier l'utilisateur</h2>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Prénom</label>
                  <input
                    type="text"
                    value={editUserData.prenom}
                    onChange={(e) => setEditUserData({...editUserData, prenom: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={editUserData.nom}
                    onChange={(e) => setEditUserData({...editUserData, nom: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={editUserData.email}
                  onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rôle</label>
                  <select
                    value={editUserData.role}
                    onChange={(e) => setEditUserData({...editUserData, role: e.target.value})}
                    required
                  >
                    <option value="etudiant">👨‍🎓 Étudiant</option>
                    <option value="enseignant">👨‍🏫 Enseignant</option>
                    <option value="admin">👨‍💼 Administrateur</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Statut</label>
                  <select
                    value={editUserData.status}
                    onChange={(e) => setEditUserData({...editUserData, status: e.target.value})}
                  >
                    <option value="actif">✅ Actif</option>
                    <option value="inactif">❌ Inactif</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowEditModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  <UserCog size={16} />
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de réinitialisation de mot de passe */}
      {showResetPasswordModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Réinitialiser mot de passe</h2>
              <button className="modal-close" onClick={() => setShowResetPasswordModal(false)}>
                <XCircle size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p className="reset-info">
                Utilisateur : <strong>{selectedUser.prenom} {selectedUser.nom}</strong>
                <br />
                Email : <strong>{selectedUser.email}</strong>
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="modal-form">
              <div className="form-group">
                <label>Nouveau mot de passe</label>
                <input
                  type="password"
                  value={resetPasswordData.newPassword}
                  onChange={(e) => setResetPasswordData({...resetPasswordData, newPassword: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmer le mot de passe</label>
                <input
                  type="password"
                  value={resetPasswordData.confirmPassword}
                  onChange={(e) => setResetPasswordData({...resetPasswordData, confirmPassword: e.target.value})}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowResetPasswordModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  <Key size={16} />
                  Réinitialiser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;