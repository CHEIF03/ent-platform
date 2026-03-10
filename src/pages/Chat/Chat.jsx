// src/pages/Chat/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Send,
  Bot,
  User,
  BookOpen,
  Download,
  MessageCircle,
  Upload,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Calendar,
  Clock,
  FileText,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RefreshCw,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import './Chat.css';

const Chat = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([
    "Explique le cours de base de données",
    "Résume le chapitre sur les réseaux",
    "Qu'est-ce que l'intelligence artificielle ?",
    "Comment fonctionne React ?",
    "Donne moi des exercices de SQL"
  ]);

  // Messages de bienvenue
  useEffect(() => {
    const welcomeMessage = {
      id: 'welcome',
      role: 'assistant',
      content: `Bonjour ${user?.username || 'étudiant'} ! 👋

Je suis votre assistant IA, basé sur Ollama Llama 3. Je peux vous aider à :
• Comprendre vos cours
• Résumer des chapitres
• Répondre à vos questions
• Vous donner des exercices

N'hésitez pas à me poser des questions sur vos cours !`,
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simuler une réponse IA (à remplacer par l'appel à Ollama)
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (question) => {
    // Simulation de réponses (à remplacer par l'appel réel à Ollama)
    const responses = {
      'base de données': `## 📚 Cours sur les Bases de Données

Une base de données est un système organisé pour stocker et gérer des données de manière structurée.

### Concepts clés :
1. **SQL** : Langage de requête structuré pour interagir avec les bases de données relationnelles
2. **Tables** : Structures qui organisent les données en lignes et colonnes
3. **Clés primaires** : Identifiants uniques pour chaque enregistrement
4. **Relations** : Liens entre différentes tables
5. **Index** : Optimisation des recherches

### Types de bases de données :
- **Relationnelles** : MySQL, PostgreSQL, Oracle
- **NoSQL** : MongoDB, Cassandra, Redis

Souhaitez-vous que je développe un point spécifique ?`,
      
      'réseaux': `## 🌐 Cours sur les Réseaux

Les réseaux informatiques permettent la communication entre différents systèmes.

### Notions fondamentales :
1. **Modèle OSI** : 7 couches d'abstraction
2. **TCP/IP** : Protocole de base d'Internet
3. **Adressage IP** : IPv4 et IPv6
4. **Routage** : Acheminement des paquets
5. **Sécurité** : Firewalls, VPN, chiffrement

### Équipements réseau :
- Routeurs
- Switches
- Points d'accès WiFi

Un sujet en particulier vous intéresse ?`,
      
      'intelligence artificielle': `## 🤖 Introduction à l'IA

L'Intelligence Artificielle simule l'intelligence humaine dans des machines.

### Domaines principaux :
1. **Machine Learning** : Apprentissage à partir de données
2. **Deep Learning** : Réseaux de neurones profonds
3. **NLP** : Traitement du langage naturel
4. **Vision par ordinateur** : Analyse d'images

### Applications :
- ChatGPT (comme moi !)
- Voitures autonomes
- Diagnostic médical
- Recommandations personnalisées

Je suis moi-même basé sur le modèle Llama 3 d'Ollama !`,
      
      'react': `## ⚛️ Introduction à React

React est une bibliothèque JavaScript pour construire des interfaces utilisateur.

### Concepts fondamentaux :
1. **Composants** : Blocs réutilisables
2. **JSX** : Syntaxe HTML dans JavaScript
3. **State & Props** : Gestion des données
4. **Hooks** : useState, useEffect, etc.
5. **Virtual DOM** : Optimisation des performances

### Exemple simple :
\`\`\`jsx
function Welcome() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Bonjour !</h1>
      <p>Compteur: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}
\`\`\`

Voulez-vous que je détaille un concept spécifique ?`,
      
      'exercices': `## 📝 Exercices SQL

### Exercice 1 : Requêtes simples
Soit une table \`etudiants\` avec les colonnes : id, nom, age, filière

1. Sélectionnez tous les étudiants :
\`\`\`sql
SELECT * FROM etudiants;
\`\`\`

2. Étudiants de plus de 20 ans :
\`\`\`sql
SELECT nom, age FROM etudiants WHERE age > 20;
\`\`\`

### Exercice 2 : Jointures
Tables : etudiants(id, nom), notes(id_etudiant, matiere, note)

Listez les notes avec les noms :
\`\`\`sql
SELECT e.nom, n.matiere, n.note
FROM etudiants e
JOIN notes n ON e.id = n.id_etudiant;
\`\`\`

Voulez-vous plus d'exercices ou la correction détaillée ?`
    };

    // Vérifier si la question correspond à un sujet connu
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('base de données') || lowerQuestion.includes('sql')) {
      return responses['base de données'];
    } else if (lowerQuestion.includes('réseau') || lowerQuestion.includes('tcp')) {
      return responses['réseaux'];
    } else if (lowerQuestion.includes('ia') || lowerQuestion.includes('intelligence')) {
      return responses['intelligence artificielle'];
    } else if (lowerQuestion.includes('react') || lowerQuestion.includes('composant')) {
      return responses['react'];
    } else if (lowerQuestion.includes('exercice') || lowerQuestion.includes('sql')) {
      return responses['exercices'];
    } else {
      return `## 🤔 À propos de "${question}"

Je comprends votre question ! Pour vous aider au mieux, pourriez-vous préciser :

1. **De quel cours s'agit-il ?** (Base de données, Réseaux, IA, Développement...)
2. **Quel est le sujet exact ?** (Un chapitre spécifique, un concept...)
3. **Qu'attendez-vous ?** (Une explication, des exemples, des exercices...)

Je suis basé sur Ollama Llama 3 et je peux vous aider sur tous vos cours ! 🎓`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
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
              <input type="text" placeholder="Rechercher dans les conversations..." />
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
              <h1 className="page-title">Chat IA</h1>
              <p className="page-subtitle">
                {getRoleIcon()} {getRoleLabel()} • Assistant basé sur Ollama Llama 3
              </p>
            </div>
          </div>

          {/* Chat Container */}
          <div className="chat-container">
            {/* Messages Area */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.role === 'assistant' ? 'assistant' : 'user'}`}
                >
                  <div className="message-avatar">
                    {message.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">
                        {message.role === 'assistant' ? 'Assistant IA' : user?.username}
                      </span>
                      <span className="message-time">{formatTime(message.timestamp)}</span>
                    </div>
                    <div className="message-text">
                      {message.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < message.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                    
                    {/* Message Actions (pour les messages assistant) */}
                    {message.role === 'assistant' && message.id !== 'welcome' && (
                      <div className="message-actions">
                        <button className="action-btn" title="Copier">
                          <Copy size={14} />
                        </button>
                        <button className="action-btn" title="Régénérer">
                          <RefreshCw size={14} />
                        </button>
                        <button className="action-btn" title="Utile">
                          <ThumbsUp size={14} />
                        </button>
                        <button className="action-btn" title="Pas utile">
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="message assistant">
                  <div className="message-avatar">
                    <Bot size={20} />
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">Assistant IA</span>
                    </div>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="suggestions-section">
                <h3 className="suggestions-title">
                  <Sparkles size={16} />
                  Suggestions de questions
                </h3>
                <div className="suggestions-grid">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="suggestion-chip"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="chat-input-area">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question sur les cours..."
                className="chat-input"
                rows="1"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                className={`send-btn ${!inputMessage.trim() || isLoading ? 'disabled' : ''}`}
                disabled={!inputMessage.trim() || isLoading}
              >
                <Send size={18} />
              </button>
            </div>

            {/* Info Bar */}
            <div className="chat-info-bar">
              <div className="info-left">
                <Bot size={14} />
                <span>Assistant IA basé sur Ollama Llama 3</span>
              </div>
              <div className="info-right">
                <span className="info-badge">
                  <MessageCircle size={14} />
                  {messages.length - 1} messages
                </span>
                <span className="info-badge">
                  <Clock size={14} />
                  Contexte de session
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;