// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Lock, 
  LogIn, 
  AlertCircle,
  ChevronRight,
  Shield,
  Mail,
  Bot,
  Send,
  X,
  Sparkles,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  Users,
  Upload,
  Settings
} from 'lucide-react';
import './Login.css';

const Login = () => {
  // ===== ÉTATS =====
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showTestAccounts, setShowTestAccounts] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false); // ← État pour afficher le modal IA
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // ===== COMPTES DE TEST =====
  const testAccounts = [
    { role: 'Étudiant', username: 'etudiant', password: '123456', icon: '👨‍🎓' },
    { role: 'Enseignant', username: 'enseignant', password: '123456', icon: '👨‍🏫' },
    { role: 'Administrateur', username: 'admin', password: '123456', icon: '👨‍💼' }
  ];

  // ===== HANDLERS =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const { username, password } = formData;
    
    if (!username.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const result = await login(username, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  const fillTestAccount = (username, password) => {
    setFormData({ username, password });
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <div className="container header-container">
          <div className="header-left">
            <img 
              src="/logo.png" 
              alt="EST Salé"
              className="header-logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/40x40?text=EST';
              }}
            />
            <span className="header-title">
              ENT - EST Salé
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="login-main">
        <div className="container main-container">
          {/* Left Column - Image */}
          <div className="hero-column">
            <div className="hero-image-container">
              <img 
                src="/images/est-campus.jpg" 
                alt="Campus EST Salé"
                className="hero-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1486&q=80';
                }}
              />
              <div className="hero-overlay-light">
                <div className="hero-content">
                  <h1 className="hero-title">
                    Université Mohammed V de Rabat
                  </h1>
                  <h2 className="hero-subtitle">
                    École Supérieure de Technologie - Salé
                  </h2>
                  <div className="hero-arabic">
                    <p>جامعة محمد الخامس بالرباط</p>
                    <p>المدرسة العليا للتكنولوجيا بسلا</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="form-column">
            <div className="form-card">
              {/* Logo */}
              <div className="form-header">
                <img 
                  src="/logo.png" 
                  alt="EST Salé"
                  className="form-logo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/80x80?text=EST';
                  }}
                />
                <div className="security-badge">
                  <Shield size={14} />
                  <span>Connexion sécurisée</span>
                </div>
              </div>

              {/* Title */}
              <div className="form-title-section">
                <h3>Bienvenue</h3>
                <p>Connectez-vous à votre espace personnel</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-alert">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">
                    Nom d'utilisateur
                  </label>
                  <div className="input-group">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="ex: etudiant@est.um5.ac.ma"
                      className="form-input"
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Mot de passe
                  </label>
                  <div className="input-group">
                    <Lock size={18} className="input-icon" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="form-input"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkbox-custom"></span>
                    <span>Se souvenir de moi</span>
                  </label>
                  
                  <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
                    Mot de passe oublié ?
                  </a>
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Connexion...</span>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span>Se connecter</span>
                    </>
                  )}
                </button>
              </form>

              {/* Test Accounts Toggle */}
              <div className="test-accounts-section">
                <button 
                  className="test-toggle"
                  onClick={() => setShowTestAccounts(!showTestAccounts)}
                  type="button"
                >
                  <span>Comptes de test</span>
                  <ChevronRight 
                    size={16} 
                    className={`toggle-icon ${showTestAccounts ? 'open' : ''}`}
                  />
                </button>

                {showTestAccounts && (
                  <div className="test-accounts-grid">
                    {testAccounts.map((account, index) => (
                      <button
                        key={index}
                        className="test-account-card"
                        onClick={() => fillTestAccount(account.username, account.password)}
                        type="button"
                      >
                        <span className="account-role">
                          <span className="account-icon">{account.icon}</span>
                          {account.role}
                        </span>
                        <span className="account-credentials">
                          {account.username} / {account.password}
                        </span>
                        <span className="account-fill">Remplir</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Help Text */}
              <div className="help-text">
                <Mail size={14} />
                <span>
                  Les comptes sont créés par l'administration. 
                  Contactez le support pour toute assistance.
                </span>
              </div>

              {/* ===== BOUTON POUR OUVRIR LE CHAT IA ===== */}
              <div className="chat-ai-button-section">
                <button 
                  className="chat-ai-button"
                  onClick={() => setShowAIChat(true)}
                  type="button"
                >
                  <Bot size={18} />
                  <span>Besoin d'aide ? Parler à l'assistant IA</span>
                  <ChevronRight size={16} className="button-arrow" />
                </button>
              </div>

              {/* Lien vers l'inscription */}
              <div className="register-link">
                <p>
                  Pas encore de compte ? <Link to="/register">S'inscrire</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== MODAL CHAT IA ===== */}
      {showAIChat && (
        <AIChatModal onClose={() => setShowAIChat(false)} />
      )}

      {/* Footer */}
      <footer className="login-footer">
        <div className="container footer-container">
          <p className="copyright">
            © 2025 EST Salé - Tous droits réservés
          </p>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Mentions légales</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Confidentialité</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ===== COMPOSANT MODAL CHAT IA =====
const AIChatModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1,
      role: 'assistant', 
      content: 'Bonjour ! Je suis votre assistant virtuel EST Salé. Comment puis-je vous aider ? Voici quelques questions fréquentes :',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef(null);

  // Questions fréquentes
  const quickQuestions = [
    { icon: <HelpCircle size={14} />, text: "Comment créer un compte ?" },
    { icon: <Lock size={14} />, text: "Mot de passe oublié ?" },
    { icon: <BookOpen size={14} />, text: "Comment s'inscrire aux cours ?" },
    { icon: <AlertCircle size={14} />, text: "Problèmes de connexion" },
    { icon: <Mail size={14} />, text: "Contacter l'administration" },
    { icon: <Calendar size={14} />, text: "Horaires de l'établissement" }
  ];

  // Base de connaissances
  const knowledgeBase = {
    "comment créer un compte": "📝 **Pour créer un compte :**\n\n1. Cliquez sur 'S'inscrire' en bas du formulaire\n2. Remplissez le formulaire d'inscription\n3. Choisissez votre rôle (étudiant/enseignant)\n4. Téléchargez vos documents (CNE/CIN)\n5. Soumettez votre demande\n6. Attendez la validation par l'administration (24-48h)\n\n✅ Vous recevrez un email de confirmation.",
    
    "mot de passe oublié": "🔑 **Mot de passe oublié ?**\n\n1. Cliquez sur 'Mot de passe oublié ?'\n2. Entrez votre email\n3. Vous recevrez un lien de réinitialisation\n4. Suivez les instructions dans l'email\n\n📧 Si vous ne recevez pas l'email, vérifiez vos spams ou contactez le support.",
    
    "comment s'inscrire aux cours": "📚 **Inscription aux cours :**\n\n1. Connectez-vous à votre compte\n2. Allez dans 'Mes cours' depuis le tableau de bord\n3. Cliquez sur 'S'inscrire à un cours'\n4. Parcourez la liste des cours disponibles\n5. Sélectionnez vos cours\n6. Validez votre inscription\n\n⏰ Les inscriptions sont ouvertes en début de semestre.",
    
    "problèmes de connexion": "⚠️ **Problèmes de connexion :**\n\n1. Vérifiez votre nom d'utilisateur et mot de passe\n2. Assurez-vous que votre compte est validé\n3. Essayez de réinitialiser votre mot de passe\n4. Videz le cache de votre navigateur\n5. Utilisez un autre navigateur (Chrome/Firefox)\n\n📞 Contactez le support si le problème persiste.",
    
    "contacter l'administration": "📞 **Contacter l'administration :**\n\n• Email: administration@est.um5.ac.ma\n• Téléphone: +212 5XX XXX XXX\n• Bureau: Bâtiment administratif, bureau 105\n• Horaires: Lun-Ven 9h-17h\n\n💬 Vous pouvez aussi utiliser le formulaire de contact en ligne.",
    
    "horaires de l'établissement": "⏰ **Horaires de l'EST Salé :**\n\n• Cours: 8h30 - 18h30 (Lun-Ven)\n• Bibliothèque: 9h - 19h\n• Administration: 9h - 17h\n• Accueil: 8h30 - 19h\n\n🚫 Fermé le week-end et jours fériés."
  };

  // Auto-scroll
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Trouver réponse
  const findAnswer = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerQuestion.includes(key)) {
        return value;
      }
    }
    
    return "Je n'ai pas trouvé de réponse à votre question. Voici comment obtenir de l'aide :\n\n• Consultez la FAQ en ligne\n• Contactez le support à support@est.um5.ac.ma\n• Appelez le +212 5XX XXX XXX\n• Passez au bureau d'aide (Bâtiment A)";
  };

  // Envoyer message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(inputMessage);
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Question rapide
  const handleQuickQuestion = (questionText) => {
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: questionText,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(questionText);
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: answer,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="ai-chat-modal-overlay" onClick={onClose}>
      <div className="ai-chat-modal" onClick={(e) => e.stopPropagation()}>
        {/* En-tête */}
        <div className="ai-chat-header">
          <div className="ai-header-content">
            <div className="ai-header-icon">
              <Bot size={24} />
            </div>
            <div>
              <h3>Assistant virtuel EST Salé</h3>
              <p>Comment puis-je vous aider ?</p>
            </div>
          </div>
          <button className="ai-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="ai-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="ai-message-avatar">
                  <Bot size={16} />
                </div>
              )}
              <div className="ai-message-content">
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                <span className="ai-message-time">
                  {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-message assistant">
              <div className="ai-message-avatar">
                <Bot size={16} />
              </div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Questions rapides */}
        <div className="ai-quick-questions">
          <p className="quick-questions-title">Questions fréquentes :</p>
          <div className="quick-questions-grid">
            {quickQuestions.map((q, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => handleQuickQuestion(q.text)}
              >
                {q.icon}
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Zone de saisie */}
        <form onSubmit={handleSendMessage} className="ai-chat-input">
          <input
            type="text"
            placeholder="Posez votre question..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button type="submit" disabled={!inputMessage.trim()}>
            <Send size={18} />
          </button>
        </form>

        {/* Footer */}
        <div className="ai-chat-footer">
          <Sparkles size={12} />
          <span>Assistant IA - Réponses automatiques</span>
        </div>
      </div>
    </div>
  );
};

export default Login;