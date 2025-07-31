import api from "./api";
import { API_ENDPOINTS } from "../constants/api.js";

export const carTypeService = {
    // Get all car types
    getAllCarTypes: async (params = {}) => {
        try {
       
            const response = await api.get(API_ENDPOINTS.CAR_TYPES.GET_ALL, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};