package com.binh.carbooking.dto.response;

import com.binh.carbooking.entities.enums.EPaymentMethod;
import com.binh.carbooking.entities.enums.EPaymentStatus;

import java.time.LocalDateTime;

public class PaymentResponseDto {
    private Long id;
    private Long userId;
    private int total;
    private LocalDateTime paymentTime;
    private EPaymentMethod paymentMethod;
    private EPaymentStatus paymentStatus;
}
