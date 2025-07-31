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
    getBookingOverview: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.BOOKINGS.GET_BOOKING_OVERVIEW);
            return response.data;
        } catch (error) {
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    },

    
   
}