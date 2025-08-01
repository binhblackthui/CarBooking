package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.services.inf.IBookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/bookings")
public class BookingController {
    private final IBookingService bookingService;

    @PostMapping
    BookingResponseDto saveBooking( @Valid @RequestBody BookingRequestDto bookingRequestDto){
        return bookingService.saveBooking(bookingRequestDto);
    }

    @GetMapping
    List<BookingResponseDto> getBookings(@RequestParam (name = "page") int page, @RequestParam (name = "size") int size )
    {
        return bookingService.getBookings(page,size);
    }
    @GetMapping("/overview")
    Object getBookingOverview(){
        return bookingService.getBookingOverview();
    }

    @PutMapping("/{id}")
    BookingResponseDto updateBooking(@PathVariable Long id, @Valid @RequestBody BookingRequestDto bookingRequestDto){
        return bookingService.updateBooking(id,bookingRequestDto);
    }


}
