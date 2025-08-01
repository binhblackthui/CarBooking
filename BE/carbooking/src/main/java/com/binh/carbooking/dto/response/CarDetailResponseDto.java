package com.binh.carbooking.dto.response;



import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDetailResponseDto {
    private Long id;
    private String brand;
    private String model;
    private String category;
    private String transmission;
    private String fuelType;
    private String color;
    private int seat;
    private long year;
}
