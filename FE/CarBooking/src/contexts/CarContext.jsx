import React, { createContext } from "react";
import { carService } from "../services";
import toast from "react-hot-toast";
export const CarContext = createContext();
export const CarContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [cars, setCars] = React.useState({
    data: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    size: import.meta.env.VITE_SIZE_PAGE,
  });
  const [numberOfCars, setNumberOfCars] = React.useState({
    totalCars: 0,
    availableCars: 0,
    notAvailableCars: 0,
  });
  const [reviews, setReviews] = React.useState([]);

  const addCar = async (carData) => {
    setLoading(true);
    try {
      const newCar = await carService.createCar(carData);
      toast.success("Car added successfully!");
      return newCar;
    } catch (error) {
      console.error("Failed to add car:", error.message);
      toast.error("Failed to add car. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCars = async (params) => {
    setLoading(true);
    try {
      const cars = await carService.getCars(params);
      setCars(cars);
      return cars;
    } catch (error) {
      console.error("Failed to fetch my cars:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCarById = async (carId) => {
    setLoading(true);
    try {
      const car = await carService.getCarById(carId);
      return car;
    } catch (error) {
      console.error("Failed to fetch car by ID:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchCars = async (params) => {
    setLoading(true);
    try {
      const cars = await carService.searchCars(params);
      setCars(cars);
      return cars;
    } catch (error) {
      console.error("Failed to search cars:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const totalCarsByStatus = async (params) => {
    setLoading(true);
    try {
      const total = await carService.totalCarsByStatus(params);
      setNumberOfCars((prev) => ({
        ...prev,
        ...(params?.status === "AVAILABLE"
          ? { availableCars: total.availableCars }
          : params?.status === "NOT_AVAILABLE"
          ? { notAvailableCars: total.notAvailableCars }
          : { totalCars: total.totalCars }),
      }));
      return total;
    } catch (error) {
      console.error("Failed to fetch total cars:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCar = async (carId, carData) => {
    setLoading(true);
    try {
      const updatedCar = await carService.updateCar(carId, carData);
      setCars((prev) => ({
        ...prev,
        data: prev.data.map((car) => (car.id === carId ? updatedCar : car)),
      }));
      toast.success("Car updated successfully!");
      return updatedCar;
    } catch (error) {
      console.error("Failed to update car:", error.message);
      toast.error("Failed to update car. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCar = async (carId) => {
    setLoading(true);
    try {
      await carService.deleteCar(carId);
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Failed to delete car:", error.message);
      toast.error("Failed to delete car. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getCarReviews = async (carId, params) => {
    setLoading(true);
    try {
      const reviews = await carService.getCarReviews(carId, params);
      setReviews(reviews);
      return reviews;
    } catch (error) {
      console.error("Failed to fetch car reviews:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const carContextData = {
    cars,
    loading,
    numberOfCars,
    reviews,
    setLoading,
    addCar,
    totalCarsByStatus,
    getCars,
    getCarById,
    searchCars,
    updateCar,
    deleteCar,
    getCarReviews,
  };

  return (
    <CarContext.Provider value={carContextData}>{children}</CarContext.Provider>
  );
};
