import api from './api.js';
import { API_ENDPOINTS } from '../constants/api.js';

export const bookingService = {
  // Get all bookings
  getAllBookings: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.GET_ALL, { params });
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.GET_BY_ID(id));
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
    return response.data;
  },

  // Update booking
  updateBooking: async (id, bookingData) => {
    const response = await api.put(API_ENDPOINTS.BOOKINGS.UPDATE(id), bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.delete(API_ENDPOINTS.BOOKINGS.DELETE(id));
    return response.data;
  },

  // Get user's bookings
  getUserBookings: async () => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.BY_USER);
    return response.data;
  },

  // Get bookings for owner
  getOwnerBookings: async () => {
    const response = await api.get(API_ENDPOINTS.BOOKINGS.BY_OWNER);
    return response.data;
  },

  // Confirm booking (for owner)
  confirmBooking: async (id) => {
    const response = await api.patch(`/bookings/${id}/confirm`);
    return response.data;
  },

  // Reject booking (for owner)
  rejectBooking: async (id, reason = '') => {
    const response = await api.patch(`/bookings/${id}/reject`, { reason });
    return response.data;
  },
};
