import { API_ENDPOINTS } from "../constants/api";
import api from "./api";


export const userService = {
  getUserById: async (userId) => {
    try {
        const response = await api.get(API_ENDPOINTS.USERS.GET_USER_BY_ID(userId));
        return response.data;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
  },
  getBookingsByUserId: async (userId, params) => {
    try {
        const response = await api.get(API_ENDPOINTS.USERS.GET_BOOKINGS_BY_USER_ID(userId), { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching bookings by user ID:", error);
        throw error;
    }
  }
};
