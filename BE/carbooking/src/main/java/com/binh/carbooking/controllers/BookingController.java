package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.BookingRequestDto;
import com.binh.carbooking.dto.request.PaymentRequestDto;
import com.binh.carbooking.dto.request.ReviewRequestDto;
import com.binh.carbooking.dto.response.BookingResponseDto;
import com.binh.carbooking.dto.response.PageResponse;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.dto.response.ReviewResponseDto;
import com.binh.carbooking.services.inf.IBookingService;
import com.binh.carbooking.services.inf.IPaymentService;
import com.binh.carbooking.services.inf.IReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/bookings")
public class BookingController {
    private final IBookingService bookingService;
    private final IReviewService reviewService;
    private final IPaymentService paymentService;

    @PostMapping
    BookingResponseDto saveBooking( @Valid @RequestBody BookingRequestDto bookingRequestDto){
        return bookingService.saveBooking(bookingRequestDto);
    }

    @GetMapping
    PageResponse<BookingResponseDto> getBookings(@RequestParam (name = "page") int page, @RequestParam (name = "size") int size )
    {
        return bookingService.getBookings(page,size);
    }
    @GetMapping("/{id}")
    BookingResponseDto getBookingById(@PathVariable Long id){
        return bookingService.getBookingById(id);
    }

    @GetMapping("/total")
    Object totalBookingByStatus(@RequestParam (name = "status") String status){
        return bookingService.totalBookingByStatus(status);
    }

    @PutMapping("/{id}")
    BookingResponseDto updateBooking(@PathVariable Long id, @Valid @RequestBody BookingRequestDto bookingRequestDto){
        return bookingService.updateBooking(id,bookingRequestDto);
    }

    @PostMapping("/{id}/reviews")
    ReviewResponseDto saveReview(@PathVariable Long id, @Valid @RequestBody ReviewRequestDto reviewDto){
        return reviewService.saveReview(id,reviewDto);
    }

    @PutMapping("/{bookingId}/payment")
    PaymentResponseDto updatePaymentByBooking(@PathVariable Long bookingId, @Valid @RequestBody PaymentRequestDto paymentRequestDto){
        return paymentService.updatePaymentByBooking(bookingId,paymentRequestDto);
    }


}
