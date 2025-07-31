// API Base URL - Change according to your Spring Boot backend address
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    AUTH: '/auth',
  },
  // Cars
  CARS: {
    GET_CARS: '/cars',
    GET_CAR_OVERVIEW: '/cars/overview',
    POST: '/cars',
    
  },
  // Bookings
  BOOKINGS:{
    GET_BOOKINGS:'/bookings',
    GET_BOOKING_OVERVIEW: '/bookings/overview',
  },

  // Users
  USERS: {
    GET_MY_CAR_SUMMARY: (userId) => `/users/${userId}/cars/summary`,
  },

  // Locations
  LOCATIONS: {
    GET_ALL: '/locations',
  },


  // Car Types
  CAR_TYPES: {
    GET_ALL: '/carDetail',
  },
};
// Locations


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
