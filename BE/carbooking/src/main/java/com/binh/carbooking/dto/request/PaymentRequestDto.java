package com.binh.carbooking.dto.request;

import com.binh.carbooking.entities.enums.EPaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDto {
    private EPaymentStatus paymentStatus;
}
