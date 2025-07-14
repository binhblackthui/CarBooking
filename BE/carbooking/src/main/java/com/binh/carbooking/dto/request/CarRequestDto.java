package com.binh.carbooking.dto.request;



import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CarRequestDto {

    private Long userId;
    private Long carDetailId;
    private String licensePlate;
    private int year;
    private BigDecimal price;
    private Long location;
    private String description;
    private String features;
    List<ImageRequestDto> imageRequestDtos;
}
