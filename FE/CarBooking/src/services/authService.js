import api from './api.js';
import { API_ENDPOINTS } from '../constants/api.js';

export const authService = {
  // Login
  login: async (loginForm) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, loginForm);
    // Save token to localStorage (only access token)
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    } else if (response.data.token) {
      // In case backend returns 'token' instead of 'accessToken'
      localStorage.setItem('accessToken', response.data.token);
    }
    
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },

  // Logout
  logout: async () => {
    localStorage.removeItem('accessToken');
  },

  // Check authentication status
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  // Get user info from token (if needed)
  getCurrentUser: () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      // Decode JWT token (need to install jwt-decode if wanted)
      // const decoded = jwtDecode(token);
      // return decoded;
      return { token }; // Temporarily return token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },
  loadUser: async () => {
    if (!this.isAuthenticated()) {
      throw new Error('Don`t have token');
    }

    try {
      const response = await api.get(API_ENDPOINTS.AUTH.AUTH);
      return response.data;
    }
    catch (error) {
      console.error('Error loading user:', error);
      throw error.response.data ? error.response.data : {
        status: 500,
        message: 'Internal server error',
      };
    }

  }
};
