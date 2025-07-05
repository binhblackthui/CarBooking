package com.binh.carbooking.services.inf;

import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.enums.ERoleType;

public interface IRoleService {
    Role saveRole(Role role);
    boolean isExistRole(ERoleType roleType);
}
