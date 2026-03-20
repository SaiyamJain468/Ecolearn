import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ecolearn_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/students/login', credentials),
  register: (userData) => api.post('/students/register', userData),
  getProfile: () => api.get('/students/profile'),
};

export const missionAPI = {
  getAll: () => api.get('/submissions'), // Temporary: should be /missions
  submit: (missionData) => api.post('/submissions', missionData),
  getUserSubmissions: () => api.get('/submissions/user'),
};

export const analyticsAPI = {
  getImpact: () => api.get('/analytics/impact'),
  getForecast: () => api.get('/analytics/forecast'),
};

export default api;
