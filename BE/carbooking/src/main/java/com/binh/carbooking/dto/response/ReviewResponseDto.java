package com.binh.carbooking.dto.response;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ReviewResponseDto {
    Long id;
    Long bookingId;
    Long carId;
    int start;
    String feedback;
    LocalDateTime createdAt;
    UserResponseDto user;
}
