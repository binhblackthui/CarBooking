package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.response.CarResponseDto;

import java.util.List;

public interface ICarService {
    List<CarResponseDto> getListCarByUser(Long id, int page, int size);
}
