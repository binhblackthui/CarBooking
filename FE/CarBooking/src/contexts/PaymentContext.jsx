import React, { createContext } from "react";
import { paymentService } from "../services/paymentService.js";
import toast from "react-hot-toast";
export const PaymentContext = createContext();
export const PaymentContextProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const getPaymentById = async (paymentId) => {
    setLoading(true);
    try {
      const payment = await paymentService.getPaymentById(paymentId);
      return payment;
    } catch (error) {
      console.error("Failed to fetch payment by ID:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const updatePayment = async (paymentId, paymentData) => {
    setLoading(true);
    try {
      const updatedPayment = await paymentService.updatePayment(
        paymentId,
        paymentData
      );
      toast.success("Successfully!");
      return updatedPayment;
    } catch (error) {
      console.error("Failed to update payment:", error.message);
      toast.error("Failed!!!. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const paymentContextData = {
    getPaymentById,
    updatePayment,
    loading,
    setLoading,
  };
  return (
    <PaymentContext.Provider value={paymentContextData}>
      {children}
    </PaymentContext.Provider>
  );
};
