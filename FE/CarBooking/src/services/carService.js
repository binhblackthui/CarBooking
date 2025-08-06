import api from "../config/api.js";
import { API_ENDPOINTS } from "../constants/api.js";

export const carService = {

  
    getCars: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.GET_CARS, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching cars:", error);
            throw error;
        }
    },
    getCarById: async (carId) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.GET_CAR_BY_ID(carId));
            return response.data;
        } catch (error) {
            console.error("Error fetching car by ID:", error);
            throw error;
        }
    },
    searchCars: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.SEARCH_CARS, { params });
            return response.data;
        } catch (error) {
            console.error("Error searching cars:", error);
            throw error;
        }
    },
    totalCarsByStatus: async (params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.TOTAL_CARS_BY_STATUS, { params });
            console.log("Total cars response:", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching total cars by status:", error);
            throw error;
        }
    },

    // Create a new car
    createCar: async (carData) => {
        try {
            const response = await api.post(API_ENDPOINTS.CARS.POST, carData);
            return response.data;
        } catch (error) {
            console.error("Error creating car:", error);
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
            console.error("Error updating car:", error);
            throw error;
        }
    },
    deleteCar: async (carId) => {
        try {
            const response = await api.delete(API_ENDPOINTS.CARS.DELETE(carId));
            return response.data;
        } catch (error) {
            console.error("Error deleting car:", error);
            throw error;
        }
    },
   

    getCarReviews: async (carId, params = {}) => {
        try {
            const response = await api.get(API_ENDPOINTS.CARS.GET_REVIEWS(carId), { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching car reviews:", error);
            throw error;
        }
    },
}
