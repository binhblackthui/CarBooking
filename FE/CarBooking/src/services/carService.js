import api from "./api";
import { API_ENDPOINTS } from "../constants/api.js";

export const carService = {

  
    getCars: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.GET_CARS, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    totalCarsByStatus: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.TOTAL_CARS_BY_STATUS, { params });
            console.log("Total cars response:", response);
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
    // Update an existing car
    updateCar: async (carId, carData) => {
        try {
            const response = await api.put(API_ENDPOINTS.CARS.UPDATE(carId), carData);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    },
    deleteCar: async (carId) => {
        try {
            const response = await api.delete(API_ENDPOINTS.CARS.DELETE(carId));
            return response.data;
        }
        catch (error) {
            throw error;
        }
    },
   
}
    
