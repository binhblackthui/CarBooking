package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.UserRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.UserResponseDto;
import com.binh.carbooking.entities.Role;
import com.binh.carbooking.entities.User;
import com.binh.carbooking.entities.enums.ERoleType;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.exceptions.ValidationException;
import com.binh.carbooking.repository.RoleRepo;
import com.binh.carbooking.repository.UserRepo;
import com.binh.carbooking.services.inf.IUserService;
import com.binh.carbooking.utils.EmailUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {

    private final ModelMapper modelMaper;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final UserRepo userRepo;
    @Override
    public UserResponseDto saveUser(UserRequestDto userRequestDto){
        String email = userRequestDto.getEmail();
        if(EmailUtils.isValidEmail((email))){
            if(isExistUser(userRequestDto)){
                throw new DuplicateValueInResourceException("email was existed");
            }
            else{
                User user = modelMaper.map(userRequestDto,User.class);
                user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
                Role role = roleRepo.findByRoleName(ERoleType.ROLE_USER);
                user.setRole(role);
                user.setCreateAt(LocalDateTime.now());
                return modelMaper.map(userRepo.save(user),UserResponseDto.class);
            }

        }
        else
            throw new ValidationException("email notrt valid");
    }
    @Override
    public UserResponseDto updateUser(UserRequestDto userRequestDto, Long id){
        try{
           userRepo.findById(id).ifPresent( user ->{
               modelMaper.map(userRequestDto,user);
               user.setPassword(passwordEncoder.encode(userRequestDto.getPassword()));
               userRepo.save(user);
           });
           return modelMaper.map(userRequestDto,UserResponseDto.class);
        } catch (Exception ex){
            throw new ResourceFoundException("update fail");
        }
    }
    @Override
    public UserResponseDto findUserById(Long id){
        User user = userRepo.findById(id)
                .orElseThrow(()-> new ResourceFoundException("user not found"));
        return modelMaper.map(user,UserResponseDto.class);
    }
    @Override
    public List<UserResponseDto> findListUser(int page, int size){
        return null;
    }
    @Override
    public boolean isExistUser(UserRequestDto userRequestDto){
        if(userRepo.findByEmail(userRequestDto.getEmail()) != null)
            return true;
        else
            return false;
    }
    @Override
    public DeleteResponseDto deleteUserService (Long id){
        try{
            userRepo.deleteById(id);
            return new DeleteResponseDto("delete success", HttpStatus.OK);
        } catch (Exception e) {
            return new DeleteResponseDto("delete fail",HttpStatus.BAD_REQUEST);
        }
    }
}
