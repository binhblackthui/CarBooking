import api from './api.js';
import { API_ENDPOINTS } from '../constants/api.js';

export const carService = {
  // Get all cars
  getAllCars: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.CARS.GET_ALL, { params });
    return response.data;
  },

  // Get car by ID
  getCarById: async (id) => {
    const response = await api.get(API_ENDPOINTS.CARS.GET_BY_ID(id));
    return response.data;
  },

  // Create new car (for owner)
  createCar: async (carData) => {
    const response = await api.post(API_ENDPOINTS.CARS.CREATE, carData);
    return response.data;
  },

  // Update car information
  updateCar: async (id, carData) => {
    const response = await api.put(API_ENDPOINTS.CARS.UPDATE(id), carData);
    return response.data;
  },

  // Delete car
  deleteCar: async (id) => {
    const response = await api.delete(API_ENDPOINTS.CARS.DELETE(id));
    return response.data;
  },

  // Search cars
  searchCars: async (searchParams) => {
    const response = await api.get(API_ENDPOINTS.CARS.SEARCH, { 
      params: searchParams 
    });
    return response.data;
  },

  // Get cars by owner
  getCarsByOwner: async () => {
    const response = await api.get(API_ENDPOINTS.CARS.BY_OWNER);
    return response.data;
  },

  // Upload car image (if needed)
  uploadCarImage: async (carId, imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post(`/cars/${carId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
