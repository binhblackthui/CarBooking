package com.binh.carbooking.filters.userprincal;

import com.binh.carbooking.entities.Admin;
import com.binh.carbooking.entities.User;
import com.binh.carbooking.repository.AdminRepo;
import com.binh.carbooking.repository.UserRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {
    private final UserRepo userRepo;
    private final AdminRepo adminRepo;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);
        if(user != null)
            return UserPrinciple.buildUser(user);
        Admin admin = adminRepo.findByAdminName(username);
        if(admin != null)
            return UserPrinciple.buildAdmin(admin);
        throw new RuntimeException();
    }
}
