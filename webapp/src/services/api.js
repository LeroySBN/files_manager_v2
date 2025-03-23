import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  // Skip token for /connect endpoint since it uses Basic auth
  if (config.url === '/connect') {
    return config;
  }

  const token = localStorage.getItem('token');
  // if (token && !config.headers.Authorization) {
  //   config.headers.Authorization = `Bearer ${token}`;
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
});

// Add interceptor for 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
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

export default api;
