package com.binh.carbooking.dto.request;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class BookingRequestDto {
    private Long userId;
    private Long carId;
    private Long pickupLocationId;
    private Long returnLocationId;
    private LocalDate pickupTime;
    private LocalDate returnTime;
}


