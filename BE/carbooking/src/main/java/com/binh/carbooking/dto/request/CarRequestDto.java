package com.binh.carbooking.dto.request;


import com.binh.carbooking.entities.enums.EModerationStatus;
import com.binh.carbooking.entities.enums.ERentalStatus;
import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;

@Getter
@Setter
public class CarRequestDto {
    private String licensePlate;
    private Long userId;
    private Long carId;
    private int year;
    private BigDecimal price;
    private LocationRequestDto location;
    private EModerationStatus moderation;
    private ERentalStatus status;
}
