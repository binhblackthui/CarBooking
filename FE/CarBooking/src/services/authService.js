import api from '../config/api.js';
import { API_ENDPOINTS } from '../constants/api.js';

export const authService = {
  // Login
  login: async (loginForm) => {
   try{
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, loginForm);
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data;
        }
    catch (error) {
       throw error.response.data ? error.response.data : {
            status: 500,
            message: 'Internal server error',
        };
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error.response.data ? error.response.data : {
            status: 500,
            message: 'Internal server error',
        };
        }
  },

  // Logout
  logout: async () => {
    localStorage.removeItem('accessToken');
  },

  // Check authentication status
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  // Get current user
  loadUser: async () => {
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
