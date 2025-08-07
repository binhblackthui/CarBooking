package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.entities.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payment,Long> {
    @Query(value = "SELECT * FROM payment WHERE booking_id = :bookingId",
            countQuery = "SELECT * FROM payment WHERE booking_id = :bookingId",
            nativeQuery = true)
    Payment getPaymentByBooking( @Param("bookingId") Long bookingId);

}
