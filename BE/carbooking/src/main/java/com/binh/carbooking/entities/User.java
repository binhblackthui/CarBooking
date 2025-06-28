package com.binh.carbooking.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue()
    private Long id;

    private String username;
    private String email;
    private String password;
    private String phone;
    private String role;

    private LocalDateTime createAt;
}
