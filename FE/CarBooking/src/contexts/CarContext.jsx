import React, { createContext } from "react";
import { carService } from "../services";
import toast from "react-hot-toast";
export const CarContext = createContext();
export const CarContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [numberOfCars, setNumberOfCars] = React.useState({
    totalCars: 0,
    availableCars: 0,
    notAvailableCars: 0,
  });
  const [totalPages, setTotalPages] = React.useState(0);
  const [filter, setFilter] = React.useState({
    location: "",
    pickup_date: "",
    return_date: "",
    page: 0,
    size: 10,
  });

  const addCar = async (carData) => {
    setLoading(true);
    try {
      console.log("Adding car with data:", carData);
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
      setCars(cars.content);
      setTotalPages(cars.totalPages);
      setNumberOfCars((prev) => ({
        ...prev,
        totalCars: cars.totalElements,
      }));
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
      console.log("Car details fetched:", car);
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
      const res = await carService.searchCars(params);
      console.log("Search results:", res);
      setCars(res.content);
      setTotalPages(res.totalPages);
      setNumberOfCars((prev) => ({
        ...prev,
        totalCars: res.totalElements,
      }));
      return res;
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
      console.log("Total cars fetched:", total);

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
      setCars((prevCars) =>
        prevCars.map((car) => (car.id === carId ? updatedCar : car))
      );
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
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
      toast.success("Car deleted successfully!");
    } catch (error) {
      console.error("Failed to delete car:", error.message);
      toast.error("Failed to delete car. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const carContextData = {
    cars,
    loading,
    numberOfCars,
    totalPages,
    filter,
    setFilter,
    setNumberOfCars,
    totalCarsByStatus,
    setCars,
    addCar,
    getCars,
    getCarById,
    searchCars,
    updateCar,
    deleteCar,
  };

  return (
    <CarContext.Provider value={carContextData}>{children}</CarContext.Provider>
  );
};
