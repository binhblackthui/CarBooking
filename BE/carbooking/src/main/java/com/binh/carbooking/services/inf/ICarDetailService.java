package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.response.CarDetailResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;

import java.util.List;

public interface ICarDetailService {
    CarDetailResponseDto saveCarDetail(CarDetailRequestDto carDetailRequestDto);
    CarDetailResponseDto getCarDetailById(Long id);
    List<CarDetailResponseDto> getListCarDetail();
    CarDetailResponseDto updateCarDetail(Long id, CarDetailRequestDto carDetailRequestDto);
    DeleteResponseDto deleteCarDetail(Long id);
}
