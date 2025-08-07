package com.binh.carbooking.dto.response;

import com.binh.carbooking.entities.enums.EPaymentStatus;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentResponseDto {
    private Long id;
    private Long bookingId;
    private BigDecimal total;
    private LocalDateTime paymentTime;
    private EPaymentStatus paymentStatus;
}
