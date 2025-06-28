package com.binh.carbooking.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue()
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "fullname", length = 100)
    private String username;
    private String fullName;
    @Email
    @Column(name = "email", length = 50, unique = true)
    private String email;
    private String password;
    @Column(name = "phone", length = 20, unique = true)
    private String phone;
    private String role;
    private LocalDateTime createAt;
}
