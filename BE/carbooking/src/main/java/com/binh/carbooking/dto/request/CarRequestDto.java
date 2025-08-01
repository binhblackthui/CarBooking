package com.binh.carbooking.dto.request;



import com.binh.carbooking.entities.enums.ECarStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarRequestDto {

    private Long carDetailId;
    private String licensePlate;
    private BigDecimal pricePerDay;
    private Long locationId;
    private String description;
    private String features;
    private ECarStatus status;
    ImageRequestDto image;
}
