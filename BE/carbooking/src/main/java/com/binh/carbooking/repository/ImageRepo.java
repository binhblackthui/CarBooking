package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepo extends JpaRepository<Image,Long> {
}
