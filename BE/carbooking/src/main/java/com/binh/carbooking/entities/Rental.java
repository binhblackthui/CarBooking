package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.EModerationStatus;
import com.binh.carbooking.entities.enums.ERentalStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Setter
@Getter
public class Rental {
    @Id
    @Column(name = "license_plate", nullable = false)
    private String licensePlate;

    @ManyToOne
    @JoinColumn(name = "id_user",referencedColumnName = "id")
    private User user;

    @OneToOne
    @JoinColumn(name = "id_car",referencedColumnName = "id")
    private Car car;

    @Column(nullable = false)
    private int year;
    @Column(nullable = false)
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;
    @Enumerated(EnumType.STRING)
    private EModerationStatus moderation;
    @Enumerated(EnumType.STRING)
    private ERentalStatus status;
    @OneToMany(mappedBy = "rental")
    private List<Image> images;
    @OneToMany(mappedBy = "rental")
    private List<Comment> comments;
    @OneToMany(mappedBy = "rental")
    private List<Booking> bookings; // Thêm mối quan hệ ngược với Booking
}
