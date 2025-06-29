package com.binh.carbooking.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(length = 100, nullable = false)
    private String fullName;
    @Email
    @Column(name = "email", length = 50, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(name = "phone", length = 20, unique = true)
    private String phone;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", referencedColumnName = "role_id")
    private Role role;

    @Column(name = "created_at")
    private LocalDateTime createAt;

    @OneToMany(mappedBy = "user") // Sửa lại để ánh xạ ngược với Rental
    private List<Rental> rentals;

    @OneToMany(mappedBy = "user") // Sửa lại để ánh xạ ngược với Booking
    private List<Booking> bookings;
}
