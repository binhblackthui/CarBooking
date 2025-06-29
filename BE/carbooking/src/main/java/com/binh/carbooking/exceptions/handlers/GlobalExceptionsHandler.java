package com.binh.carbooking.exceptions.handlers;

import com.binh.carbooking.dto.response.ErrorResponse;
import com.binh.carbooking.exceptions.DuplicateValueInResourceException;
import com.binh.carbooking.exceptions.ResourceNotFoundException;
import com.binh.carbooking.exceptions.ValidationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@ControllerAdvice
public class GlobalExceptionsHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ResourceNotFoundException.class})
    protected ResponseEntity<ErrorResponse> handleResourceNotFoundException(RuntimeException exception) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                "resource not found",
                exception.getMessage().toString(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({DuplicateValueInResourceException.class})
    protected ResponseEntity<ErrorResponse> handleDuplicateValueInResource(RuntimeException exception) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "resource was existed",
                exception.getMessage().toString(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ValidationException.class})
    protected ResponseEntity<ErrorResponse> handleValidationException(RuntimeException exception, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "validation fail",
                exception.getMessage().toString(),
                ZonedDateTime.now()
        );
        return new ResponseEntity<ErrorResponse>(error, HttpStatus.BAD_REQUEST);
    }

    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<String> details = new ArrayList<>();
        for(ObjectError error : ex.getBindingResult().getAllErrors()) {
            details.add(error.getDefaultMessage());
        }
        ErrorResponse errorResponseDto = new ErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "validation fail",
                details.stream().collect(Collectors.joining(", ")),
                ZonedDateTime.now());
        return new ResponseEntity(errorResponseDto, HttpStatus.BAD_REQUEST);
    }

}
