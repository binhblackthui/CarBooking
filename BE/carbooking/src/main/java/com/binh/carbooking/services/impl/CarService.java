package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.CarRequestDto;
import com.binh.carbooking.dto.response.CarResponseDto;
import com.binh.carbooking.dto.response.DeleteResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.entities.Car;
import com.binh.carbooking.entities.enums.ECarStatus;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.exceptions.ValidationException;
import com.binh.carbooking.mappers.BookingMapper;
import com.binh.carbooking.mappers.CarMapper;
import com.binh.carbooking.repository.BookingRepo;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.services.inf.ICarService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private final BookingMapper bookingMapper;

    @Override
    public PageResponse<CarResponseDto> getCars(int page, int size){
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Car> cars = carRepo.findAll(pageable);
            return new PageResponse<>(
                    cars.getContent().stream().map(carMapper::mapEntityToDto).collect(Collectors.toList()),
                    cars.getNumber(),
                    cars.getTotalPages(),
                    cars.getTotalElements(),
                    cars.getSize()
            );
        }
        catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public PageResponse<CarResponseDto> searchCars(int page, int size, String status, Long location, LocalDate pickupDate, LocalDate returnDate){
        try{
            if(pickupDate == null){
                pickupDate = LocalDate.now();
                returnDate = pickupDate.plusDays(1);
            }

            Pageable pageable = PageRequest.of(page,size);
            Page<Car> cars = carRepo.searchCars(pageable,status,location,pickupDate,returnDate);
            return new PageResponse<>(
                    cars.getContent().stream().map(carMapper::mapEntityToDto).collect(Collectors.toList()),
                    cars.getNumber(),
                    cars.getTotalPages(),
                    cars.getTotalElements(),
                    cars.getSize()
        );
        }
        catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }



    @Override
    public CarResponseDto saveCar(CarRequestDto carRequestDto) {
        try {
            if (isExistCar(carRequestDto.getLicensePlate()))
                throw new DuplicateValueInResourceException("Car is exist");
            Car car = new Car();
            car = carMapper.mapDtoToEntity(carRequestDto, car);
            car.setStatus(ECarStatus.AVAILABLE);
            car.setCreatedAt(LocalDateTime.now());
            Car savedCar = carRepo.save(car);
            return carMapper.mapEntityToDto(savedCar);
        }
        catch (Exception e){
            throw new ValidationException(e.getMessage());
        }
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
            throw new ValidationException("update fail");
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
    public Object totalCarsByStatus(String status){
        try {
            Map<String, Object> response = new HashMap<>();
            if (status.equals("AVAILABLE")) {
                response.put("availableCars", carRepo.totalAvailableCars());
            } else if (status.equals("NOT_AVAILABLE")) {
                response.put("notAvailableCars", carRepo.totalNotAvailableCars());
            } else {
                response.put("totalCars", carRepo.totalCars());
            }
            return response;
        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }
}
