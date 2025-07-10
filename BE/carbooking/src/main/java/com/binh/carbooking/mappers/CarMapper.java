package com.binh.carbooking.mappers;


import com.binh.carbooking.dto.request.CarDetailRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.CommentResponseDto;
import com.binh.carbooking.dto.response.UserResponseDto;
import com.binh.carbooking.entities.*;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CarMapper {
    private final ModelMapper modelMapper;

    public CarResponseDto mapEntityToDto(Car car){
        return CarResponseDto.builder()
                .licensePlate(car.getLicensePlate())
                .user(modelMapper.map(car.getUser(), UserResponseDto.class))
                .car(modelMapper.map(car.getCarDetail(), CarDetailRequestDto.class))
                .price(car.getPrice())
                .year(car.getYear())
                .location(car.getLocation())
                .censorshipStatus(car.getCensorshipStatus())
                .status(car.getStatus())
                .createdAt(car.getCreatedAt())
                .images(car.getImages().stream().map(image -> modelMapper.map(image, ImageRequestDto.class)).collect(Collectors.toList()))
                .comments(car.getComments().stream().map(comment -> modelMapper.map(comment, CommentResponseDto.class)).collect(Collectors.toList()))
                .build();
    }
}

