package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.request.PaymentRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.entities.Booking;
import com.binh.carbooking.entities.Payment;
import com.binh.carbooking.entities.enums.EBookingStatus;
import com.binh.carbooking.entities.enums.EPaymentStatus;
import com.binh.carbooking.exceptions.ResourceFoundException;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.exceptions.ValidationException;
import com.binh.carbooking.mappers.BookingMapper;
import com.binh.carbooking.repository.*;
import com.binh.carbooking.services.inf.IBookingService;
import com.binh.carbooking.utils.MoneyUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
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
    private final PaymentService paymentService;

    @Override
    public BookingResponseDto saveBooking(BookingRequestDto bookingRequestDto){
        if(!userRepo.existsById(bookingRequestDto.getUserId()))
            throw new ResourceNotFoundException("user not found");
        if(!carRepo.existsById(bookingRequestDto.getCarId()))
            throw new ResourceNotFoundException("car not found");
        if(!locationRepo.existsById(bookingRequestDto.getPickupLocationId()) && !locationRepo.existsById(bookingRequestDto.getReturnLocationId()))
            throw new ResourceNotFoundException("location not found");
        if(bookingRepo.hasConflictingBooking(bookingRequestDto.getCarId(),bookingRequestDto.getPickupTime(),bookingRequestDto.getReturnTime()))
            throw new ResourceFoundException("conflicting booking");

        try {
            Booking booking = new Booking();
            booking = bookingMapper.mapDtoToEntity(bookingRequestDto, booking);
            booking.setStatus(EBookingStatus.PENDING);
            booking.setCreatedAt(LocalDateTime.now());
            Booking saveBooking = bookingRepo.save(booking);

            Payment payment = new Payment();
            payment.setBooking(saveBooking);
            payment.setTotal(MoneyUtils.calculateTotal(bookingRequestDto.getPickupTime(), bookingRequestDto.getReturnTime(), saveBooking.getCar().getPricePerDay()));
            payment.setStatus(EPaymentStatus.PENDING);
            payment.setCreatedAt(LocalDateTime.now());


            saveBooking.setPayment(paymentRepo.save(payment));
            return bookingMapper.mapEntityToDto(saveBooking);
        } catch (Exception e) {
            throw new ValidationException(e.getMessage());
        }
    }

    @Override
    public PageResponse<BookingResponseDto> getBookings(int page, int size){
        try{
            Pageable pageable = PageRequest.of(page, size);
            Page<Booking> bookings = bookingRepo.findAll(pageable);

            return new PageResponse<>(
                    bookings.getContent().stream().map(bookingMapper::mapEntityToDto).collect(Collectors.toList()),
                    bookings.getNumber(),
                    bookings.getTotalPages(),
                    bookings.getNumberOfElements(),
                    bookings.getSize()
            );
        }
        catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public PageResponse<BookingResponseDto> getListBookingByUser(Long id, int page, int size){
        try{
            Pageable pageable = PageRequest.of(page,size);
            Page<Booking> bookings = bookingRepo.getListBookingByUser(pageable,id);
            return new PageResponse<>(
                    bookings.getContent().stream().map(bookingMapper::mapEntityToDto).collect(Collectors.toList()),
                    bookings.getNumber(),
                    bookings.getTotalPages(),
                    bookings.getNumberOfElements(),
                    bookings.getSize()
                    );

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public BookingResponseDto getBookingByUser(Long id, Long bookingID){
        try{
            Booking booking = bookingRepo.getBookingByUser(id,bookingID);
            if(booking == null)
                throw new ResourceNotFoundException("booking not exist");
            return bookingMapper.mapEntityToDto(booking);
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }
    }

    @Override
    public  BookingResponseDto getBookingById(Long id){
        Booking booking = bookingRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("booking not found"));
        return bookingMapper.mapEntityToDto(booking);
    }

    @Override
    public  Object totalBookingByStatus(String status){
        try {
            Map<String, Object> response = new HashMap<>();
            if (status.equals("PENDING"))
                response.put("pendingBookings", bookingRepo.totalPendingBooking());
            else if (status.equals("CONFIRMED"))
                response.put("confirmedBookings", bookingRepo.totalConfirmedBooking());
            else if (status.equals("COMPLETED"))
                response.put("completedBookings", bookingRepo.totalCompletedBooking());
            else if (status.equals("CANCELLED"))
                response.put("cancelledBookings", bookingRepo.totalCancelledBooking());
            else
                response.put("totalBookings", bookingRepo.totalBooking());
            return response;
        }catch (Exception e){
            throw new ResourceNotFoundException(e.getMessage());
        }

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
            if(bookingRequestDto.getStatus().equals(EBookingStatus.CANCELLED))
                paymentService.updatePaymentByBooking(id,new PaymentRequestDto(EPaymentStatus.FAILED));

            return getBookingById(id);
        }
        catch (Exception e){
            throw new ValidationException("update fail");
        }
    }

    @Override
    public boolean isExistBooking(Long id){
        return bookingRepo.findById(id).isPresent();
    }
}
