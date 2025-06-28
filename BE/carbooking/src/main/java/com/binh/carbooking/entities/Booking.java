package com.binh.carbooking.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idBooking;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "license_plate")
    private  Rental licensePlate;

    @ManyToOne
    @JoinColumn(name = "pickup_location")
    private Location pickupLocation;

    @ManyToOne
    @JoinColumn(name = "return_location")
    private Location returnLocation;

    private LocalDateTime pickupTime;
    private LocalDateTime returnTime;

    private String status;
    private LocalDateTime createdAt;
}
