package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;

import java.util.List;

public interface ICarService {
    List<CarResponseDto> getListCarByUser(Long id, int page, int size);
    CarResponseDto saveCar(CarRequestDto carRequestDto);
    boolean isExistCar(String licensePlate);
    CarResponseDto getCarById(Long id);
    List<CarResponseDto> getListCar(int page, int size);
    CarResponseDto updateCar(Long id, CarRequestDto carRequestDto);
    DeleteResponseDto deleteCar(Long id);
}
