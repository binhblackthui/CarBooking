// API Base URL - Change according to your Spring Boot backend address
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    AUTH: '/auth',
  },
  
  // Cars
  CARS: {
    GET_ALL: '/cars',
    GET_BY_ID: (id) => `/cars/${id}`,
    CREATE: '/cars',
    UPDATE: (id) => `/cars/${id}`,
    DELETE: (id) => `/cars/${id}`,
    SEARCH: '/cars/search',
    BY_OWNER: '/cars/owner',
  },
  
  // Bookings
  BOOKINGS: {
    GET_ALL: '/bookings',
    GET_BY_ID: (id) => `/bookings/${id}`,
    CREATE: '/bookings',
    UPDATE: (id) => `/bookings/${id}`,
    DELETE: (id) => `/bookings/${id}`,
    BY_USER: '/bookings/user',
    BY_OWNER: '/bookings/owner',
  },
  
  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    GET_ALL: '/users',
  },
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
