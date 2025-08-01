package com.binh.carbooking.utils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class MoneyUtils {
    public static BigDecimal calculateTotal(LocalDate start, LocalDate end, BigDecimal price){
        long days = ChronoUnit.DAYS.between(start, end);
        return price.multiply(BigDecimal.valueOf(days));
    }
}
