package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin,Long> {
    Admin findByAdminName(String name);
}
