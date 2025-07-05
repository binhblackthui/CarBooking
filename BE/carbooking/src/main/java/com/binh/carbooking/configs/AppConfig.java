package com.binh.carbooking.configs;


import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.enums.ERoleType;
import com.binh.carbooking.services.impl.RoleService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootConfiguration
@RequiredArgsConstructor
public class AppConfig {
    private final RoleService roleService;

    @Bean
    public ModelMapper modelMapper(){return new ModelMapper();}

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner run() {
        return args -> {
            for (ERoleType roleType : ERoleType.values()) {
                if (!roleService.isExistRole(roleType)) {
                    Role role = new Role();
                    role.setRoleName(roleType);
                    roleService.saveRole(role);
                }
            }
        };
    }
}
