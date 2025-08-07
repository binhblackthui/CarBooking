package com.binh.carbooking.repository;



import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.entities.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CarRepo extends JpaRepository<Car,Long> {
    Car findCarByLicensePlate(String licensePlate);



    @Query(value = "SELECT * " +
            "FROM car c " +
            "WHERE c.status = :status " +
            "AND (:location IS NULL OR c.location_id = :location)" +
            "AND NOT EXISTS ( " +
            "SELECT 1 FROM booking b " +
            "WHERE b.car_id = c.id " +
            "AND b.status <> 'CANCELLED' " +
            "AND b.pickup_time < :returnDate " +
            "AND b.return_time > :pickupDate " +
            ") " +
            "ORDER BY c.created_at DESC",
            countQuery = "SELECT * " +
                    "FROM car c " +
                    "WHERE c.status = :status " +
                    "AND (:location IS NULL OR c.location_id = :location)" +
                    "AND NOT EXISTS ( " +
                    "SELECT 1 FROM booking b " +
                    "WHERE b.car_id = c.id " +
                    "AND b.status <> 'CANCELLED' " +
                    "AND b.pickup_time < :returnDate " +
                    "AND b.return_time > :pickupDate " +
                    ") ",
            nativeQuery = true)
    Page<Car> searchCars(Pageable pageable,
                         @Param("status") String status,
                         @Param("location") Long location,
                         @Param("pickupDate") LocalDate pickupDate,
                         @Param("returnDate") LocalDate returnDate);

    @Query(value = "SELECT COUNT(*) FROM car ", nativeQuery = true)
    long totalCars();
    @Query(value = "SELECT COUNT(*) FROM car WHERE status = 'NOT_AVAILABLE'  ", nativeQuery = true)
    long totalNotAvailableCars();
    @Query(value = "SELECT COUNT(*) FROM car WHERE status = 'AVAILABLE' ", nativeQuery = true)
    long totalAvailableCars();










}
