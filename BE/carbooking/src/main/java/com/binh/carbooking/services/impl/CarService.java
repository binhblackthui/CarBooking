package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.entities.Car;
import com.binh.carbooking.entities.Image;
import com.binh.carbooking.entities.enums.ECarStatus;
import com.binh.carbooking.entities.enums.ECensorshipStatus;
import com.binh.carbooking.mappers.CarMapper;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.repository.ImageRepo;
import com.binh.carbooking.services.inf.ICarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CarService implements ICarService {
    private final CarRepo carRepo;
    private final CarMapper carMapper;
    private final ModelMapper modelMapper;
    private final ImageRepo imageRepo;
    @Override
    public List<CarResponseDto> getListCarByUser(Long userID, int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return carRepo.getListCarByUser(userID,pageable)
                .stream()
                .map(car -> carMapper.mapEntityToDto(car))
                .collect(Collectors.toList());
    }
    @Override
    public CarResponseDto saveCar(CarRequestDto carRequestDto){
        Car car = modelMapper.map(carRequestDto,Car.class);
        car.setCensorshipStatus(ECensorshipStatus.NOT_ACCEPT);
        car.setStatus(ECarStatus.AVAILABLE);
        car.setCreatedAt(LocalDateTime.now());

        for(ImageRequestDto imageRequestDto : carRequestDto.getImageRequestDtos()){
            Image image = modelMapper.map(imageRequestDto,Image.class);
            image.setCar(car);
            car.getImages().add(imageRepo.save(image));
        }

        return carMapper.mapEntityToDto(car);
    }
}
