import api from "./api";
import { API_ENDPOINTS } from "../constants/api.js";

export const carService = {

    getCarOverview: async () => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.GET_CAR_OVERVIEW);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    },
    getCars: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.GET_CARS, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create a new car
    createCar: async (carData) => {
        try {
            const response = await api.post(API_ENDPOINTS.CARS.POST, carData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
   
}
    
