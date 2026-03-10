import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:8000'; // À adapter selon ton backend

const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentification
export const login = (username, password) => {
  return api.post('/login', { username, password });
};

// Cours
export const getCourses = () => {
  return api.get('/courses');
};

export const uploadCourse = (formData) => {
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const downloadCourse = (courseId) => {
  return api.get(`/courses/${courseId}/download`, {
    responseType: 'blob'
  });
};

// Chat IA
export const chatWithAI = (message) => {
  return api.post('/chat', { message });
};

export default api;