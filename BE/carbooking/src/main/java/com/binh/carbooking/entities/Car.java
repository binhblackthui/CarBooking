package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.ECarStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @JoinColumn(name = "car_detail_id",referencedColumnName = "id")
    private CarDetail carDetail;
    @Column(name = "license_plate", nullable = false,unique = true)
    private String licensePlate;
    @Column(nullable = false)
    private BigDecimal pricePerDay;
    @ManyToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private Location location;
    @Enumerated(EnumType.STRING)
    private ECarStatus status;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(length = 1000)
    private String description;
    private String features;
    @OneToOne(mappedBy = "car",fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    private Image images;
    @OneToMany(mappedBy = "car",fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
