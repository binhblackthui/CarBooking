package com.binh.carbooking.mappers;



import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarDetailResponseDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.ReviewResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.entities.*;

import com.binh.carbooking.repository.CarDetailRepo;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CarMapper {
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;
    private final LocationRepo locationRepo;
    private final CarDetailRepo carDetailRepo;
    public CarResponseDto mapEntityToDto(Car car){
        return CarResponseDto.builder()
                .id(car.getId())
                .licensePlate(car.getLicensePlate())
                .carDetail(modelMapper.map(car.getCarDetail(), CarDetailResponseDto.class))
                .pricePerDay(car.getPricePerDay())
                .location(modelMapper.map(car.getLocation(), LocationResponseDto.class))
                .status(car.getStatus())
                .createdAt(car.getCreatedAt())
                .description(car.getDescription())
                .features(car.getFeatures())
                .imageURL(car.getImageURL())
                .build();
    }
    public Car mapDtoToEntity(CarRequestDto dto, Car car) {
        car.setCarDetail(carDetailRepo.getById(dto.getCarDetailId()));
        car.setLicensePlate(dto.getLicensePlate());
        car.setPricePerDay(dto.getPricePerDay());
        car.setLocation(locationRepo.getById(dto.getLocationId()));
        car.setDescription(dto.getDescription());
        car.setFeatures(dto.getFeatures());
        car.setStatus(dto.getStatus());
        car.setImageURL(dto.getImageURL());
        return car;
    }
}
