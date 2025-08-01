package com.binh.carbooking.dto.request;

import com.binh.carbooking.entities.enums.EPaymentMethod;
import com.binh.carbooking.entities.enums.EPaymentStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequestDto {
    private EPaymentStatus paymentStatus;
    private EPaymentMethod paymentMethod;
}
