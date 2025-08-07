package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking,Long> {

    @Query(value = "SELECT * FROM booking WHERE booker_id = :userId ORDER BY created_at DESC",
            countQuery = "SELECT * FROM booking WHERE booker_id = :userId",
            nativeQuery = true)
    Page<Booking> getListBookingByUser( Pageable pageable,@Param("userId") Long customerId);

    @Query(value = "SELECT * FROM booking WHERE booker_id = :userId AND id = :bookingId",
            nativeQuery = true)
    Booking getBookingByUser(@Param("userId") Long customerId,@Param("bookingId") Long bookingId);

    @Query("SELECT COUNT(b) > 0 FROM Booking b " +
            "WHERE b.car.id = :carId " +
            "AND b.status <> 'CANCELLED' " +
            "AND b.pickupTime < :returnDate " +
            "AND b.returnTime > :pickupDate")
    boolean hasConflictingBooking(@Param("carId") Long carId,
                                  @Param("pickupDate") LocalDate pickupDate,
                                  @Param("returnDate") LocalDate returnDate);

    @Query(value = "SELECT COUNT(*) FROM booking", nativeQuery = true)
    long totalBooking();
    @Query(value = "SELECT COUNT(*) FROM booking WHERE status = 'PENDING'", nativeQuery = true)
    long totalPendingBooking();
    @Query(value = "SELECT COUNT(*) FROM booking WHERE status = 'CONFIRMED'", nativeQuery = true)
    long totalConfirmedBooking();
    @Query(value = "SELECT COUNT(*) FROM booking WHERE status = 'COMPLETED'", nativeQuery = true)
    long totalCompletedBooking();
    @Query(value = "SELECT COUNT(*) FROM booking WHERE status = 'CANCELLED'", nativeQuery = true)
    long totalCancelledBooking();
}
