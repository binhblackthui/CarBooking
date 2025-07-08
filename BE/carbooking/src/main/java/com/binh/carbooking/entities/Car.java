package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.EModerationStatus;
import com.binh.carbooking.entities.enums.ERentalStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Setter
@Getter
public class Car {
    @Id
    @Column(name = "license_plate", nullable = false)
    private String licensePlate;

    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @OneToOne
    @JoinColumn(name = "car_id",referencedColumnName = "id")
    private CarDetail carDetail;

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
    @Column(name = "create_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "car")
    private List<Image> images;
    @OneToMany(mappedBy = "car")
    private List<Comment> comments;
}
