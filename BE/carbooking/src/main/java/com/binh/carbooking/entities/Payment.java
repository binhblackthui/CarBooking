package com.binh.carbooking.entities;


import com.binh.carbooking.entities.enums.EPaymentMethod;
import com.binh.carbooking.entities.enums.EPaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;
    @Column(nullable = false)
    private int total;
    @Column(name = "payment_time")
    private LocalDateTime paymentTime;
    @Enumerated(EnumType.STRING)
    private EPaymentMethod method;
    @Enumerated(EnumType.STRING)
    private EPaymentStatus status;
}
