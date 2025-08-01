package com.binh.carbooking.controllers;


import com.binh.carbooking.dto.request.PaymentRequestDto;
import com.binh.carbooking.dto.response.PaymentResponseDto;
import com.binh.carbooking.services.inf.IPaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {
    private final IPaymentService paymentService;

    @GetMapping("/{id}")
    public PaymentResponseDto getPaymentById(@PathVariable Long id){
        return paymentService.getPaymentById(id);
    }
    @PutMapping("/{id}")
    public PaymentResponseDto updatePayment(@PathVariable Long id, @Valid @RequestBody PaymentRequestDto paymentRequestDto){
        return paymentService.updatePayment(id,paymentRequestDto);
    }
}
