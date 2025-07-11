package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.response.CarDetailResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;

import java.util.List;

public interface ICarDetailService {
    CarDetailResponseDto saveCarDetail(CarDetailRequestDto carDetailRequestDto);
    CarDetailResponseDto getCarDetailById(Long id);
    List<CarDetailResponseDto> getListCarDetail(int page,int size);
    List<CarDetailResponseDto> getCarDetail(CarDetailRequestDto carDetailRequestDto);
    DeleteResponseDto deleteCarDetail(Long id);
}
