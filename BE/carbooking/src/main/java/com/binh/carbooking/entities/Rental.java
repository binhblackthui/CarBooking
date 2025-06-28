package com.binh.carbooking.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

public class Rental {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private String licensePlate;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_car")
    private Car car;


    private int year;
    private BigDecimal price;
    private String location;
    private String status;
    private String status_accept;

}
