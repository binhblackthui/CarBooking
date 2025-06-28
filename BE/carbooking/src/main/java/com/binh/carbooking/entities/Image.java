package com.binh.carbooking.entities;

import jakarta.persistence.*;

public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long ImangeId;

    @ManyToOne
    @JoinColumn(name ="license_plate")
    private Rental rental;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageURL;

}
