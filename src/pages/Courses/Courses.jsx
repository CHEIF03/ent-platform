// src/pages/Courses/Courses.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Search,
  Bell,
  ChevronRight,
  FileText,
  Calendar,
  Clock,
  Filter,
  Grid,
  List,
  Star,
  Bookmark,
  Eye,
  Users,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import './Courses.css';

const Courses = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    loadCourses();
  }, [user, navigate]);

  const loadCourses = () => {
    setLoading(true);
    // Simulation de chargement des cours (à remplacer par appel API)
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: 'Développement Web Avancé',
          description: 'Apprenez les frameworks modernes : React, Vue.js et Angular. Ce cours couvre les concepts avancés du développement front-end.',
          professor: 'Pr. Benali Mohammed',
          department: 'Informatique',
          level: 'S5',
          credits: 6,
          hours: 45,
          students: 45,
          rating: 4.8,
          downloads: 234,
          lastUpdated: '2024-03-15',
          fileSize: '2.5 MB',
          fileType: 'PDF',
          tags: ['React', 'JavaScript', 'Front-end'],
          isNew: true,
          isFavorite: false,
          progress: 75,
          image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 2,
          title: 'Architecture des Réseaux',
          description: 'Étude approfondie des protocoles réseau, configuration et sécurité. Préparation à la certification Cisco.',
          professor: 'Pr. Alaoui Fatima',
          department: 'Réseaux',
          level: 'S5',
          credits: 5,
          hours: 40,
          students: 38,
          rating: 4.6,
          downloads: 156,
          lastUpdated: '2024-03-10',
          fileSize: '3.2 MB',
          fileType: 'PDF',
          tags: ['TCP/IP', 'Cisco', 'Sécurité'],
          isNew: false,
          isFavorite: true,
          progress: 60,
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 3,
          title: 'Bases de Données Avancées',
          description: 'SQL avancé, optimisation des requêtes, NoSQL, MongoDB et administration de bases de données.',
          professor: 'Pr. Idrissi Ahmed',
          department: 'Bases de données',
          level: 'S5',
          credits: 5,
          hours: 40,
          students: 42,
          rating: 4.9,
          downloads: 189,
          lastUpdated: '2024-03-12',
          fileSize: '4.1 MB',
          fileType: 'PDF',
          tags: ['SQL', 'NoSQL', 'MongoDB'],
          isNew: false,
          isFavorite: false,
          progress: 80,
          image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 4,
          title: 'Intelligence Artificielle',
          description: 'Introduction au machine learning, deep learning et réseaux de neurones avec Python et TensorFlow.',
          professor: 'Pr. Benjelloun Sara',
          department: 'IA',
          level: 'S6',
          credits: 6,
          hours: 50,
          students: 35,
          rating: 4.7,
          downloads: 278,
          lastUpdated: '2024-03-18',
          fileSize: '5.3 MB',
          fileType: 'PDF',
          tags: ['Machine Learning', 'Python', 'TensorFlow'],
          isNew: true,
          isFavorite: true,
          progress: 45,
          image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 5,
          title: 'Sécurité des Systèmes',
          description: 'Cryptographie, sécurité réseau, tests d\'intrusion et bonnes pratiques de sécurité.',
          professor: 'Pr. El Amrani Hassan',
          department: 'Sécurité',
          level: 'S6',
          credits: 4,
          hours: 35,
          students: 32,
          rating: 4.5,
          downloads: 145,
          lastUpdated: '2024-03-05',
          fileSize: '3.8 MB',
          fileType: 'PDF',
          tags: ['Cryptographie', 'Sécurité', 'Pentest'],
          isNew: false,
          isFavorite: false,
          progress: 30,
          image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
          id: 6,
          title: 'Gestion de Projets IT',
          description: 'Méthodologies agiles, Scrum, Kanban et gestion d\'équipes de développement.',
          professor: 'Pr. Tazi Mohamed',
          department: 'Management',
          level: 'S6',
          credits: 4,
          hours: 30,
          students: 40,
          rating: 4.4,
          downloads: 98,
          lastUpdated: '2024-03-01',
          fileSize: '2.1 MB',
          fileType: 'PDF',
          tags: ['Agile', 'Scrum', 'Management'],
          isNew: false,
          isFavorite: false,
          progress: 0,
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
      ];
      setCourses(mockCourses);
      setLoading(false);
    }, 1000);
  };

  const handleDownload = (courseId, fileName) => {
    // Simuler un téléchargement
    setDownloadProgress(prev => ({ ...prev, [courseId]: 0 }));
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[courseId] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Simuler la fin du téléchargement
          console.log(`Téléchargement terminé: ${fileName}`);
          return { ...prev, [courseId]: null };
        }
        return { ...prev, [courseId]: currentProgress + 20 };
      });
    }, 300);
  };

  const toggleFavorite = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, isFavorite: !course.isFavorite }
        : course
    ));
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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' ||
                           (selectedCategory === 'new' && course.isNew) ||
                           (selectedCategory === 'favorites' && course.isFavorite) ||
                           (selectedCategory === 'in-progress' && course.progress > 0 && course.progress < 100) ||
                           (selectedCategory === 'completed' && course.progress === 100) ||
                           (selectedCategory === course.level);
    
    return matchesSearch && matchesCategory;
  });

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
              <input 
                type="text" 
                placeholder="Rechercher un cours..." 
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
              <h1 className="page-title">Cours disponibles</h1>
              <p className="page-subtitle">
                {getRoleIcon()} {getRoleLabel()} • {filteredCourses.length} cours disponibles
              </p>
            </div>
            
            <div className="view-options">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-section">
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tous les cours
              </button>
              <button 
                className={`filter-tab ${selectedCategory === 'new' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('new')}
              >
                Nouveautés
              </button>
              <button 
                className={`filter-tab ${selectedCategory === 'favorites' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('favorites')}
              >
                Favoris
              </button>
              <button 
                className={`filter-tab ${selectedCategory === 'in-progress' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('in-progress')}
              >
                En cours
              </button>
              <button 
                className={`filter-tab ${selectedCategory === 'S5' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('S5')}
              >
                Semestre 5
              </button>
              <button 
                className={`filter-tab ${selectedCategory === 'S6' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('S6')}
              >
                Semestre 6
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Chargement des cours...</p>
            </div>
          )}

          {/* Courses Grid/List */}
          {!loading && (
            <div className={viewMode === 'grid' ? 'courses-grid' : 'courses-list'}>
              {filteredCourses.map((course) => (
                <div key={course.id} className={`course-card ${viewMode}`}>
                  {viewMode === 'grid' ? (
                    // Vue Grille
                    <>
                      <div className="course-image">
                        <img src={course.image} alt={course.title} />
                        {course.isNew && <span className="course-badge new">Nouveau</span>}
                        <button 
                          className={`favorite-btn ${course.isFavorite ? 'active' : ''}`}
                          onClick={() => toggleFavorite(course.id)}
                        >
                          <Star size={16} fill={course.isFavorite ? '#fbbf24' : 'none'} />
                        </button>
                      </div>
                      
                      <div className="course-content">
                        <div className="course-header">
                          <h3 className="course-title">{course.title}</h3>
                          <span className="course-level">{course.level}</span>
                        </div>
                        
                        <p className="course-description">{course.description}</p>
                        
                        <div className="course-meta">
                          <div className="meta-item">
                            <Users size={14} />
                            <span>{course.students} étudiants</span>
                          </div>
                          <div className="meta-item">
                            <Clock size={14} />
                            <span>{course.hours}h</span>
                          </div>
                          <div className="meta-item">
                            <Award size={14} />
                            <span>{course.credits} crédits</span>
                          </div>
                        </div>

                        <div className="course-professor">
                          <span className="professor-name">{course.professor}</span>
                        </div>

                        <div className="course-tags">
                          {course.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>

                        <div className="course-progress">
                          <div className="progress-header">
                            <span className="progress-label">Progression</span>
                            <span className="progress-value">{course.progress}%</span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="course-footer">
                          <div className="file-info">
                            <FileText size={14} />
                            <span>{course.fileSize} • {course.fileType}</span>
                          </div>
                          <button 
                            className="download-btn"
                            onClick={() => handleDownload(course.id, course.title)}
                            disabled={downloadProgress[course.id] !== undefined}
                          >
                            {downloadProgress[course.id] !== undefined ? (
                              <>
                                <span className="progress-text">{downloadProgress[course.id]}%</span>
                                <div className="download-progress"></div>
                              </>
                            ) : (
                              <>
                                <Download size={16} />
                                <span>Télécharger</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Vue Liste
                    <div className="course-list-item">
                      <div className="list-item-image">
                        <img src={course.image} alt={course.title} />
                      </div>
                      
                      <div className="list-item-content">
                        <div className="list-item-header">
                          <div>
                            <h3 className="list-item-title">{course.title}</h3>
                            <p className="list-item-professor">{course.professor}</p>
                          </div>
                          <button 
                            className={`favorite-btn ${course.isFavorite ? 'active' : ''}`}
                            onClick={() => toggleFavorite(course.id)}
                          >
                            <Star size={16} fill={course.isFavorite ? '#fbbf24' : 'none'} />
                          </button>
                        </div>
                        
                        <p className="list-item-description">{course.description}</p>
                        
                        <div className="list-item-meta">
                          <span className="meta-badge">
                            <Users size={14} />
                            {course.students} étudiants
                          </span>
                          <span className="meta-badge">
                            <Clock size={14} />
                            {course.hours}h
                          </span>
                          <span className="meta-badge">
                            <Award size={14} />
                            {course.credits} crédits
                          </span>
                          <span className="meta-badge">
                            <FileText size={14} />
                            {course.fileSize}
                          </span>
                        </div>

                        <div className="list-item-tags">
                          {course.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                          ))}
                        </div>

                        <div className="list-item-footer">
                          <div className="list-item-progress">
                            <span>Progression: {course.progress}%</span>
                            <div className="progress-bar-small">
                              <div style={{ width: `${course.progress}%` }}></div>
                            </div>
                          </div>
                          <button 
                            className="download-btn-list"
                            onClick={() => handleDownload(course.id, course.title)}
                          >
                            <Download size={16} />
                            Télécharger
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredCourses.length === 0 && (
            <div className="empty-state">
              <BookOpen size={48} color="#9ca3af" />
              <h3>Aucun cours trouvé</h3>
              <p>Essayez de modifier vos critères de recherche</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredCourses.length > 0 && (
            <div className="pagination">
              <button className="pagination-btn" disabled>Précédent</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <button className="pagination-btn">Suivant</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;