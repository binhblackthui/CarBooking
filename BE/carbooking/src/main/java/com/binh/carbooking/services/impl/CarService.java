package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.request.ImageRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.entities.Car;
import com.binh.carbooking.entities.Image;
import com.binh.carbooking.entities.enums.ECarStatus;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.mappers.BookingMapper;
import com.binh.carbooking.mappers.CarMapper;
import com.binh.carbooking.repository.BookingRepo;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.repository.ImageRepo;
import com.binh.carbooking.services.inf.ICarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CarService implements ICarService {
    private final CarRepo carRepo;
    private final BookingRepo bookingRepo;
    private final CarMapper carMapper;
    private final ModelMapper modelMapper;
    private final ImageRepo imageRepo;
    private final BookingMapper bookingMapper;

    @Override
    public List<CarResponseDto> getCars(int page, int size){
        Pageable pageable = PageRequest.of(page, size);
        return carRepo.findAll(pageable)
                .stream()
                .map(car -> carMapper.mapEntityToDto(car))
                .collect(Collectors.toList());
    }

    public List<CarResponseDto> getAvailableCars( int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return carRepo.findCarByStatus(pageable)
                .stream()
                .map(carMapper::mapEntityToDto)
                .collect(Collectors.toList());
    }




    @Override
    public CarResponseDto saveCar(CarRequestDto carRequestDto) {
        if(isExistCar(carRequestDto.getLicensePlate()))
            throw new DuplicateValueInResourceException("Car is exist");
        Car car = new Car();
        car = carMapper.mapDtoToEntity(carRequestDto,car);

        car.setStatus(ECarStatus.AVAILABLE);
        car.setCreatedAt(LocalDateTime.now());
        Car savedCar = carRepo.save(car);

        Image image = new Image();

        image.setImageURL(carRequestDto.getImage().getImageURL());
        image.setCar(savedCar);

        savedCar.setImages(imageRepo.save(image));

//        List<Image> images = new ArrayList<>();
//        for (ImageRequestDto imageRequestDto : carRequestDto.getImage()) {
//            Image image = modelMapper.map(imageRequestDto, Image.class);
//            image.setCar(savedCar);
//            images.add(imageRepo.save(image));
//        }
//
//        savedCar.setImages(images);

        return carMapper.mapEntityToDto(savedCar);
    }

    @Override
    @Transactional(readOnly = true)
    public CarResponseDto getCarById(Long id){
        Car car = carRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("car not found"));
        return carMapper.mapEntityToDto(car);
    }



    @Override
    public CarResponseDto updateCar(Long id, CarRequestDto carRequestDto){
        if(!isExistCar(carRequestDto.getLicensePlate())){
            throw new DuplicateValueInResourceException("car not exist");
        }
        try {
            carRepo.findById(id).ifPresent(car -> { car = carMapper.mapDtoToEntity(carRequestDto,car);
            carRepo.save(car);
            });

            Car car = carRepo.findById(id)
                    .orElseThrow(()-> new ResourceNotFoundException("car not found"));
            return carMapper.mapEntityToDto(car);
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

    @Override
    public Object getCarOverview(){
        Map<String, Object> response = new HashMap<>();
        response.put("totalCars", carRepo.totalCars());
        response.put("availableCars",carRepo.totalAvailableCars());
        response.put("notAvailableCars",carRepo.totalNotAvailableCars());
        return response;
    }
}
