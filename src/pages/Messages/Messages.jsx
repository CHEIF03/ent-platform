// src/pages/Messages/Messages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';
import { 
  Send, 
  Search, 
  User, 
  Paperclip, 
  Image, 
  MoreVertical,
  ChevronLeft,
  Check,
  CheckCheck,
  Clock,
  Info,
  X
} from 'lucide-react';
import './Messages.css';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([101, 102]); // IDs des utilisateurs en ligne

  // Déterminer le rôle
  const isTeacher = user?.role === 'enseignant';
  const isStudent = user?.role === 'etudiant';
  const isAdmin = user?.role === 'admin';

  // Charger les conversations (simulées)
  useEffect(() => {
    setTimeout(() => {
      // Conversations simulées
      const mockConversations = [
        {
          id: 1,
          userId: 101,
          name: 'Pr. Mohammed Alaoui',
          role: 'enseignant',
          department: 'Informatique',
          avatar: '👨‍🏫',
          lastMessage: 'N\'oubliez pas de rendre le projet avant vendredi',
          lastMessageTime: '2025-03-11T10:30:00',
          unread: 2,
          online: true
        },
        {
          id: 2,
          userId: 102,
          name: 'Pr. Fatima Zahra',
          role: 'enseignant',
          department: 'Mathématiques',
          avatar: '👩‍🏫',
          lastMessage: 'Les exercices supplémentaires sont disponibles',
          lastMessageTime: '2025-03-11T09:15:00',
          unread: 0,
          online: false
        },
        {
          id: 3,
          userId: 103,
          name: 'Ahmed Benani',
          role: 'etudiant',
          department: 'Génie Logiciel',
          avatar: '👨‍🎓',
          lastMessage: 'Merci pour votre aide sur le projet',
          lastMessageTime: '2025-03-10T18:20:00',
          unread: 1,
          online: true
        }
      ];

      // Filtrer selon le rôle
      if (isTeacher) {
        setConversations(mockConversations.filter(c => c.role === 'etudiant'));
      } else if (isStudent) {
        setConversations(mockConversations.filter(c => c.role === 'enseignant'));
      } else {
        setConversations(mockConversations);
      }

      setLoading(false);
    }, 1000);
  }, [isTeacher, isStudent]);

  // Charger les messages d'une conversation
  const loadMessages = (conversationId) => {
    setLoading(true);
    
    setTimeout(() => {
      // Messages simulés
      const mockMessages = [
        {
          id: 1,
          conversationId: 1,
          senderId: 101,
          senderName: 'Pr. Mohammed Alaoui',
          senderRole: 'enseignant',
          content: 'Bonjour, j\'espère que vous allez bien. Je voulais vous rappeler que le projet de fin de module doit être rendu avant vendredi.',
          timestamp: '2025-03-10T09:00:00',
          status: 'read',
          attachments: []
        },
        {
          id: 2,
          conversationId: 1,
          senderId: user?.id || 103,
          senderName: user?.firstName || 'Ahmed',
          senderRole: user?.role || 'etudiant',
          content: 'Bonjour professeur, oui nous travaillons dessus.',
          timestamp: '2025-03-10T09:15:00',
          status: 'read',
          attachments: []
        },
        {
          id: 3,
          conversationId: 1,
          senderId: 101,
          senderName: 'Pr. Mohammed Alaoui',
          senderRole: 'enseignant',
          content: 'Voici le support de cours mis à jour.',
          timestamp: '2025-03-11T10:30:00',
          status: 'delivered',
          attachments: [
            { name: 'cours_mis_a_jour.pdf', size: '2.5 MB', type: 'application/pdf' }
          ]
        }
      ];

      setMessages(mockMessages.filter(m => m.conversationId === conversationId));
      setLoading(false);
      
      // Marquer comme lu
      setConversations(prev => prev.map(c => 
        c.id === conversationId ? { ...c, unread: 0 } : c
      ));
    }, 500);
  };

  // Sélectionner une conversation
  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowMobileList(false);
    loadMessages(conversation.id);
  };

  // Envoyer un message texte
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: Date.now(),
      conversationId: selectedConversation.id,
      senderId: user?.id || 1,
      senderName: user?.firstName || 'Moi',
      senderRole: user?.role || 'etudiant',
      content: newMessage,
      timestamp: new Date().toISOString(),
      status: 'sending',
      attachments: []
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simuler l'envoi
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMsg.id ? { ...m, status: 'sent' } : m
      ));
      
      setTimeout(() => {
        setMessages(prev => prev.map(m => 
          m.id === newMsg.id ? { ...m, status: 'delivered' } : m
        ));
      }, 1000);
    }, 500);

    // Mettre à jour la dernière conversation
    setConversations(prev => prev.map(c => 
      c.id === selectedConversation.id 
        ? { ...c, lastMessage: newMessage, lastMessageTime: new Date().toISOString() }
        : c
    ));
  };

  // Upload de fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !selectedConversation) return;

    const newMsg = {
      id: Date.now(),
      conversationId: selectedConversation.id,
      senderId: user?.id || 1,
      senderName: user?.firstName || 'Moi',
      senderRole: user?.role || 'etudiant',
      content: `📎 ${file.name}`,
      timestamp: new Date().toISOString(),
      status: 'sending',
      attachments: [
        { 
          name: file.name, 
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`, 
          type: file.type,
          file: file
        }
      ]
    };

    setMessages([...messages, newMsg]);

    // Simuler l'envoi du fichier
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMsg.id ? { ...m, status: 'sent' } : m
      ));
    }, 1000);

    // Réinitialiser l'input file
    event.target.value = '';
  };

  // Upload d'image
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !selectedConversation) return;

    // Créer une URL pour prévisualisation
    const imageUrl = URL.createObjectURL(file);

    const newMsg = {
      id: Date.now(),
      conversationId: selectedConversation.id,
      senderId: user?.id || 1,
      senderName: user?.firstName || 'Moi',
      senderRole: user?.role || 'etudiant',
      content: '📷 Image',
      timestamp: new Date().toISOString(),
      status: 'sending',
      attachments: [
        { 
          name: file.name, 
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`, 
          type: file.type,
          file: file,
          preview: imageUrl
        }
      ]
    };

    setMessages([...messages, newMsg]);

    // Simuler l'envoi
    setTimeout(() => {
      setMessages(prev => prev.map(m => 
        m.id === newMsg.id ? { ...m, status: 'sent' } : m
      ));
    }, 1000);

    // Réinitialiser l'input file
    event.target.value = '';
  };

  // Formater l'heure
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('fr-FR', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  // Formater la date des messages
  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else {
      return date.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  // Grouper les messages par date
  const groupMessagesByDate = () => {
    const groups = [];
    let currentDate = null;

    messages.forEach(message => {
      const messageDate = formatMessageDate(message.timestamp);
      if (messageDate !== currentDate) {
        groups.push({ type: 'date', date: messageDate });
        currentDate = messageDate;
      }
      groups.push({ type: 'message', message });
    });

    return groups;
  };

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filtrer les conversations
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && conversations.length === 0) {
    return (
      <div className="messages-page">
        <Sidebar />
        <div className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement des messages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      <Sidebar />
      
      <div className="main-content">
        <div className="messages-container">
          {/* Liste des conversations */}
          <div className={`conversations-list ${showMobileList ? 'active' : ''}`}>
            <div className="conversations-header">
              <h2>Messages</h2>
              <div className="header-actions">
                <button className="icon-button">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="conversations">
              {filteredConversations.length === 0 ? (
                <div className="no-conversations">
                  <p>Aucune conversation</p>
                </div>
              ) : (
                filteredConversations.map(conv => (
                  <div
                    key={conv.id}
                    className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
                    onClick={() => handleSelectConversation(conv)}
                  >
                    <div className="conversation-avatar">
                      <span>{conv.avatar}</span>
                      {conv.online && <span className="online-dot"></span>}
                    </div>
                    <div className="conversation-info">
                      <div className="conversation-header">
                        <span className="conversation-name">{conv.name}</span>
                        <span className="conversation-time">{formatTime(conv.lastMessageTime)}</span>
                      </div>
                      <div className="conversation-details">
                        <span className="conversation-role">{conv.role}</span>
                        <span className="conversation-department">{conv.department}</span>
                      </div>
                      <div className="conversation-last-message">
                        <span className="last-message">{conv.lastMessage}</span>
                        {conv.unread > 0 && (
                          <span className="unread-badge">{conv.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Zone de conversation */}
          <div className={`chat-area ${!showMobileList ? 'active' : ''}`}>
            {selectedConversation ? (
              <>
                {/* En-tête du chat - SIMPLIFIÉ sans appels */}
                <div className="chat-header">
                  <button 
                    className="back-button"
                    onClick={() => setShowMobileList(true)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="chat-user-info">
                    <div className="chat-avatar">
                      <span>{selectedConversation.avatar}</span>
                      {selectedConversation.online && <span className="online-dot"></span>}
                    </div>
                    <div>
                      <h3>{selectedConversation.name}</h3>
                      <span className="chat-user-role">
                        {selectedConversation.role} • {selectedConversation.department}
                        {selectedConversation.online && ' • En ligne'}
                      </span>
                    </div>
                  </div>

                  <div className="chat-actions">
                    <button className="icon-button" title="Plus d'infos">
                      <Info size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="messages-list">
                  {groupMessagesByDate().map((item, index) => {
                    if (item.type === 'date') {
                      return (
                        <div key={`date-${index}`} className="message-date">
                          <span>{item.date}</span>
                        </div>
                      );
                    } else {
                      const message = item.message;
                      const isMe = message.senderId === (user?.id || 1);

                      return (
                        <div
                          key={message.id}
                          className={`message-item ${isMe ? 'my-message' : 'other-message'}`}
                        >
                          {!isMe && (
                            <div className="message-avatar">
                              <span>{selectedConversation.avatar}</span>
                            </div>
                          )}
                          <div className="message-content">
                            {!isMe && (
                              <span className="message-sender">{message.senderName}</span>
                            )}
                            <div className="message-bubble">
                              <p>{message.content}</p>
                              
                              {/* Affichage des pièces jointes */}
                              {message.attachments.length > 0 && (
                                <div className="message-attachments">
                                  {message.attachments.map((att, idx) => (
                                    <div key={idx} className="attachment-item">
                                      {att.type?.startsWith('image/') ? (
                                        <div className="image-preview">
                                          <img 
                                            src={att.preview || '#'} 
                                            alt={att.name}
                                            className="preview-image"
                                            onClick={() => window.open(att.preview, '_blank')}
                                          />
                                        </div>
                                      ) : (
                                        <>
                                          <span className="attachment-icon">📎</span>
                                          <span className="attachment-name">{att.name}</span>
                                          <span className="attachment-size">{att.size}</span>
                                        </>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              <div className="message-meta">
                                <span className="message-time">
                                  {new Date(message.timestamp).toLocaleTimeString('fr-FR', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                                {isMe && (
                                  <span className="message-status">
                                    {message.status === 'sending' && <Clock size={12} />}
                                    {message.status === 'sent' && <Check size={12} />}
                                    {message.status === 'delivered' && <CheckCheck size={12} />}
                                    {message.status === 'read' && <CheckCheck size={12} color="#34a853" />}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Zone de saisie - AVEC UPLOAD FONCTIONNEL */}
                <form onSubmit={handleSendMessage} className="message-input-area">
                  {/* Upload de fichier caché */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  
                  {/* Upload d'image caché */}
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />

                  {/* Bouton pour uploader un fichier */}
                  <button 
                    type="button" 
                    className="attach-button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Joindre un fichier"
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Bouton pour uploader une image */}
                  <button 
                    type="button" 
                    className="attach-button"
                    onClick={() => imageInputRef.current?.click()}
                    title="Joindre une image"
                  >
                    <Image size={20} />
                  </button>

                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  
                  <button 
                    type="submit" 
                    className="send-button"
                    disabled={!newMessage.trim()}
                  >
                    <Send size={20} />
                  </button>
                </form>
              </>
            ) : (
              <div className="no-chat-selected">
                <div className="no-chat-icon">💬</div>
                <h3>Vos messages</h3>
                <p>Sélectionnez une conversation pour commencer à discuter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;