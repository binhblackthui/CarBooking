package com.binh.carbooking.entities;

import com.binh.carbooking.entities.enums.ERoleType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false)
    private Long roleId;
    @Column(name = "role_name", unique = true)
    @Enumerated(EnumType.STRING)
    private ERoleType roleName;
}
