package com.binh.carbooking.repository;



import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.entities.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface CarRepo extends JpaRepository<Car,Long> {
    Car findCarByLicensePlate(String licensePlate);
    @Query(value = "SELECT * FROM car WHERE status = 'AVAILABLE' ORDER BY created_at DESC",
            countQuery = "SELECT count(*) FROM car WHERE status = 'AVAILABLE'",
            nativeQuery = true)
    Page<Car> findCarByStatus(Pageable pageable);


    @Query(value = "SELECT COUNT(*) FROM car ", nativeQuery = true)
    long totalCars();
    @Query(value = "SELECT COUNT(*) FROM car WHERE status = 'NOT_AVAILABLE'  ", nativeQuery = true)
    long totalNotAvailableCars();
    @Query(value = "SELECT COUNT(*) FROM car WHERE status = 'AVAILABLE' ", nativeQuery = true)
    long totalAvailableCars();










}
