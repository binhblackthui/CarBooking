package com.binh.carbooking.entities;

import jakarta.persistence.*;

@Entity
public class Comment {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "licensePlate")
    private Rental rental;

    private int start;
    private String feedback;
}
