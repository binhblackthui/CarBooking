package com.binh.carbooking.mappers;


import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.entities.*;

import com.binh.carbooking.repository.CarDetailRepo;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

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
                .userId(car.getUser().getId())
                .car(modelMapper.map(car.getCarDetail(), CarDetailRequestDto.class))
                .price(car.getPrice())
                .year(car.getYear())
                .location(modelMapper.map(car.getLocation(), LocationResponseDto.class))
                .censorshipStatus(car.getCensorshipStatus())
                .status(car.getStatus())
                .createdAt(car.getCreatedAt())
                .description(car.getDescription())
                .features(car.getFeatures())
                .images(car.getImages().stream().map(image -> modelMapper.map(image, ImageRequestDto.class)).collect(Collectors.toList()))
                .build();
    }
    public Car mapDtoToEntity(CarRequestDto dto) {
        return Car.builder()
                .user(userRepo.getById(dto.getUserId()))
                .carDetail(carDetailRepo.getById(dto.getCarDetailId()))
                .licensePlate(dto.getLicensePlate())
                .year(dto.getYear())
                .price(dto.getPrice())
                .location(locationRepo.getById(dto.getLocation()))
                .description(dto.getDescription())
                .features(dto.getFeatures())
                .build();
    }
}
