package com.binh.carbooking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CarDetailRequestDto {
    @NotBlank(message = "brand is require")
    private String brand;
    @NotBlank(message = "model is require")
    private String model;
    @NotBlank(message = "category is require")
    private String category;
    @NotBlank(message = "transmission is require")
    private String transmission;
    @NotBlank(message = "fuel type is require")
    private String fuelType;
}
