import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
});

// Add response interceptor for token handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized response
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Add request interceptor for token
api.interceptors.request.use(
  (config) => {
    // Skip token for /connect endpoint since it uses Basic auth
    if (config.url === '/connect') {
      return config;
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['X-Token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper function to create Basic auth header
const createBasicAuthHeader = (email, password) => {
  const credentials = `${email}:${password}`;
  const encodedCredentials = btoa(credentials);
  return `Basic ${encodedCredentials}`;
};

export const authService = {
  signup: async (email, password) => {
    try {
      const response = await api.post('/users', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Signup failed';
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.get('/connect', {
        headers: {
          'Authorization': createBasicAuthHeader(email, password)
        }
      });
      
      // Store token from successful login
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.log(error);
      throw error.response?.data?.error || 'Login failed';
    }
  },

  logout: async () => {
    try {
      await api.get('/disconnect');
    } catch (error) {
      throw error.response?.data?.error || 'Logout failed';
    } finally {
      localStorage.removeItem('token');
    }
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to get user info';
    }
  }
};

export const fileService = {
  listFiles: async () => {
    try {
      const response = await api.get('/files');
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Failed to list files';
    }
  },
};

export default api;
