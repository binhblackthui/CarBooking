package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.EBookingStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Setter
@Getter
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "booker_id",referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "license_plate", referencedColumnName = "license_plate")
    private  Rental rental;

    @ManyToOne
    @JoinColumn(name = "pickup_location_id", referencedColumnName = "id")
    private Location pickupLocation;

    @ManyToOne
    @JoinColumn(name = "return_location_id", referencedColumnName = "id")
    private Location returnLocation;
    @Column(name = "pickup_time")
    private LocalDateTime pickupTime;
    @Column(name = "return_time")
    private LocalDateTime returnTime;
    @Enumerated(EnumType.STRING)
    private EBookingStatus status;
    @Column(name = "create_at")
    private LocalDateTime createdAt;
}
