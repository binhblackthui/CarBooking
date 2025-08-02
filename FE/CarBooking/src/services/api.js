import axios from 'axios';
import { API_BASE_URL } from '../constants/api.js';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// List of routes that do NOT require Authorization header
const noAuthRoutes = ['/auth/login', '/auth/register'];

// Request Interceptor - Add token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    // Only add token if not in noAuthRoutes
    const isNoAuthRoute = noAuthRoutes.some((route) =>
      config.url.includes(route)
    );

    if (token && !isNoAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Optional: Show message to user
      console.warn('401 Unauthorized. Redirecting to login...');
        
      // Clear token
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      toast.error('not authenticated');
      // Optional: redirect


      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
