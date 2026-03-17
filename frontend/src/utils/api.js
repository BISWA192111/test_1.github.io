import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      return Promise.reject(new Error('Too many requests. Please try again later.'));
    }
    return Promise.reject(error);
  }
);

export const chatAPI = {
  sendMessage: async (message, conversationHistory = []) => {
    return api.post('/chat/message', {
      message,
      conversationHistory,
    });
  },

  streamMessage: async (message, conversationHistory = []) => {
    return api.post('/chat/stream', {
      message,
      conversationHistory,
    }, {
      responseType: 'stream',
    });
  },

  getHealth: async () => {
    return api.get('/health');
  },
};

export default api;
