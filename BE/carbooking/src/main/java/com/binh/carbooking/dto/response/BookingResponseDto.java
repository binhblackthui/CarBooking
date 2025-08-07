package com.binh.carbooking.dto.response;

import com.binh.carbooking.entities.enums.EBookingStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class BookingResponseDto {
    private Long id;
    private Long userId;
    private CarResponseDto car;
    private LocationResponseDto pickupLocation;
    private LocationResponseDto returnLocation;
    private LocalDate pickupTime;
    private LocalDate returnTime;
    private String customerName;
    private String phone;
    private EBookingStatus status;
    private LocalDateTime createdAt;
    private PaymentResponseDto payment;
    private ReviewResponseDto review;
}
