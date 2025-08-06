import api from '../config/api.js';
import { API_ENDPOINTS } from "../constants/api.js";

export const bookingService = {

    createBooking: async (bookingData) => {
        try {
            const response = await api.post(API_ENDPOINTS.BOOKINGS.POST, bookingData);
            return response.data;
        } catch (error) {
            console.error("Error creating booking:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',

            };
        }
    },
   getBookings: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.BOOKINGS.GET_BOOKINGS, { params });
            return response.data;
        } catch (error) {
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },
   
    getBookingById: async (bookingId) => {
        try {
            const response = await api.get(API_ENDPOINTS.BOOKINGS.GET_BOOKING_BY_ID(bookingId));
            return response.data;
        } catch (error) {
            console.error("Error fetching booking by ID:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },
    totalBookingsByStatus: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.BOOKINGS.GET_TOTAL_BOOKINGS_BY_STATUS, { params });
            return response.data;
        } catch (error) {
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },
    updateBooking: async (bookingId, bookingData) => {
        try {
            const response = await api.put(API_ENDPOINTS.BOOKINGS.UPDATE_BOOKING(bookingId), bookingData);
            return response.data;
        } catch (error) {
            console.error("Error updating booking:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },

    updatePaymentByBooking: async (bookingId, paymentData) => {
        try {
            const response = await api.put(API_ENDPOINTS.BOOKINGS.UPDATE_PAYMENT_BY_BOOKING(bookingId), paymentData);
            return response.data;
        } catch (error) {
            console.error("Error updating payment by booking:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },

    createReview: async (bookingId, reviewData) => {
        try {
            const response = await api.post(API_ENDPOINTS.BOOKINGS.CREATED_REVIEW(bookingId), reviewData);
            return response.data;
        } catch (error) {
            console.error("Error creating review:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },


}