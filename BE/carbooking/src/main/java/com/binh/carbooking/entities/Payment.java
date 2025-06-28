package com.binh.carbooking.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_booking")
    private Booking booking;
    private int total;
    private LocalDateTime paymentTime;
    private String method;
    private String status;

}
