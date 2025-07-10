package com.binh.carbooking.repository;

import com.binh.carbooking.entities.CarDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarDetailRepo extends JpaRepository<CarDetail,Long> {
}
