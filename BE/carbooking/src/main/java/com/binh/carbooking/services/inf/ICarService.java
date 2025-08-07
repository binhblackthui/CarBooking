package com.binh.carbooking.services.inf;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import org.hibernate.type.descriptor.java.ObjectJavaType;

import java.time.LocalDate;
import java.util.List;

public interface ICarService {
    PageResponse<CarResponseDto> getCars(int page, int size);

    CarResponseDto saveCar(CarRequestDto carRequestDto);
    boolean isExistCar(String licensePlate);
    CarResponseDto getCarById(Long id);
    CarResponseDto updateCar(Long id, CarRequestDto carRequestDto);
    DeleteResponseDto deleteCar(Long id);
    Object totalCarsByStatus(String status);
    PageResponse<CarResponseDto> searchCars(int page, int size, String status, Long location, LocalDate pickupDate, LocalDate returnDate);
}
