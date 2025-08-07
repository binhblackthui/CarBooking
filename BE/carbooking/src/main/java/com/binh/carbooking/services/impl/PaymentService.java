package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.PaymentRequestDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.entities.Payment;
import com.binh.carbooking.entities.enums.EPaymentStatus;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.repository.PaymentRepo;
import com.binh.carbooking.services.inf.IPaymentService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class PaymentService implements IPaymentService {
    private final PaymentRepo paymentRepo;
    private final ModelMapper modelMapper;

    @Override
    public PaymentResponseDto updatePaymentByBooking (Long bookingId , PaymentRequestDto paymentRequestDto){
        if(paymentRepo.getPaymentByBooking(bookingId) == null)
            throw new ResourceNotFoundException("booking not exist");
        try{
           Payment payment = paymentRepo.getPaymentByBooking(bookingId);
           payment.setStatus(paymentRequestDto.getPaymentStatus());
           if(paymentRequestDto.getPaymentStatus().equals(EPaymentStatus.PAID))
               payment.setPaymentTime(LocalDateTime.now());
            return modelMapper.map(paymentRepo.save(payment),PaymentResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
