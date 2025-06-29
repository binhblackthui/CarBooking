package com.binh.carbooking.repository;

import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.enums.ERoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
    Role findByRoleName(ERoleType rolename);
}
