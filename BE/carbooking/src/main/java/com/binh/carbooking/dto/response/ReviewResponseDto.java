package com.binh.carbooking.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class ReviewResponseDto {
    Long id;
    Long bookingId;
    Long carId;
    int stars;
    String comment;
    LocalDateTime createdAt;
    UserResponseDto user;
}
