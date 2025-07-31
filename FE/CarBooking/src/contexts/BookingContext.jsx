import React, { createContext } from "react";
import { bookingService } from "../services";
export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const getBookings = async (params) => {
    try {
      const bookings = await bookingService.getBookings(params);
      return bookings;
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
      throw error;
    }
  };
  const getBookingOverview = async () => {
    try {
      const res = await bookingService.getBookingOverview();
      return res;
    } catch (error) {
      console.error("Failed to fetch booking overview:", error.message);
      throw error;
    }
  };
  const bookingContextData = {
    getBookings,
    getBookingOverview,
  };
  return (
    <BookingContext.Provider value={bookingContextData}>
      {children}
    </BookingContext.Provider>
  );
};
