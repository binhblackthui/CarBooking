package com.binh.carbooking.services.impl;

import com.binh.carbooking.dto.request.PaymentRequestDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.entities.Payment;
import com.binh.carbooking.entities.enums.EPaymentMethod;
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
    public PaymentResponseDto getPaymentById(Long id) {
        Payment payment = paymentRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("car not found"));
        return modelMapper.map(payment,PaymentResponseDto.class);
    }
    @Override
    public PaymentResponseDto updatePayment (Long id , PaymentRequestDto paymentRequestDto){
        try{
            paymentRepo.findById(id).ifPresent(payment -> {
                payment.setMethod(paymentRequestDto.getPaymentMethod());
                if(paymentRequestDto.getPaymentStatus().equals(EPaymentStatus.PAID)) {
                    payment.setStatus(EPaymentStatus.PAID);
                    payment.setPaymentTime(LocalDateTime.now());
                }
                else{
                    payment.setStatus(paymentRequestDto.getPaymentStatus());
                }
                paymentRepo.save(payment);
            });

            return getPaymentById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
