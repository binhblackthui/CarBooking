package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.UserRequestDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.dto.response.UserResponseDto;


import java.util.List;

public interface IUserService {
    UserResponseDto saveUser(UserRequestDto userRequestDto);

    UserResponseDto updateUser(UserRequestDto userRequestDto, Long id);

    UserResponseDto findUserById(Long id);

    PageResponse<UserResponseDto> getUsers(int page, int size);

    boolean isExistUser(UserRequestDto userRequestDto);

    DeleteResponseDto deleteUserService (Long id);
}
