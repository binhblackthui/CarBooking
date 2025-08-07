package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.PaymentRequestDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.entities.Payment;

public interface IPaymentService {
    PaymentResponseDto updatePaymentByBooking(Long bookingId,PaymentRequestDto paymentRequestDto);
}
