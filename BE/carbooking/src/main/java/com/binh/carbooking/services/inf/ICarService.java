package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import org.hibernate.type.descriptor.java.ObjectJavaType;

import java.util.List;

public interface ICarService {
    List<CarResponseDto> getCars( int page, int size);
    List<CarResponseDto> getAvailableCars( int page, int size);
    CarResponseDto saveCar(CarRequestDto carRequestDto);
    boolean isExistCar(String licensePlate);
    CarResponseDto getCarById(Long id);
    CarResponseDto updateCar(Long id, CarRequestDto carRequestDto);
    DeleteResponseDto deleteCar(Long id);
    Object getCarOverview();
}
