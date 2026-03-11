// src/pages/Courses/Courses.jsx
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
  Download,
  ChevronDown,
  X,
  Check,
  AlertCircle,
  Copy,
  Save,
  EyeOff
} from 'lucide-react';
import './Courses.css';

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Déterminer le rôle
  const isTeacher = user?.role === 'enseignant';
  const isStudent = user?.role === 'etudiant';
  const isAdmin = user?.role === 'admin';

  // Charger les cours (simulés)
  useEffect(() => {
    setTimeout(() => {
      // Données de test pour l'enseignant
      const mockCourses = [
        {
          id: 1,
          title: 'Génie Logiciel - Chapitre 1',
          description: 'Introduction au génie logiciel, cycles de vie, méthodologies',
          teacher: 'Pr. Martin',
          teacherId: 101,
          date: '2025-03-10',
          students: 45,
          status: 'publié',
          fileType: 'PDF',
          fileSize: '2.5 MB',
          fileName: 'genie_logiciel_ch1.pdf',
          courseCode: 'GL-101',
          semester: 'S2'
        },
        {
          id: 2,
          title: 'Génie Logiciel - Chapitre 2',
          description: 'Analyse et conception orientée objet',
          teacher: 'Pr. Martin',
          teacherId: 101,
          date: '2025-03-05',
          students: 42,
          status: 'publié',
          fileType: 'PDF',
          fileSize: '3.1 MB',
          fileName: 'genie_logiciel_ch2.pdf',
          courseCode: 'GL-101',
          semester: 'S2'
        },
        {
          id: 3,
          title: 'Exercices UML - Série 1',
          description: 'Exercices sur les diagrammes de classes et séquence',
          teacher: 'Pr. Martin',
          teacherId: 101,
          date: '2025-03-01',
          students: 38,
          status: 'brouillon',
          fileType: 'DOCX',
          fileSize: '1.2 MB',
          fileName: 'uml_serie1.docx',
          courseCode: 'GL-101',
          semester: 'S2'
        }
      ];

      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les cours
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.courseCode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'published') return matchesSearch && course.status === 'publié';
    if (filter === 'draft') return matchesSearch && course.status === 'brouillon';
    return matchesSearch;
  });

  // ===== FONCTIONS DE GESTION =====

  // Modifier un cours
  const handleEdit = (course) => {
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
      date: new Date().toISOString().split('T')[0],
      status: 'brouillon',
      students: 0
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

  if (loading) {
    return (
      <div className="courses-page">
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
    <div className="courses-page">
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
        <div className="courses-header">
          <div>
            <h1>Gestion des cours</h1>
            <p>Gérez vos cours, modifiez ou supprimez vos ressources pédagogiques</p>
          </div>
          
          <button 
            className="btn-primary"
            onClick={() => navigate('/upload')}
          >
            <Plus size={18} />
            Nouveau cours
          </button>
        </div>

        {/* ===== STATISTIQUES RÉDUITES ===== */}
        <div className="stats-row">
          <div className="stat-item">
            <BookOpen size={18} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{courses.length}</span>
              <span className="stat-label">Total cours</span>
            </div>
          </div>
          
          <div className="stat-item">
            <Eye size={18} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">
                {courses.filter(c => c.status === 'publié').length}
              </span>
              <span className="stat-label">Publiés</span>
            </div>
          </div>
          
          <div className="stat-item">
            <EyeOff size={18} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">
                {courses.filter(c => c.status === 'brouillon').length}
              </span>
              <span className="stat-label">Brouillons</span>
            </div>
          </div>
          
          <div className="stat-item">
            <User size={18} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">
                {courses.reduce((acc, c) => acc + (c.students || 0), 0)}
              </span>
              <span className="stat-label">Étudiants</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="search-section">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un cours par titre, code ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Tous les cours</option>
              <option value="published">Publiés</option>
              <option value="draft">Brouillons</option>
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>
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
          <div className="courses-table">
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
                      <div className="course-title-cell">
                        <div className="file-icon-small">
                          {course.fileType === 'PDF' ? '📄' : 
                           course.fileType === 'DOCX' ? '📝' : '📊'}
                        </div>
                        <div>
                          <div className="course-title">{course.title}</div>
                          <div className="course-desc">{course.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>{course.courseCode}</td>
                    <td>{course.semester}</td>
                    <td>
                      <span className={`status-badge ${course.status}`}>
                        {course.status === 'publié' ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td>{course.students}</td>
                    <td>
                      <div className="file-info">
                        <FileText size={14} />
                        <span>{course.fileType} • {course.fileSize}</span>
                      </div>
                    </td>
                    <td>{new Date(course.date).toLocaleDateString('fr-FR')}</td>
                    <td>
                      <div className="action-buttons">
                        {/* Bouton Modifier */}
                        <button 
                          className="action-btn edit"
                          onClick={() => handleEdit(course)}
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

        {/* Modal de suppression */}
        {showDeleteModal && selectedCourse && (
          <div className="modal-overlay">
            <div className="modal-content delete-modal">
              <div className="modal-header">
                <AlertCircle size={24} color="#ef4444" />
                <h2>Confirmer la suppression</h2>
                <button 
                  className="modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="modal-body">
                <p>
                  Êtes-vous sûr de vouloir supprimer le cours :<br />
                  <strong>"{selectedCourse.title}"</strong> ?
                </p>
                <p className="warning-text">
                  Cette action est irréversible. Tous les fichiers associés seront également supprimés.
                </p>
              </div>

              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Annuler
                </button>
                <button 
                  className="btn-danger"
                  onClick={confirmDelete}
                >
                  <Trash2 size={16} />
                  Supprimer définitivement
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal d'édition */}
        {showEditModal && selectedCourse && (
          <EditCourseModal 
            course={selectedCourse}
            onSave={handleSaveEdit}
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </div>
  );
};

// Composant Modal d'édition
const EditCourseModal = ({ course, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: course.id,
    title: course.title,
    description: course.description,
    courseCode: course.courseCode || '',
    semester: course.semester || 'S1',
    status: course.status,
    fileName: course.fileName
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-modal">
        <div className="modal-header">
          <h2>Modifier le cours</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
              value={formData.courseCode}
              onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
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
                <option value="S1">Semestre 1</option>
                <option value="S2">Semestre 2</option>
                <option value="S3">Semestre 3</option>
                <option value="S4">Semestre 4</option>
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

export default Courses;