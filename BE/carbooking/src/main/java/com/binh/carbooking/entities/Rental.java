package com.binh.carbooking.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;

public class Rental {
    @Id
    @GeneratedValue
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

}
