import api from "./api";
import { API_ENDPOINTS } from "../constants/api.js";

export const locationService = {
    // Get all locations
    getAllLocations: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.LOCATIONS.GET_ALL);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}