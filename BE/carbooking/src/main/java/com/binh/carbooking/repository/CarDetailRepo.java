package com.binh.carbooking.repository;

import com.binh.carbooking.entities.CarDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarDetailRepo extends JpaRepository<CarDetail,Long> {
}
