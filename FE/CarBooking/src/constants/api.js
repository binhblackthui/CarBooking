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
    GET_CAR_BY_ID: (carId) => `/cars/${carId}`,
    SEARCH_CARS: '/cars/search',
    TOTAL_CARS_BY_STATUS: '/cars/total',
    POST: '/cars',

    UPDATE: (carId) => `/cars/${carId}`,
    DELETE: (carId) => `/cars/${carId}`,
    
  },
  // Bookings
  BOOKINGS:{
    GET_BOOKINGS:'/bookings',
    GET_TOTAL_BOOKINGS_BY_STATUS: '/bookings/total',
    UPDATE_BOOKING: (bookingId) => `/bookings/${bookingId}`,
    GET_BOOKING_PAYMENT: (bookingId) => `/bookings/${bookingId}/payment`,
    UPDATE_BOOKING_PAYMENT: (bookingId) => `/bookings/${bookingId}/payment`,

    
  },

  // Users
  USERS: {
    GET_USER_BY_ID: (userId) => `/users/${userId}`,
    GET_BOOKINGS_BY_USER_ID: (userId) => `/users/${userId}/bookings`,
  },

  // Locations
  LOCATIONS: {
    GET_ALL: '/locations',
  },


  // Car Types
  CAR_TYPES: {
    GET_ALL: '/carDetail',
  },
  PAYMENT:{
    GET_PAYMENT_BY_ID: (paymentId) => `/payments/${paymentId}`,
    UPDATE_PAYMENT: (paymentId) => `/payments/${paymentId}`,
  
  }
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
