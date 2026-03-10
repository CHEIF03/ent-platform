import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Lock, 
  LogIn, 
  AlertCircle,
  ChevronRight,
  Shield,
  Mail
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

  // ===== RENDU =====
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
          {/* Left Column - Image de l'EST Salé (SANS LOGO AU-DESSUS) */}
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
                  {/* LOGO SUPPRIMÉ - Plus de hero-logo-container */}
                  
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
              {/* Logo dans le formulaire (conservé) */}
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
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-footer">
        <div className="container footer-container">
          <p className="copyright">
            © 2025 EST Salé - Tous droits réservés
          </p>
          
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Mentions légales
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Confidentialité
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;