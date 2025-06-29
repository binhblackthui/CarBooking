package com.binh.carbooking.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne // Thay @OneToOne để đảm bảo tính linh hoạt
    @JoinColumn(name = "booking_id", referencedColumnName = "id", nullable = false)
    private Booking booking; // Thêm mối quan hệ đến Booking

    @Column(name = "star", nullable = false)
    private int star; // Sửa lỗi chính tả từ "start" thành "star"

    @Column(nullable = false)
    private String feedback;
}