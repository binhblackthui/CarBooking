package com.binh.carbooking.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long idCar;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    private String category;
    private String transmission;
    @Column(name ="fuel_type")
    private String fuelType;
}
