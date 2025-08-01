package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.entities.Payment;
import com.binh.carbooking.entities.enums.EBookingStatus;
import com.binh.carbooking.entities.enums.EPaymentMethod;
import com.binh.carbooking.entities.enums.EPaymentStatus;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.mappers.BookingMapper;
import com.binh.carbooking.repository.*;
import com.binh.carbooking.services.inf.IBookingService;
import com.binh.carbooking.utils.MoneyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {
    private final BookingRepo bookingRepo;
    private final BookingMapper bookingMapper;
    private final PaymentRepo paymentRepo;
    private final UserRepo userRepo;
    private final CarRepo carRepo;
    private final LocationRepo locationRepo;

    @Override
    public BookingResponseDto saveBooking(BookingRequestDto bookingRequestDto){
        if(!userRepo.existsById(bookingRequestDto.getUserId()))
            throw new ResourceNotFoundException("user not found");
        if(!carRepo.existsById(bookingRequestDto.getCarId()))
            throw new ResourceNotFoundException("car not found");
        if(!locationRepo.existsById(bookingRequestDto.getPickupLocationId()) && !locationRepo.existsById(bookingRequestDto.getReturnLocationId()))
            throw new ResourceNotFoundException("location not found");
        Booking booking = new Booking();
        booking = bookingMapper.mapDtoToEntity(bookingRequestDto,booking);
        booking.setStatus(EBookingStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        Booking saveBooking = bookingRepo.save(booking);

        Payment payment = new Payment();
        payment.setBooking(saveBooking);
        payment.setTotal(MoneyUtils.calculateTotal(bookingRequestDto.getPickupTime(),bookingRequestDto.getReturnTime(),saveBooking.getCar().getPricePerDay()));
        payment.setStatus(EPaymentStatus.PENDING);
        payment.setCreatedAt(LocalDateTime.now());
        payment.setMethod(EPaymentMethod.OFFLINE);

       saveBooking.setPayment(paymentRepo.save(payment));
        return bookingMapper.mapEntityToDto(saveBooking);
    }
    public Object getBookingOverview(){
        Map<String, Object> response = new HashMap<>();
        response.put("totalBookings", bookingRepo.totalBooking());
        response.put("pendingBookings",bookingRepo.totalPendingBooking());
        response.put("confirmedBooking",bookingRepo.totalConfirmedBooking());
        response.put("completedBookings",bookingRepo.totalCompletedBooking());
        response.put("cancelledBooking",bookingRepo.totalCancelledBooking());
        return response;
    }
    @Override
    public List<BookingResponseDto> getBookings(int page, int size){
        try{
            Pageable pageable = PageRequest.of(page, size);
            return bookingRepo.findAll(pageable)
                    .stream()
                    .map(booking -> bookingMapper.mapEntityToDto(booking))
                    .collect(Collectors.toList());
        }
        catch (Exception e){
            throw new ResourceFoundException(e.getMessage());
        }
    }

    @Override
    public List<BookingResponseDto> getListBookingByUser(Long id, int page, int size){
        try{
            Pageable pageable = PageRequest.of(page,size);
            return bookingRepo.getListBookingByUser(id,pageable)
                    .stream()
                    .map(booking -> bookingMapper.mapEntityToDto(booking))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResourceFoundException(e.getMessage());
        }
    }

    @Override
    public  BookingResponseDto getBookingById(Long id){
        Booking booking = bookingRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("booking not found"));
        return bookingMapper.mapEntityToDto(booking);
    }

    @Override
    public BookingResponseDto updateBooking(Long id, BookingRequestDto bookingRequestDto){
        if(!isExistBooking(id)){
            throw new ResourceNotFoundException("booking not exist");
        }
        try{
            bookingRepo.findById(id).ifPresent(booking -> {
                        booking = bookingMapper.mapDtoToEntity(bookingRequestDto,booking);
                        bookingRepo.save(booking);
                    }

            );
            return getBookingById(id);
        }
        catch (Exception e){
            throw new ResourceFoundException("update fail");
        }
    }

    @Override
    public boolean isExistBooking(Long id){
        return bookingRepo.findById(id).isPresent();

    }
}
