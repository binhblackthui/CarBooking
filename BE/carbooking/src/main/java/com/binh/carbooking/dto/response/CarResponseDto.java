package com.binh.carbooking.dto.response;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.entities.enums.ECarStatus;
import lombok.*;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarResponseDto {
    private Long id;
    private CarDetailResponseDto carDetail;
    private String licensePlate;
    private BigDecimal pricePerDay;
    private LocationResponseDto location;
    private ECarStatus status;
    private LocalDateTime createdAt;
    private String description;
    private String features;
    private ImageRequestDto image;
    private List<CommentResponseDto> comments = new ArrayList<>();
}
