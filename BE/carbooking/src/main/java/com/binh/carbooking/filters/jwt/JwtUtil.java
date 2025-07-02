package com.binh.carbooking.filters.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.security.core.GrantedAuthority;


import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtil {
    private static final String SECRET = "secret";

    public static String generateJwtToken(Authentication authentication) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        return JWT.create()
                .withSubject(authentication.getName())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 10000))
                .withClaim("roles", authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
    }

    private static DecodedJWT verifyToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    public static String getUsernameByToken(String token) {
        token = token.substring("Bearer ".length());
        String username;
        DecodedJWT decodedJWT = verifyToken(token);
        username = decodedJWT.getSubject();
        return username;
    }

    public static String getUsername(HttpServletRequest request) {
        String token = request.getHeader("AUTHORIZATION").substring("Bearer ".length());
        String username;
        DecodedJWT decodedJWT = verifyToken(token);
        username = decodedJWT.getSubject();
        return username;
    }

    public static String getRoleByToken(String token) {
        token =token.substring("Bearer ".length());
        DecodedJWT decodedJWT = verifyToken(token);
        String roles[] = decodedJWT.getClaim("roles").asArray(String.class);
        return  roles[0];
    }

    public static String[] getRoles(HttpServletRequest request) {
        String token = request.getHeader("AUTHORIZATION").substring("Bearer ".length());
        DecodedJWT decodedJWT = verifyToken(token);
        String roles[] = decodedJWT.getClaim("roles").asArray(String.class);
        return roles;
    }



}
