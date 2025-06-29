package com.binh.carbooking.filters.userprincal;

import com.binh.carbooking.entities.Admin;
import com.binh.carbooking.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
public class UserPrinciple implements UserDetails {
    private Long id;
    private String username;
    private Collection<? extends GrantedAuthority> authorities;
    @JsonIgnore
    private String password;

    public UserPrinciple(Long id, String username, Collection<? extends GrantedAuthority> authorities,String password){
        this.id = id;
        this.username = username;
        this.authorities = authorities;
        this.password = password;
    }
    public static UserPrinciple buildUser(User user){
        List<GrantedAuthority> authorities =new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().getRoleName().name()));
        return new UserPrinciple(user.getId(), user.getEmail(),authorities,user.getPassword());
    }
    public static UserPrinciple buildAdmin(Admin admin){
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(admin.getRole().getRoleName().name()));
        return new UserPrinciple(admin.getAdminId(), admin.getAdminName(),authorities, admin.getPassword());
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){return authorities;}

    @Override
    public String getPassword(){return password;}

    @Override
    public String getUsername(){return username;}

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
