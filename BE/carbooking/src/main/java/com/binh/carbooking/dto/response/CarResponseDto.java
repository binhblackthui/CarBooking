package com.binh.carbooking.dto.response;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.entities.*;
import com.binh.carbooking.entities.enums.EModerationStatus;
import com.binh.carbooking.entities.enums.ERentalStatus;
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
    private String licensePlate;
    private UserResponseDto user;
    private CarDetailRequestDto car;
    private int year;
    private BigDecimal price;
    private Location location;
    private EModerationStatus moderation;
    private ERentalStatus status;
    private LocalDateTime createdAt;
    private List<ImageRequestDto> images;
    private int start;
    List<CommentResponseDto> comments;
}
