// src/pages/TeacherCourses/TeacherCourses.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Plus,
  FileText,
  Calendar,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  Save,
  Copy,
  Download,
  Upload
} from 'lucide-react';
import './TeacherCourses.css';

const TeacherCourses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // États principaux
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // États des modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Charger les cours (simulés)
  useEffect(() => {
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: 'Génie Logiciel - Chapitre 1',
          description: 'Introduction au génie logiciel, cycles de vie, méthodologies',
          code: 'GL-101',
          semester: 'Semestre 2',
          year: '2024-2025',
          status: 'publié',
          fileType: 'PDF',
          fileSize: '2.5 MB',
          fileName: 'genie_logiciel_ch1.pdf',
          students: 45,
          createdAt: '2025-03-01',
          lastModified: '2025-03-10',
          department: 'Informatique',
          level: 'L2',
          downloads: 128
        },
        {
          id: 2,
          title: 'Génie Logiciel - Chapitre 2',
          description: 'Analyse et conception orientée objet',
          code: 'GL-102',
          semester: 'Semestre 2',
          year: '2024-2025',
          status: 'brouillon',
          fileType: 'PDF',
          fileSize: '3.1 MB',
          fileName: 'genie_logiciel_ch2.pdf',
          students: 42,
          createdAt: '2025-03-05',
          lastModified: '2025-03-08',
          department: 'Informatique',
          level: 'L2',
          downloads: 0
        },
        {
          id: 3,
          title: 'Exercices UML - Série 1',
          description: 'Exercices sur les diagrammes de classes et séquence',
          code: 'UML-201',
          semester: 'Semestre 2',
          year: '2024-2025',
          status: 'publié',
          fileType: 'DOCX',
          fileSize: '1.2 MB',
          fileName: 'uml_serie1.docx',
          students: 38,
          createdAt: '2025-03-01',
          lastModified: '2025-03-09',
          department: 'Informatique',
          level: 'L2',
          downloads: 56
        },
        {
          id: 4,
          title: 'TD Architecture des Ordinateurs',
          description: 'Travaux dirigés sur les architectures',
          code: 'AO-301',
          semester: 'Semestre 3',
          year: '2024-2025',
          status: 'brouillon',
          fileType: 'PDF',
          fileSize: '1.8 MB',
          fileName: 'td_architecture.pdf',
          students: 35,
          createdAt: '2025-03-07',
          lastModified: '2025-03-07',
          department: 'Informatique',
          level: 'L3',
          downloads: 0
        },
        {
          id: 5,
          title: 'Projet Base de Données',
          description: 'Description du projet de base de données',
          code: 'BDD-401',
          semester: 'Semestre 4',
          year: '2024-2025',
          status: 'publié',
          fileType: 'PDF',
          fileSize: '0.5 MB',
          fileName: 'projet_bdd.pdf',
          students: 40,
          createdAt: '2025-03-03',
          lastModified: '2025-03-06',
          department: 'Informatique',
          level: 'L2',
          downloads: 89
        }
      ];

      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les cours
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && course.status === filterStatus;
  });

  // Statistiques
  const stats = {
    total: courses.length,
    published: courses.filter(c => c.status === 'publié').length,
    drafts: courses.filter(c => c.status === 'brouillon').length,
    totalStudents: courses.reduce((acc, c) => acc + c.students, 0),
    totalDownloads: courses.reduce((acc, c) => acc + c.downloads, 0)
  };

  // ===== FONCTIONS DE GESTION =====

  // Voir les détails d'un cours
  const handleViewCourse = (course) => {
    setSelectedCourse(course);
    setShowViewModal(true);
  };

  // Modifier un cours
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  // Sauvegarder les modifications
  const handleSaveEdit = (updatedCourse) => {
    setCourses(courses.map(c => 
      c.id === updatedCourse.id ? updatedCourse : c
    ));
    setShowEditModal(false);
    setSelectedCourse(null);
    setSuccessMessage('Cours modifié avec succès');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Supprimer un cours
  const handleDeleteClick = (course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCourses(courses.filter(c => c.id !== selectedCourse.id));
    setShowDeleteModal(false);
    setSelectedCourse(null);
    setSuccessMessage('Cours supprimé avec succès');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Dupliquer un cours
  const handleDuplicate = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      title: `${course.title} (copie)`,
      code: `${course.code}-COPY`,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      status: 'brouillon',
      students: 0,
      downloads: 0
    };
    setCourses([...courses, newCourse]);
    setSuccessMessage('Cours dupliqué avec succès');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Changer le statut (publier/dépublier)
  const toggleStatus = (courseId) => {
    setCourses(courses.map(c => 
      c.id === courseId 
        ? { ...c, status: c.status === 'publié' ? 'brouillon' : 'publié' }
        : c
    ));
    setSuccessMessage('Statut modifié avec succès');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Télécharger le fichier
  const handleDownload = (course) => {
    alert(`Téléchargement de ${course.fileName}...`);
    // Logique de téléchargement ici
  };

  if (loading) {
    return (
      <div className="teacher-courses-page">
        <Sidebar />
        <div className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement de vos cours...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teacher-courses-page">
      <Sidebar />
      
      <div className="main-content">
        {/* Message de succès */}
        {successMessage && (
          <div className="success-message">
            <Check size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        {/* En-tête */}
        <div className="page-header">
          <div>
            <h1>Gestion des cours</h1>
            <p className="page-subtitle">
              Gérez vos cours, modifiez ou supprimez vos ressources pédagogiques
            </p>
          </div>
          
          <button 
            className="btn-primary"
            onClick={() => navigate('/upload')}
          >
            <Plus size={18} />
            Nouveau cours
          </button>
        </div>

        {/* Cartes de statistiques */}
        <div className="stats-grid">
          <div className="stat-card">
            <BookOpen size={24} className="stat-icon blue" />
            <div className="stat-content">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">Total cours</span>
            </div>
          </div>
          
          <div className="stat-card">
            <Eye size={24} className="stat-icon green" />
            <div className="stat-content">
              <span className="stat-value">{stats.published}</span>
              <span className="stat-label">Publiés</span>
            </div>
          </div>
          
          <div className="stat-card">
            <EyeOff size={24} className="stat-icon orange" />
            <div className="stat-content">
              <span className="stat-value">{stats.drafts}</span>
              <span className="stat-label">Brouillons</span>
            </div>
          </div>
          
          <div className="stat-card">
            <User size={24} className="stat-icon purple" />
            <div className="stat-content">
              <span className="stat-value">{stats.totalStudents}</span>
              <span className="stat-label">Étudiants</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="search-filter-section">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher par titre, code ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les cours</option>
              <option value="publié">Publiés uniquement</option>
              <option value="brouillon">Brouillons uniquement</option>
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>
        </div>

        {/* Résultats */}
        <div className="results-info">
          <p>
            <strong>{filteredCourses.length}</strong> cours trouvés
            {searchTerm && ` pour "${searchTerm}"`}
          </p>
        </div>

        {/* Liste des cours */}
        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={48} />
            <h3>Aucun cours trouvé</h3>
            <p>
              {searchTerm 
                ? 'Aucun cours ne correspond à votre recherche'
                : 'Vous n\'avez pas encore créé de cours'}
            </p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/upload')}
            >
              <Plus size={18} />
              Créer votre premier cours
            </button>
          </div>
        ) : (
          <div className="courses-table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Cours</th>
                  <th>Code</th>
                  <th>Semestre</th>
                  <th>Statut</th>
                  <th>Étudiants</th>
                  <th>Fichier</th>
                  <th>Dernière modif.</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map(course => (
                  <tr key={course.id}>
                    <td>
                      <div className="course-info-cell">
                        <div className="file-icon">
                          {course.fileType === 'PDF' ? '📄' : 
                           course.fileType === 'DOCX' ? '📝' : '📊'}
                        </div>
                        <div>
                          <div className="course-title">{course.title}</div>
                          <div className="course-desc">{course.description.substring(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="course-code">{course.code}</span>
                    </td>
                    <td>
                      <span className="course-semester">{course.semester}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${course.status}`}>
                        {course.status === 'publié' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td>
                      <span className="students-count">{course.students}</span>
                    </td>
                    <td>
                      <div className="file-info">
                        <FileText size={14} />
                        <span>{course.fileType} • {course.fileSize}</span>
                      </div>
                    </td>
                    <td>
                      <span className="date-info">
                        {new Date(course.lastModified).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {/* Bouton Voir */}
                        <button 
                          className="action-btn view"
                          onClick={() => handleViewCourse(course)}
                          title="Voir les détails"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Bouton Modifier */}
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEditCourse(course)}
                          title="Modifier le cours"
                        >
                          <Edit size={16} />
                        </button>

                        {/* Bouton Dupliquer */}
                        <button 
                          className="action-btn duplicate"
                          onClick={() => handleDuplicate(course)}
                          title="Dupliquer le cours"
                        >
                          <Copy size={16} />
                        </button>

                        {/* Bouton Publier/Dépublier */}
                        <button 
                          className={`action-btn ${course.status === 'publié' ? 'unpublish' : 'publish'}`}
                          onClick={() => toggleStatus(course.id)}
                          title={course.status === 'publié' ? 'Dépublier' : 'Publier'}
                        >
                          {course.status === 'publié' ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>

                        {/* Bouton Télécharger */}
                        <button 
                          className="action-btn download"
                          onClick={() => handleDownload(course)}
                          title="Télécharger le fichier"
                        >
                          <Download size={16} />
                        </button>

                        {/* Bouton Supprimer */}
                        <button 
                          className="action-btn delete"
                          onClick={() => handleDeleteClick(course)}
                          title="Supprimer le cours"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ===== MODALS ===== */}

        {/* Modal de visualisation */}
        {showViewModal && selectedCourse && (
          <ViewCourseModal 
            course={selectedCourse}
            onClose={() => setShowViewModal(false)}
          />
        )}

        {/* Modal d'édition */}
        {showEditModal && selectedCourse && (
          <EditCourseModal 
            course={selectedCourse}
            onSave={handleSaveEdit}
            onClose={() => setShowEditModal(false)}
          />
        )}

        {/* Modal de suppression */}
        {showDeleteModal && selectedCourse && (
          <DeleteModal 
            course={selectedCourse}
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    </div>
  );
};

// ===== COMPOSANT MODAL DE VISUALISATION =====
const ViewCourseModal = ({ course, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Détails du cours</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Informations générales</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Titre</span>
                <span className="detail-value">{course.title}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Code</span>
                <span className="detail-value">{course.code}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Semestre</span>
                <span className="detail-value">{course.semester}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Année</span>
                <span className="detail-value">{course.year}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Statut</span>
                <span className={`status-badge ${course.status}`}>
                  {course.status === 'publié' ? 'Publié' : 'Brouillon'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Département</span>
                <span className="detail-value">{course.department}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Description</h3>
            <p className="detail-description">{course.description}</p>
          </div>

          <div className="detail-section">
            <h3>Fichier</h3>
            <div className="file-detail">
              <FileText size={20} />
              <div>
                <div className="file-name">{course.fileName}</div>
                <div className="file-meta">{course.fileType} • {course.fileSize}</div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Statistiques</h3>
            <div className="stats-mini-grid">
              <div className="stat-mini">
                <User size={16} />
                <span>{course.students} étudiants</span>
              </div>
              <div className="stat-mini">
                <Download size={16} />
                <span>{course.downloads} téléchargements</span>
              </div>
              <div className="stat-mini">
                <Calendar size={16} />
                <span>Créé le {new Date(course.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== COMPOSANT MODAL D'ÉDITION =====
const EditCourseModal = ({ course, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: course.id,
    title: course.title,
    description: course.description,
    code: course.code,
    semester: course.semester,
    status: course.status,
    fileName: course.fileName
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      lastModified: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Modifier le cours</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Titre du cours *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Code du cours</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                placeholder="ex: GL-101"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Semestre</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: e.target.value})}
                >
                  <option value="Semestre 1">Semestre 1</option>
                  <option value="Semestre 2">Semestre 2</option>
                  <option value="Semestre 3">Semestre 3</option>
                  <option value="Semestre 4">Semestre 4</option>
                  <option value="Semestre 5">Semestre 5</option>
                  <option value="Semestre 6">Semestre 6</option>
                </select>
              </div>

              <div className="form-group">
                <label>Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="brouillon">Brouillon</option>
                  <option value="publié">Publié</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Fichier actuel</label>
              <div className="current-file">
                <FileText size={16} />
                <span>{formData.fileName}</span>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              <Save size={16} />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===== COMPOSANT MODAL DE SUPPRESSION =====
const DeleteModal = ({ course, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <AlertCircle size={24} className="delete-icon" />
          <h2>Confirmer la suppression</h2>
          <button className="modal-close" onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        
        <div className="modal-body">
          <p>
            Êtes-vous sûr de vouloir supprimer le cours :<br />
            <strong>"{course.title}"</strong> ?
          </p>
          <p className="warning-text">
            Cette action est irréversible. Tous les fichiers associés seront également supprimés.
          </p>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Annuler
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            <Trash2 size={16} />
            Supprimer définitivement
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCourses;