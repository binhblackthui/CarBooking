import api from "./api.js";
import { API_ENDPOINTS } from "../constants/api.js";

export const bookingService = {
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


}