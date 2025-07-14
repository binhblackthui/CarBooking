package com.binh.carbooking.repository;


import com.binh.carbooking.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface CarRepo extends JpaRepository<Car,Long> {
    Car findCarByLicensePlate(String licensePlate);
    @Query(value = "SELECT * FROM car WHERE user_id = :userId ORDER BY created_at DESC", nativeQuery = true)
    List<Car> getListCarByUser(@Param("userId") Long customerId, Pageable pageable);

}
