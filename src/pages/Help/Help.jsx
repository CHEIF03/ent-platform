// src/pages/Help/Help.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle,
  BookOpen,
  MessageCircle,
  FileText,
  Video,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  Search,
  Bell,
  Users,
  Shield,
  Settings,
  Download,
  Upload,
  Calendar,
  Star,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Award
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import './Help.css';

const Help = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [faqs, setFaqs] = useState([]);
  const [guides, setGuides] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    loadData();
  }, [user, navigate]);

  const loadData = () => {
    // FAQs simulées
    setFaqs([
      {
        id: 1,
        question: 'Comment accéder à mes cours ?',
        answer: 'Pour accéder à vos cours, cliquez sur "Mes cours" dans la sidebar. Vous y trouverez la liste de tous vos cours avec les ressources associées.',
        category: 'cours',
        helpful: 45
      },
      {
        id: 2,
        question: 'Comment télécharger un fichier de cours ?',
        answer: 'Dans la page "Mes cours", cliquez sur le bouton "Télécharger" à côté du fichier souhaité. Le téléchargement démarrera automatiquement.',
        category: 'cours',
        helpful: 32
      },
      {
        id: 3,
        question: 'Comment utiliser le Chat IA ?',
        answer: 'Le Chat IA est disponible dans la section "Chat". Vous pouvez poser des questions sur vos cours et obtenir des réponses instantanées basées sur Ollama Llama 3.',
        category: 'chat',
        helpful: 28
      },
      {
        id: 4,
        question: 'Comment soumettre un devoir ?',
        answer: 'Rendez-vous dans la page du cours concerné et cliquez sur "Soumettre un devoir". Suivez les instructions pour uploader votre fichier.',
        category: 'cours',
        helpful: 21
      },
      {
        id: 5,
        question: 'Comment contacter mon professeur ?',
        answer: 'Vous pouvez envoyer un message à votre professeur via la messagerie intégrée ou utiliser l\'email fourni dans la description du cours.',
        category: 'communication',
        helpful: 19
      },
      {
        id: 6,
        question: 'Comment modifier mon mot de passe ?',
        answer: 'Allez dans "Paramètres" > "Mot de passe". Vous pourrez y changer votre mot de passe après avoir entré votre mot de passe actuel.',
        category: 'compte',
        helpful: 56
      },
      {
        id: 7,
        question: 'Comment voir mon emploi du temps ?',
        answer: 'La page "Calendrier" affiche votre emploi du temps avec tous vos cours, TP, examens et deadlines.',
        category: 'calendrier',
        helpful: 34
      },
      {
        id: 8,
        question: 'Que faire si un fichier ne se télécharge pas ?',
        answer: 'Vérifiez votre connexion internet et réessayez. Si le problème persiste, contactez le support technique.',
        category: 'technique',
        helpful: 15
      }
    ]);

    // Guides simulés
    setGuides([
      {
        id: 1,
        title: 'Guide de démarrage rapide',
        description: 'Apprenez les bases de la plateforme en 10 minutes',
        icon: '🚀',
        color: '#1967d2',
        readTime: 5,
        level: 'Débutant'
      },
      {
        id: 2,
        title: 'Utiliser le Chat IA efficacement',
        description: 'Trucs et astuces pour tirer le meilleur parti de l\'assistant IA',
        icon: '🤖',
        color: '#137333',
        readTime: 8,
        level: 'Intermédiaire'
      },
      {
        id: 3,
        title: 'Gérer vos cours et ressources',
        description: 'Organisez et gérez vos documents pédagogiques',
        icon: '📚',
        color: '#b45309',
        readTime: 6,
        level: 'Débutant'
      },
      {
        id: 4,
        title: 'Guide de l\'enseignant',
        description: 'Comment créer et gérer des cours pour vos étudiants',
        icon: '👨‍🏫',
        color: '#7c3aed',
        readTime: 12,
        level: 'Enseignant'
      }
    ]);

    // Tickets de support simulés
    setSupportTickets([
      {
        id: 1,
        title: 'Problème de connexion',
        status: 'resolu',
        date: '2024-03-20',
        priority: 'haute'
      },
      {
        id: 2,
        title: 'Fichier corrompu',
        status: 'en_cours',
        date: '2024-03-21',
        priority: 'moyenne'
      }
    ]);
  };

  const getRoleIcon = () => {
    switch(user?.role) {
      case 'etudiant': return '👨‍🎓';
      case 'enseignant': return '👨‍🏫';
      case 'admin': return '👨‍💼';
      default: return '👤';
    }
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
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
                placeholder="Rechercher dans l'aide..." 
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
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{user?.username}</span>
                <span className="user-role">
                  {getRoleIcon()} {user?.role === 'etudiant' ? 'Étudiant' : 
                   user?.role === 'enseignant' ? 'Enseignant' : 'Administrateur'}
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Wrapper */}
        <div className="content-wrapper">
          {/* Header Section */}
          <div className="content-header">
            <div>
              <h1 className="page-title">Centre d'aide</h1>
              <p className="page-subtitle">
                {getRoleIcon()} Trouvez des réponses à vos questions
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="help-actions">
            <button className="help-action-btn" onClick={() => setShowTicketModal(true)}>
              <MessageSquare size={24} />
              <div>
                <h3>Contacter le support</h3>
                <p>Notre équipe vous répond sous 24h</p>
              </div>
              <ChevronRight size={20} />
            </button>
            
            <a href="mailto:support@est.um5.ac.ma" className="help-action-btn">
              <Mail size={24} />
              <div>
                <h3>Envoyer un email</h3>
                <p>support@est.um5.ac.ma</p>
              </div>
              <ExternalLink size={20} />
            </a>
            
            <a href="tel:+212537772222" className="help-action-btn">
              <Phone size={24} />
              <div>
                <h3>Appeler le support</h3>
                <p>+212 5 37 77 22 22</p>
              </div>
              <ExternalLink size={20} />
            </a>
          </div>

          {/* Guides Section */}
          <div className="guides-section">
            <h2 className="section-title">Guides et tutoriels</h2>
            <div className="guides-grid">
              {guides.map((guide) => (
                <div key={guide.id} className="guide-card">
                  <div className="guide-icon" style={{ background: guide.color }}>
                    <span>{guide.icon}</span>
                  </div>
                  <h3 className="guide-title">{guide.title}</h3>
                  <p className="guide-description">{guide.description}</p>
                  <div className="guide-meta">
                    <span className="guide-read-time">⏱️ {guide.readTime} min</span>
                    <span className="guide-level">{guide.level}</span>
                  </div>
                  <button className="guide-btn">
                    Lire le guide
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2 className="section-title">Questions fréquentes</h2>
            
            <div className="faq-categories">
              <button
                className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Toutes
              </button>
              <button
                className={`category-btn ${selectedCategory === 'cours' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('cours')}
              >
                Cours
              </button>
              <button
                className={`category-btn ${selectedCategory === 'compte' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('compte')}
              >
                Compte
              </button>
              <button
                className={`category-btn ${selectedCategory === 'chat' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('chat')}
              >
                Chat IA
              </button>
              <button
                className={`category-btn ${selectedCategory === 'calendrier' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('calendrier')}
              >
                Calendrier
              </button>
              <button
                className={`category-btn ${selectedCategory === 'technique' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('technique')}
              >
                Technique
              </button>
            </div>

            <div className="faq-list">
              {filteredFaqs.map((faq) => (
                <details key={faq.id} className="faq-item">
                  <summary className="faq-question">
                    <span>{faq.question}</span>
                    <ChevronRight size={20} className="faq-arrow" />
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                    <div className="faq-helpful">
                      <span>Cette réponse vous a-t-elle été utile ?</span>
                      <div className="helpful-buttons">
                        <button className="helpful-btn">
                          <ThumbsUp size={14} />
                          {faq.helpful}
                        </button>
                        <button className="helpful-btn">
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Support Tickets */}
          {user?.role === 'admin' && (
            <div className="tickets-section">
              <h2 className="section-title">Tickets de support récents</h2>
              <div className="tickets-list">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="ticket-item">
                    <div className="ticket-info">
                      <h4>{ticket.title}</h4>
                      <p>Créé le {new Date(ticket.date).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div className="ticket-status">
                      <span className={`status-badge ${ticket.status}`}>
                        {ticket.status === 'resolu' ? '✅ Résolu' : '⏳ En cours'}
                      </span>
                      <span className={`priority-badge ${ticket.priority}`}>
                        {ticket.priority === 'haute' ? '🔴 Haute' : '🟡 Moyenne'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Help;