package com.binh.carbooking.dto.response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationResponseDto {
    private Long id;
    private String district;
    private String city;
    private String country;
}
