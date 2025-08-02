import React, { createContext } from "react";
import { bookingService } from "../services";
import { userService } from "../services";
export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = React.useState([]);
  const [bookingOverview, setBookingOverview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [numberOfBookings, setNumberOfBookings] = React.useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    completedBookings: 0,
  });
  const getBookings = async (params) => {
    setLoading(true);
    try {
      const bookings = await bookingService.getBookings(params);
      setBookings(bookings);
      return bookings;
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const totalBookingsByStatus = async (params) => {
    setLoading(true);
    try {
      const total = await bookingService.totalBookingsByStatus(params);
      if (params?.status === "PENDING") {
        setNumberOfBookings((prev) => ({
          ...prev,
          pendingBookings: total.pendingBookings,
        }));
      } else if (params?.status === "CONFIRMED") {
        setNumberOfBookings((prev) => ({
          ...prev,
          confirmedBookings: total.confirmedBookings,
        }));
      } else if (params?.status === "CANCELLED") {
        setNumberOfBookings((prev) => ({
          ...prev,
          cancelledBookings: total.cancelledBookings,
        }));
      } else if (params?.status === "COMPLETED") {
        setNumberOfBookings((prev) => ({
          ...prev,
          completedBookings: total.completedBookings,
        }));
      } else {
        setNumberOfBookings((prev) => ({
          ...prev,
          totalBookings: total.totalBookings,
        }));
      }
      console.log("Total bookings fetched:", total);
    } catch (error) {
      console.error("Failed to fetch total bookings by status:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getMyBookings = async (userId, params) => {
    setLoading(true);
    try {
      const bookings = await userService.getBookingsByUserId(userId, params);
      setBookings(bookings);
      return bookings;
    } catch (error) {
      console.error("Failed to fetch bookings by user ID:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const updateBooking = async (bookingId, bookingData) => {
    setLoading(true);
    console.log(
      "Updating booking with ID:",
      bookingId,
      "and data:",
      bookingData
    );
    try {
      const updatedBooking = await bookingService.updateBooking(
        bookingId,
        bookingData
      );
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? updatedBooking : booking
        )
      );
      return updatedBooking;
    } catch (error) {
      console.error("Failed to update booking:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const bookingContextData = {
    bookings,
    bookingOverview,
    loading,
    numberOfBookings,
    totalBookingsByStatus,
    getBookings,
    getMyBookings,
    setBookings,
    setBookingOverview,
    setLoading,
    updateBooking,
  };
  return (
    <BookingContext.Provider value={bookingContextData}>
      {children}
    </BookingContext.Provider>
  );
};
