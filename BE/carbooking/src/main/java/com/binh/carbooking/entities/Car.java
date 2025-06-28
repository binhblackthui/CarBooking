package com.binh.carbooking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCar;

    private String brand;
    private String model;
    private String category;
    private String transmission;
    private String fuelType;
}
