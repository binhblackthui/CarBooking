import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const paymentService = {
  getPaymentById: async (paymentId) => {
    try {
        const response = await api.get(API_ENDPOINTS.PAYMENT.GET_PAYMENT_BY_ID(paymentId));
        return response.data;
    } catch (error) {
        console.error("Error fetching payment by ID:", error);
        throw error;
    }
    },
    updatePayment: async (paymentId, paymentData) => {
    try {
        const response = await api.put(API_ENDPOINTS.PAYMENT.UPDATE_PAYMENT(paymentId), paymentData);
        return response.data;
    } catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
    }
}