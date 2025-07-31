import React, { createContext } from "react";
import { carService } from "../services";
import toast from "react-hot-toast";
export const CarContext = createContext();
export const CarContextProvider = ({ children }) => {
  const addCar = async (carData) => {
    try {
      console.log("Adding car with data:", carData);
      const newCar = await carService.createCar(carData);
      toast.success("Car added successfully!");
      return newCar;
    } catch (error) {
      console.error("Failed to add car:", error.message);
      toast.error("Failed to add car. Please try again.");
      throw error;
    }
  };

  const getCars = async (params) => {
    try {
      const cars = await carService.getCars(params);
      return cars;
    } catch (error) {
      console.error("Failed to fetch my cars:", error.message);
    }
  };
  const getCarOverview = async () => {
    try {
      const overview = await carService.getCarOverview();
      return overview;
    } catch (error) {
      console.error("Failed to fetch car overview:", error.message);
      throw error;
    }
  };
  const carContextData = {
    addCar,
    getCars,
    getCarOverview,
  };

  return (
    <CarContext.Provider value={carContextData}>{children}</CarContext.Provider>
  );
};
