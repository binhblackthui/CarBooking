package com.binh.carbooking.services.impl;

import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.enums.ERoleType;
import com.binh.carbooking.repository.RoleRepo;
import com.binh.carbooking.services.inf.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final RoleRepo roleRepo;

    @Override
    public Role saveRole(Role role){return roleRepo.save(role);}

    @Override
    public boolean isExistRole(ERoleType roleType){
        if(roleRepo.findByRoleName(roleType)!=null){
            return true;
        }
        return false;
    }

}
