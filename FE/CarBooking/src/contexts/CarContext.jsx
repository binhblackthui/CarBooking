import React, { createContext } from "react";
import { carService } from "../services";
import toast from "react-hot-toast";
export const CarContext = createContext();
export const CarContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [cars, setCars] = React.useState([]);
  const [carOverview, setCarOverview] = React.useState(null);
  const [numberOfCars, setNumberOfCars] = React.useState({
    totalCars: 0,
    availableCars: 0,
    notAvailableCars: 0,
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
      setCars(cars);
      return cars;
    } catch (error) {
      console.error("Failed to fetch my cars:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalCarsByStatus = async (params) => {
    setLoading(true);
    try {
      const total = await carService.totalCarsByStatus(params);
      if (params?.status === "AVAILABLE") {
        setNumberOfCars((prev) => ({
          ...prev,
          availableCars: total.availableCars,
        }));
      } else if (params?.status === "NOT_AVAILABLE") {
        setNumberOfCars((prev) => ({
          ...prev,
          notAvailableCars: total.notAvailableCars,
        }));
      } else {
        setNumberOfCars((prev) => ({
          ...prev,
          totalCars: total.totalCars,
        }));
      }

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
    carOverview,
    loading,
    numberOfCars,
    setNumberOfCars,
    totalCarsByStatus,
    setCars,
    setCarOverview,
    addCar,
    getCars,

    updateCar,
    deleteCar,
  };

  return (
    <CarContext.Provider value={carContextData}>{children}</CarContext.Provider>
  );
};
