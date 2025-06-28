package com.binh.carbooking.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Setter
@Getter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long ImageId;
    @ManyToOne
    @JoinColumn(name = "license_plate", referencedColumnName = "license_plate")
    private Rental rental;
    @Column(name = "image_url", nullable = false)
    private String imageURL;

}
