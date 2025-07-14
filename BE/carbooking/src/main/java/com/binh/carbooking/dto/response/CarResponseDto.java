package com.binh.carbooking.dto.response;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.entities.enums.ECensorshipStatus;
import com.binh.carbooking.entities.enums.ECarStatus;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarResponseDto {
    private Long id;
    private Long userId;
    private CarDetailRequestDto car;
    private String licensePlate;
    private int year;
    private BigDecimal price;
    private LocationResponseDto location;
    private ECensorshipStatus censorshipStatus;
    private ECarStatus status;
    private LocalDateTime createdAt;
    private String description;
    private String features;
    private List<ImageRequestDto> images;
}
