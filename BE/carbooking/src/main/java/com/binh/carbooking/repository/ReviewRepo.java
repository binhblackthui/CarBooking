package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.entities.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Long> {

    @Query(value = "SELECT * FROM review WHERE car_id = :carId ORDER BY created_at DESC",
            countQuery = "SELECT * FROM review WHERE car_id = :carId",
            nativeQuery = true)
    Page<Review> getReviewsByCar(Pageable pageable, @Param("carId") Long carId);
}
