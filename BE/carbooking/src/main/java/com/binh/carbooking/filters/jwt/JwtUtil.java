package com.binh.carbooking.filters.jwt;

import com.auth0.jwt.JWT;
import org.springframework.security.core.Authentication;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.core.GrantedAuthority;


import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtil {
    private static final String SECRET = "secret";
    public static String generateJwtToken(Authentication authentication){
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        return JWT.create()
                .withSubject(authentication.getName())
                .withExpiresAt(new Date(System.currentTimeMillis()+10 * 60 * 10000))
                .withClaim("roles", authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
    }
}
