package com.binh.carbooking.utils;

import java.util.regex.Pattern;

public class EmailUtils {
    public static boolean isValidEmail(String email) {
        String regexPattern = "^(.+)@(\\S+)$";
        return Pattern.compile(regexPattern)
                .matcher(email)
                .matches();
    }
}
