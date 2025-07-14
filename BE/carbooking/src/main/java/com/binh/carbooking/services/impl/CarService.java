package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.entities.Car;
import com.binh.carbooking.entities.Image;
import com.binh.carbooking.entities.enums.ECarStatus;
import com.binh.carbooking.entities.enums.ECensorshipStatus;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.mappers.CarMapper;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.repository.ImageRepo;
import com.binh.carbooking.services.inf.ICarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public CarResponseDto saveCar(CarRequestDto carRequestDto) {
        if(isExistCar(carRequestDto.getLicensePlate()))
            throw new DuplicateValueInResourceException("Car is exist");
        Car car = carMapper.mapDtoToEntity(carRequestDto);
        car.setCensorshipStatus(ECensorshipStatus.NOT_ACCEPT);
        car.setStatus(ECarStatus.AVAILABLE);
        car.setCreatedAt(LocalDateTime.now());
        Car savedCar = carRepo.save(car);

        List<Image> images = new ArrayList<>();
        for (ImageRequestDto imageRequestDto : carRequestDto.getImageRequestDtos()) {
            Image image = modelMapper.map(imageRequestDto, Image.class);
            image.setCar(savedCar);
            images.add(imageRepo.save(image));
        }

        savedCar.setImages(images);

        return carMapper.mapEntityToDto(savedCar);
    }

    @Override
    public CarResponseDto getCarById(Long id){
        Car car = carRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("car not found"));
        return carMapper.mapEntityToDto(car);
    }

    @Override
    public List<CarResponseDto> getListCar(int page, int size){
        try {
            Pageable pageable = PageRequest.of(page, size);
            return carRepo.findAll()
                    .stream()
                    .map(car -> carMapper.mapEntityToDto(car))
                    .collect(Collectors.toList());

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public CarResponseDto updateCar(Long id, CarRequestDto carRequestDto){
        if(isExistCar(carRequestDto.getLicensePlate())){
            throw new DuplicateValueInResourceException("car is exist");
        }
        try {
            carRepo.findById(id).ifPresent(car -> carMapper.mapDtoToEntity(carRequestDto));
            return getCarById(id);
        }catch (Exception e)
        {
            throw new ResourceFoundException("update fail");
        }

    }

    @Override
    public DeleteResponseDto deleteCar(Long id){
        try{
            carRepo.deleteById(id);
            return new DeleteResponseDto("Delete success", HttpStatus.OK);
        } catch (Exception e) {
            return new DeleteResponseDto("Delete fail",HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public boolean isExistCar(String licensePlate){
        if(carRepo.findCarByLicensePlate(licensePlate)!=null)
            return true;
        return false;
    }
}
