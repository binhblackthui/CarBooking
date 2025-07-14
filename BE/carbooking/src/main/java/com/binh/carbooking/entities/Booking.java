package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.EBookingStatus;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
@Setter
@Getter
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "booker_id",referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @ManyToOne
    @JoinColumn(name = "pickup_location_id", referencedColumnName = "id")
    private Location pickupLocation;

    @ManyToOne
    @JoinColumn(name = "return_location_id", referencedColumnName = "id")
    private Location returnLocation;
    @Column(name = "pickup_time")
    private LocalDate pickupTime;
    @Column(name = "return_time")
    private LocalDate returnTime;
    @Enumerated(EnumType.STRING)
    private EBookingStatus status;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "booking")
    private Payment payment;
}
