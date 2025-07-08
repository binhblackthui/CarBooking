package com.binh.carbooking.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationRequestDto {
    @NotBlank(message = "district is require")
    private String district;

    @NotBlank(message = "city is require")
    private String city;

    @NotBlank(message = "country is require")
    private String country;
}
