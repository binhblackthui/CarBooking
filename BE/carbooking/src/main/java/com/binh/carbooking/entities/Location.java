package com.binh.carbooking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Location {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String district;
    private String city;
    private String country;

}
