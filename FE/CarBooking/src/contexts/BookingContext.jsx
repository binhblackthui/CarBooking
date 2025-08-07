import React, { createContext } from "react";
import { bookingService } from "../services";
import { userService } from "../services";
import toast from "react-hot-toast";
export const BookingContext = createContext();
export const BookingContextProvider = ({ children }) => {
  const [bookings, setBookings] = React.useState({
    data: [],
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    size: import.meta.env.VITE_SIZE_PAGE,
  });
  const [loading, setLoading] = React.useState(true);

  const [numberOfBookings, setNumberOfBookings] = React.useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    completedBookings: 0,
  });

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      console.log("Creating booking with data:", bookingData);
      const newBooking = await bookingService.createBooking(bookingData);
      setBookings((prev) => ({
        ...prev,
        data: [...prev.data, newBooking],
      }));
      toast.success("Booking created successfully!");
      return newBooking;
    } catch (error) {
      console.error("Failed to create booking:", error.message);
      toast.error("Failed! Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getBookings = async (params) => {
    setLoading(true);
    try {
      const bookings = await bookingService.getBookings(params);
      console.log("Bookings fetched:", bookings);
      setBookings(bookings);
      return bookings;
    } catch (error) {
      console.error("Failed to fetch bookings:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getBookingById = async (bookingId) => {
    setLoading(true);
    try {
      const booking = await bookingService.getBookingById(bookingId);
      return booking;
    } catch (error) {
      console.error("Failed to fetch booking by ID:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const totalBookingsByStatus = async (params) => {
    setLoading(true);
    try {
      const total = await bookingService.totalBookingsByStatus(params);
      setNumberOfBookings((prev) => ({
        ...prev,
        totalBookings: total.totalBookings ?? prev.totalBookings,
        pendingBookings: total.pendingBookings ?? prev.pendingBookings,
        confirmedBookings: total.confirmedBookings ?? prev.confirmedBookings,
        cancelledBookings: total.cancelledBookings ?? prev.cancelledBookings,
        completedBookings: total.completedBookings ?? prev.completedBookings,
      }));
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

  const getBookingByUser = async (userId, bookingId) => {
    setLoading(true);
    try {
      const booking = await userService.getBookingByUser(userId, bookingId);
      return booking;
    } catch (error) {
      console.error("Failed to fetch booking by user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const updateBooking = async (bookingId, bookingData) => {
    setLoading(true);
    try {
      const updatedBooking = await bookingService.updateBooking(
        bookingId,
        bookingData
      );
      console.log("Booking updated successfully:", updatedBooking);
      setBookings((prev) => ({
        ...prev,
        data: prev.data.map((booking) =>
          booking.id === bookingId ? updatedBooking : booking
        ),
      }));
      toast.success("Booking updated successfully!");
      return updatedBooking;
    } catch (error) {
      toast.error("Failed to update booking. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentByBooking = async (bookingId, paymentData) => {
    setLoading(true);
    try {
      const updatedPayment = await bookingService.updatePaymentByBooking(
        bookingId,
        paymentData
      );
      setBookings((prev) => ({
        ...prev,
        data: prev.data.map((booking) =>
          booking.id === bookingId
            ? { ...booking, payment: updatedPayment }
            : booking
        ),
      }));
      toast.success("Payment updated successfully!");
      return updatedPayment;
    } catch (error) {
      console.error("Failed to update payment by booking:", error.message);
      toast.error("Failed to update payment. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (bookingId, reviewData) => {
    setLoading(true);
    try {
      const newReview = await bookingService.createReview(
        bookingId,
        reviewData
      );
      toast.success("Review created successfully!");
      return newReview;
    } catch (error) {
      console.error("Failed to create review:", error.message);
      toast.error("Failed to create review. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const bookingContextData = {
    bookings,

    loading,
    numberOfBookings,
    createBooking,
    totalBookingsByStatus,
    getBookings,
    getMyBookings,
    getBookingByUser,
    setBookings,
    getBookingById,
    setLoading,
    updateBooking,
    updatePaymentByBooking,
    createReview,
  };
  return (
    <BookingContext.Provider value={bookingContextData}>
      {children}
    </BookingContext.Provider>
  );
};
