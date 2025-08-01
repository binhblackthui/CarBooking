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
    @OneToOne
    @JoinColumn(name = "id_car", referencedColumnName = "id")
    private Car car;
    @Column(name = "image_url", nullable = false,columnDefinition = "LONGTEXT")
    private String imageURL;

}
