package com.binh.carbooking.dto.request;



import com.binh.carbooking.entities.enums.EBookingStatus;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDto {
    @NotNull(message = "userId is required")
    private Long userId;

    @NotNull(message = "carId is required")
    private Long carId;

    @NotNull(message = "pickupLocationId is required")
    private Long pickupLocationId;

    @NotNull(message = "returnLocationId is required")
    private Long returnLocationId;

    @NotNull(message = "pickupTime is required")
    private LocalDate pickupTime;

    @NotNull(message = "returnTime is required")
    private LocalDate returnTime;

    @NotNull(message = "customerName is required")
    private String customerName;

    @NotNull(message = "phone is required")
    private String phone;
    @NotNull(message = "status is required")
    private EBookingStatus status;
}


