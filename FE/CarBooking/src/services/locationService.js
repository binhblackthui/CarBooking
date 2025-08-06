import api from '../config/api.js';
import { API_ENDPOINTS } from "../constants/api.js";

export const locationService = {
    getAllLocations: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.LOCATIONS.GET_ALL);
            return response.data;
        } catch (error) {
            console.error("Error fetching all locations:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
            };
        }
    },
}