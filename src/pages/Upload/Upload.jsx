// src/pages/Upload/Upload.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Upload as UploadIcon,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  Clock,
  File,
  Download,
  Eye
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import './Upload.css';

const Upload = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // États pour le formulaire
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [recentUploads, setRecentUploads] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
    // Simuler le chargement des uploads récents
    loadRecentUploads();
  }, [user, navigate]);

  const loadRecentUploads = () => {
    // Simulation de données (à remplacer par appel API)
    setRecentUploads([
      { id: 1, title: 'Cours JavaScript Avancé', date: '2024-03-20', size: '2.5 MB', status: 'success' },
      { id: 2, title: 'Introduction à React', date: '2024-03-18', size: '1.8 MB', status: 'success' },
      { id: 3, title: 'TP Base de données', date: '2024-03-15', size: '3.2 MB', status: 'success' },
    ]);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Vérifier le type de fichier (PDF uniquement)
      if (selectedFile.type !== 'application/pdf') {
        setUploadError('Seuls les fichiers PDF sont acceptés');
        return;
      }
      
      // Vérifier la taille (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setUploadError('Le fichier ne doit pas dépasser 10 MB');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB');
      setUploadError('');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFileName('');
    setFileSize('');
    document.getElementById('file-input').value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setUploadError('Le titre est requis');
      return;
    }
    if (!description.trim()) {
      setUploadError('La description est requise');
      return;
    }
    if (!file) {
      setUploadError('Veuillez sélectionner un fichier PDF');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError('');

    // Simulation d'upload (à remplacer par appel API réel)
    const simulateUpload = () => {
      return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 300);
      });
    };

    try {
      await simulateUpload();
      
      // Ici, vous feriez l'appel API réel :
      // 1. Upload du fichier vers MinIO
      // 2. Envoi des métadonnées vers Cassandra
      
      console.log('Cours ajouté:', {
        title,
        description,
        fileName,
        fileSize,
        timestamp: new Date().toISOString()
      });

      setUploadSuccess(true);
      
      // Ajouter aux uploads récents
      const newUpload = {
        id: Date.now(),
        title,
        date: new Date().toLocaleDateString('fr-FR'),
        size: fileSize,
        status: 'success'
      };
      setRecentUploads([newUpload, ...recentUploads.slice(0, 4)]);
      
      // Réinitialiser le formulaire après 2 secondes
      setTimeout(() => {
        setUploadSuccess(false);
        setTitle('');
        setDescription('');
        setFile(null);
        setFileName('');
        setFileSize('');
        setUploadProgress(0);
        document.getElementById('file-input').value = '';
      }, 2000);

    } catch (error) {
      setUploadError('Erreur lors de l\'upload. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
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

  // Vérifier si l'utilisateur est autorisé (enseignant ou admin)
  if (user && user.role !== 'enseignant' && user.role !== 'admin') {
    return (
      <div className="app">
        <Sidebar />
        <main className="main-content-with-sidebar">
          <div className="unauthorized">
            <AlertCircle size={48} color="#ef4444" />
            <h2>Accès non autorisé</h2>
            <p>Seuls les enseignants et les administrateurs peuvent ajouter des cours.</p>
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              Retour au tableau de bord
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!user) return null;

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
              <input type="text" placeholder="Rechercher..." />
            </div>

            <button className="notif-btn">
              <Bell size={20} />
              <span className="notif-dot"></span>
            </button>

            <div className="user-menu">
              <div className="user-avatar">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user.username}</span>
                <span className="user-role">{getRoleLabel()}</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Wrapper */}
        <div className="content-wrapper">
          {/* Header Section */}
          <div className="content-header">
            <div>
              <h1 className="page-title">Ajouter un cours</h1>
              <p className="page-subtitle">
                {getRoleIcon()} {getRoleLabel()} • Publier un nouveau cours pour vos étudiants
              </p>
            </div>
          </div>

          {/* Upload Form */}
          <div className="upload-container">
            <div className="upload-form-card">
              <form onSubmit={handleSubmit} className="upload-form">
                
                {/* Titre */}
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Titre du cours <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    placeholder="Ex: Introduction à l'Intelligence Artificielle"
                    disabled={uploading}
                  />
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description <span className="required">*</span>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                    rows="4"
                    placeholder="Décrivez le contenu de votre cours..."
                    disabled={uploading}
                  />
                </div>

                {/* Upload de fichier */}
                <div className="form-group">
                  <label className="form-label">
                    Fichier PDF <span className="required">*</span>
                  </label>
                  
                  {!file ? (
                    <div className="upload-area">
                      <input
                        type="file"
                        id="file-input"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                        className="file-input"
                        disabled={uploading}
                      />
                      <label htmlFor="file-input" className="upload-label">
                        <UploadIcon size={24} />
                        <div>
                          <p className="upload-text">Cliquez pour sélectionner un fichier</p>
                          <p className="upload-hint">PDF uniquement (max. 10 MB)</p>
                        </div>
                      </label>
                    </div>
                  ) : (
                    <div className="file-preview">
                      <div className="file-info">
                        <File size={24} color="#0f2b4b" />
                        <div className="file-details">
                          <span className="file-name">{fileName}</span>
                          <span className="file-size">{fileSize}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="file-remove"
                        onClick={handleRemoveFile}
                        disabled={uploading}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Barre de progression */}
                {uploading && (
                  <div className="progress-container">
                    <div className="progress-header">
                      <span className="progress-label">Upload en cours...</span>
                      <span className="progress-percentage">{uploadProgress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Message de succès */}
                {uploadSuccess && (
                  <div className="success-message">
                    <CheckCircle size={20} />
                    <span>Cours ajouté avec succès !</span>
                  </div>
                )}

                {/* Message d'erreur */}
                {uploadError && (
                  <div className="error-message">
                    <AlertCircle size={20} />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Boutons */}
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => navigate('/dashboard')}
                    disabled={uploading}
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={uploading || !title || !description || !file}
                  >
                    {uploading ? (
                      <>
                        <Loader size={18} className="spinner" />
                        <span>Upload en cours...</span>
                      </>
                    ) : (
                      <>
                        <UploadIcon size={18} />
                        <span>Publier le cours</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar d'information */}
            <div className="upload-info-sidebar">
              {/* Informations */}
              <div className="info-card">
                <h3>Informations</h3>
                <ul className="info-list">
                  <li>
                    <FileText size={16} />
                    <span>Format accepté : PDF</span>
                  </li>
                  <li>
                    <Download size={16} />
                    <span>Taille max : 10 MB</span>
                  </li>
                  <li>
                    <Eye size={16} />
                    <span>Visible par tous les étudiants</span>
                  </li>
                </ul>
              </div>

              {/* Derniers uploads */}
              <div className="recent-uploads-card">
                <h3>Derniers cours ajoutés</h3>
                <div className="recent-uploads-list">
                  {recentUploads.map((item) => (
                    <div key={item.id} className="recent-upload-item">
                      <File size={16} color="#0f2b4b" />
                      <div className="recent-upload-info">
                        <span className="recent-upload-title">{item.title}</span>
                        <span className="recent-upload-meta">
                          {item.date} • {item.size}
                        </span>
                      </div>
                      <CheckCircle size={14} color="#10b981" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats rapides */}
              <div className="stats-mini-card">
                <div className="stat-mini-item">
                  <span className="stat-mini-label">Total cours</span>
                  <span className="stat-mini-value">24</span>
                </div>
                <div className="stat-mini-item">
                  <span className="stat-mini-label">Ce mois</span>
                  <span className="stat-mini-value">8</span>
                </div>
                <div className="stat-mini-item">
                  <span className="stat-mini-label">Taille totale</span>
                  <span className="stat-mini-value">156 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;