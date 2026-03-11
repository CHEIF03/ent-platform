// src/pages/Downloads/Downloads.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { 
  Download, 
  FileText, 
  Search, 
  BookOpen,
  Calendar,
  User,
  Filter,
  ChevronDown,
  Star,
  Clock,
  Award
} from 'lucide-react';
import './Downloads.css';

const Downloads = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Simuler le chargement des cours disponibles
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'Cours Génie Logiciel - Chapitre 1',
          description: 'Introduction au génie logiciel, cycles de vie, méthodologies',
          fileName: 'genie_logiciel_ch1.pdf',
          fileSize: '2.5 MB',
          fileType: 'PDF',
          teacher: 'Pr. Martin',
          course: 'Génie Logiciel',
          date: '2025-03-10',
          downloads: 45
        },
        {
          id: 2,
          title: 'Exercices Algorithmique - Série 3',
          description: 'Exercices sur les structures de contrôle et les tableaux',
          fileName: 'algorithmique_serie3.docx',
          fileSize: '1.2 MB',
          fileType: 'DOCX',
          teacher: 'Pr. Dupont',
          course: 'Algorithmique',
          date: '2025-03-09',
          downloads: 32
        },
        {
          id: 3,
          title: 'TP Base de Données - MySQL',
          description: 'Travaux pratiques sur la création de bases de données MySQL',
          fileName: 'tp_mysql.sql',
          fileSize: '0.8 MB',
          fileType: 'SQL',
          teacher: 'Pr. Bernard',
          course: 'Bases de Données',
          date: '2025-03-08',
          downloads: 28
        },
        {
          id: 4,
          title: 'Cours Réseaux - Chapitre 2',
          description: 'Architecture TCP/IP, adressage, routage',
          fileName: 'reseaux_ch2.pdf',
          fileSize: '3.1 MB',
          fileType: 'PDF',
          teacher: 'Pr. Martin',
          course: 'Réseaux',
          date: '2025-03-07',
          downloads: 38
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les cours
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'recent') {
      const today = new Date();
      const courseDate = new Date(course.date);
      const diffDays = Math.floor((today - courseDate) / (1000 * 60 * 60 * 24));
      return matchesSearch && diffDays <= 7;
    }
    if (selectedFilter === 'popular') {
      return matchesSearch && course.downloads > 30;
    }
    return matchesSearch;
  });

  const handleDownload = (course) => {
    alert(`Téléchargement de "${course.title}" démarré...`);
    console.log('Téléchargement:', course.fileName);
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (loading) {
    return (
      <div className="downloads-page">
        <Sidebar />
        <div className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des cours disponibles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="downloads-page">
      <Sidebar />
      
      <div className="main-content">
        {/* En-tête avec infos étudiant */}
        <div className="downloads-header">
          <div>
            <h1>Espace téléchargements</h1>
            <p>Accédez à tous vos cours et ressources pédagogiques</p>
          </div>
          
          <div className="student-info">
            <div className="student-avatar">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
            <div className="student-details">
              <span className="student-name">{user?.firstName} {user?.lastName}</span>
              <span className="student-role">Étudiant</span>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="stats-row">
          <div className="stat-item">
            <FileText size={20} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">{courses.length}</span>
              <span className="stat-label">Cours disponibles</span>
            </div>
          </div>
          <div className="stat-item">
            <Download size={20} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">143</span>
              <span className="stat-label">Téléchargements</span>
            </div>
          </div>
          <div className="stat-item">
            <Clock size={20} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">12</span>
              <span className="stat-label">Nouveautés</span>
            </div>
          </div>
          <div className="stat-item">
            <Award size={20} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-value">4</span>
              <span className="stat-label">Enseignants</span>
            </div>
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="search-section">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un cours, un enseignant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">Tous les cours</option>
              <option value="recent">Ajoutés récemment</option>
              <option value="popular">Les plus téléchargés</option>
            </select>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>
        </div>

        {/* Résultats */}
        <div className="results-info">
          <p>{filteredCourses.length} cours trouvés</p>
        </div>

        {/* Grille des cours */}
        {filteredCourses.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>Aucun cours trouvé</h3>
            <p>Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          <div className="courses-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="card-header">
                  <div className="file-icon">
                    {course.fileType === 'PDF' ? '📄' : 
                     course.fileType === 'DOCX' ? '📝' : '📊'}
                  </div>
                  <span className="file-type">{course.fileType}</span>
                </div>
                
                <div className="card-body">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  
                  <div className="course-meta">
                    <span className="meta-item">
                      <BookOpen size={14} />
                      {course.course}
                    </span>
                    <span className="meta-item">
                      <User size={14} />
                      {course.teacher}
                    </span>
                    <span className="meta-item">
                      <Calendar size={14} />
                      {formatDate(course.date)}
                    </span>
                  </div>
                  
                  <div className="file-info">
                    <span className="file-size">{course.fileSize}</span>
                    <span className="download-count">⬇️ {course.downloads}</span>
                  </div>
                </div>
                
                <button 
                  className="download-button"
                  onClick={() => handleDownload(course)}
                >
                  <Download size={16} />
                  Télécharger
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;