package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.ECensorshipStatus;
import com.binh.carbooking.entities.enums.ECarStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    Long id;


    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    @OneToOne
    @JoinColumn(name = "car_detail_id",referencedColumnName = "id")
    private CarDetail carDetail;

    @Column(name = "license_plate", nullable = false,unique = true)
    private String licensePlate;
    @Column(nullable = false)
    private int year;
    @Column(nullable = false)
    private BigDecimal price;
    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;
    @Enumerated(EnumType.STRING)
    private ECensorshipStatus censorshipStatus;
    @Enumerated(EnumType.STRING)
    private ECarStatus status;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    private String description;
    private String features;
    @OneToMany(mappedBy = "car",fetch = FetchType.EAGER)
    private List<Image> images;
}
