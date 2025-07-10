package com.binh.carbooking.dto.request;



import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CarRequestDto {
    private String licensePlate;
    private Long userId;
    private Long carId;
    private int year;
    private BigDecimal price;
    private Long location;
    List<ImageRequestDto> imageRequestDtos;
}
