import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';    // ← ../../ pour remonter
import './Register.css';
import { 
  Shield, 
  Upload, 
  User, 
  GraduationCap,
  Mail,
  Phone,
  Lock,
  FileText,
  CheckCircle,
  ArrowLeft,
  ChevronRight,
  BookOpen,
  IdCard
} from 'lucide-react';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // ===== ÉTATS DU FORMULAIRE =====
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'etudiant',
    cne: '',
    cin: '',
    filiere: '',
    niveau: '',
    pieceIdentite: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  // ===== LISTES DÉROULANTES =====
  const filieres = [
    'Génie Informatique',
    'Génie Industriel',
    'Génie Électrique',
    'Techniques de Management',
    'Gestion des Entreprises',
    'Marketing Digital'
  ];

  const niveaux = {
    etudiant: ['1ère année', '2ème année', '3ème année'],
    enseignant: ['Professeur', 'Maître de Conférences', 'Professeur Assistant']
  };

  // ===== HANDLERS =====
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        pieceIdentite: file
      }));
      setFilePreview(file.name);
    }
  };

  // ===== VALIDATION =====
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis';
    
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Téléphone invalide (10 chiffres)';
    
    if (!formData.password) newErrors.password = 'Mot de passe requis';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (formData.role === 'etudiant') {
      if (!formData.cne) newErrors.cne = 'CNE requis';
      if (!formData.filiere) newErrors.filiere = 'Filière requise';
      if (!formData.niveau) newErrors.niveau = 'Niveau requis';
    }

    if (formData.role === 'enseignant') {
      if (!formData.cin) newErrors.cin = 'CIN requis';
    }

    if (!formData.pieceIdentite) {
      newErrors.pieceIdentite = 'Pièce d\'identité requise';
    }

    return newErrors;
  };

  // ===== SOUMISSION =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      console.log('Données soumises:', formData);
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 2000);
  };

  // ===== PAGE DE SUCCÈS =====
  if (isSubmitted) {
    return (
      <div className="register-page">
        <div className="container">
          <div className="success-card">
            <div className="success-icon">
              <CheckCircle size={60} />
            </div>
            <h2>Inscription envoyée avec succès !</h2>
            <p>
              Votre demande d'inscription a été soumise à l'administration.<br />
              Vous recevrez un email de confirmation après validation.
            </p>
            <div className="success-details">
              <p><strong>Statut :</strong> En attente d'approbation</p>
              <p><strong>Délai de traitement :</strong> 24-48 heures</p>
            </div>
            <p className="success-redirect">
              Redirection vers la page de connexion...
            </p>
            <Link to="/login" className="back-link">
              <ArrowLeft size={16} />
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== FORMULAIRE D'INSCRIPTION =====
  return (
    <div className="register-page">
      {/* Header */}
      <header className="register-header">
        <div className="container">
          <div className="header-content">
            <Link to="/login" className="back-button">
              <ArrowLeft size={18} />
              Retour
            </Link>
            <div className="header-logo">
              <img src="/logo.png" alt="EST Salé" className="logo" />
              <span className="header-title">Inscription - ENT EST Salé</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="register-content">
          {/* Cartes d'information avec icônes en noir */}
          <div className="info-section">
            <div className="info-card">
              <Shield size={24} className="info-icon" />
              <h3>Validation administrative</h3>
              <p>
                Votre compte sera activé après vérification de vos informations 
                par l'administration.
              </p>
            </div>
            <div className="info-card">
              <Upload size={24} className="info-icon" />
              <h3>Pièces à fournir</h3>
              <p>
                {formData.role === 'etudiant' 
                  ? 'CNE + Pièce d\'identité'
                  : 'CIN + Pièce d\'identité'
                }
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Créer un compte</h2>
            <p className="form-subtitle">
              Tous les champs marqués d'un <span className="required">*</span> sont obligatoires
            </p>

            {/* Type de compte */}
            <div className="form-section">
              <h3>Type de compte</h3>
              <div className="role-selector">
                <label className={`role-card ${formData.role === 'etudiant' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="etudiant"
                    checked={formData.role === 'etudiant'}
                    onChange={handleChange}
                  />
                  <GraduationCap size={32} className="role-icon" />
                  <span>Étudiant</span>
                </label>
                <label className={`role-card ${formData.role === 'enseignant' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="enseignant"
                    checked={formData.role === 'enseignant'}
                    onChange={handleChange}
                  />
                  <User size={32} className="role-icon" />
                  <span>Enseignant</span>
                </label>
              </div>
            </div>

            {/* Informations personnelles */}
            <div className="form-section">
              <h3>Informations personnelles</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Prénom <span className="required">*</span></label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                    placeholder="Jean"
                  />
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Nom <span className="required">*</span></label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                    placeholder="Dupont"
                  />
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Email <span className="required">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="jean.dupont@est.um5.ac.ma"
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Téléphone <span className="required">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="0612345678"
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Informations académiques */}
            <div className="form-section">
              <h3>Informations académiques</h3>
              <div className="form-grid">
                {formData.role === 'etudiant' && (
                  <>
                    <div className="form-group">
                      <label>CNE <span className="required">*</span></label>
                      <input
                        type="text"
                        name="cne"
                        value={formData.cne}
                        onChange={handleChange}
                        className={errors.cne ? 'error' : ''}
                        placeholder="Code National d'Étudiant"
                      />
                      {errors.cne && (
                        <span className="error-message">{errors.cne}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Filière <span className="required">*</span></label>
                      <select
                        name="filiere"
                        value={formData.filiere}
                        onChange={handleChange}
                        className={errors.filiere ? 'error' : ''}
                      >
                        <option value="">Sélectionner une filière</option>
                        {filieres.map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                      {errors.filiere && (
                        <span className="error-message">{errors.filiere}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Niveau <span className="required">*</span></label>
                      <select
                        name="niveau"
                        value={formData.niveau}
                        onChange={handleChange}
                        className={errors.niveau ? 'error' : ''}
                      >
                        <option value="">Sélectionner un niveau</option>
                        {niveaux.etudiant.map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      {errors.niveau && (
                        <span className="error-message">{errors.niveau}</span>
                      )}
                    </div>
                  </>
                )}

                {formData.role === 'enseignant' && (
                  <div className="form-group">
                    <label>CIN <span className="required">*</span></label>
                    <input
                      type="text"
                      name="cin"
                      value={formData.cin}
                      onChange={handleChange}
                      className={errors.cin ? 'error' : ''}
                      placeholder="Carte d'Identité Nationale"
                    />
                    {errors.cin && (
                      <span className="error-message">{errors.cin}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sécurité */}
            <div className="form-section">
              <h3>Sécurité</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Mot de passe <span className="required">*</span></label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Minimum 6 caractères"
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Confirmer <span className="required">*</span></label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirmer votre mot de passe"
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="form-section">
              <h3>Documents requis</h3>
              <div className="form-group">
                <label>Pièce d'identité <span className="required">*</span></label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="pieceIdentite"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className={errors.pieceIdentite ? 'error' : ''}
                  />
                  <label htmlFor="pieceIdentite" className="file-label">
                    <Upload size={20} className="upload-icon" />
                    <span>
                      {filePreview || 'Choisir un fichier (PDF, JPG, PNG)'}
                    </span>
                  </label>
                </div>
                {errors.pieceIdentite && (
                  <span className="error-message">{errors.pieceIdentite}</span>
                )}
              </div>
            </div>

            {/* Mentions légales */}
            <div className="form-group terms">
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span className="checkbox-custom"></span>
                <span>
                  J'accepte les <a href="#">conditions d'utilisation</a> et la{' '}
                  <a href="#">politique de confidentialité</a>
                </span>
              </label>
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <FileText size={18} />
                  Soumettre ma demande
                </>
              )}
            </button>

            <p className="login-link">
              Déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="register-footer">
        <div className="container">
          <p className="copyright">© 2025 EST Salé - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;