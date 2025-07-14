package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Booking;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking,Long> {

    @Query(value = "SELECT * FROM booking WHERE booker_id = :userId ORDER BY created_at DESC", nativeQuery = true)
    List<Booking> getListBookingByUser(@Param("userId") Long customerId, Pageable pageable);
}
