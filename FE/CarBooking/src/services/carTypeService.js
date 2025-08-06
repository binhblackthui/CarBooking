import api from '../config/api.js';
import { API_ENDPOINTS } from "../constants/api.js";

export const carTypeService = {
    getAllCarTypes: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CAR_TYPES.GET_ALL, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching all car types:", error);
            throw error.response.data ? error.response.data : {
                status: 500,
                message: 'Internal server error',
            };
        }
    }
};