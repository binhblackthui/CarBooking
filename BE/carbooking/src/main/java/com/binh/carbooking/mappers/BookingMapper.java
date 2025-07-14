package com.binh.carbooking.mappers;

import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.dto.response.LocationResponseDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.repository.CarRepo;
import com.binh.carbooking.repository.LocationRepo;
import com.binh.carbooking.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class BookingMapper {
    private final ModelMapper modelMapper;
    private final CarMapper carMapper;
    private final UserRepo userRepo;
    private final CarRepo carRepo;
    private final LocationRepo locationRepo;

    public BookingResponseDto mapEntityToDto(Booking booking){
        return BookingResponseDto.builder()
                .id(booking.getBookingId())
                .userId(booking.getUser().getId())
                .car(carMapper.mapEntityToDto(booking.getCar()))
                .pickupLocation(modelMapper.map(booking.getPickupLocation(),LocationResponseDto.class))
                .returnLocation(modelMapper.map(booking.getReturnLocation(),LocationResponseDto.class))
                .pickupTime(booking.getPickupTime())
                .returnTime(booking.getReturnTime())
                .status(booking.getStatus())
                .createdAt(booking.getCreatedAt())
                .payment(modelMapper.map(booking.getPayment(),PaymentResponseDto.class))
                .build();
    }

    public Booking mapDtoToEntity(BookingRequestDto bookingRequestDto){
        return Booking.builder()
                .user(userRepo.getById(bookingRequestDto.getUserId()))
                .car(carRepo.getById(bookingRequestDto.getCarId()))
                .pickupLocation(locationRepo.getById(bookingRequestDto.getPickupLocationId()))
                .returnLocation(locationRepo.getById(bookingRequestDto.getReturnLocationId()))
                .pickupTime(bookingRequestDto.getPickupTime())
                .returnTime(bookingRequestDto.getReturnTime())
                .build();
    }

}
