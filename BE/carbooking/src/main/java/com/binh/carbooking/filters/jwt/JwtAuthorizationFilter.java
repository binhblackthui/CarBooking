package com.binh.carbooking.filters.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthorizationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        String path = request.getServletPath();
        if(request.getServletPath().equals("/api/v1/auth/login")){
            filterChain.doFilter(request,response);
        }
        else{
            String authorizationHeader = request.getHeader("AUTHORIZATION");
            if(authorizationHeader !=null && authorizationHeader.startsWith("Bearer ")){
                try{
                    String username = JwtUtil.getUsername(request);
                    String[] roles = JwtUtil.getRoles(request);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    stream(roles).forEach(role->{
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,null,authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request,response);
                }
                catch (Exception ex){
                    response.setHeader("error", ex.getMessage().toString());
                    response.setStatus(UNAUTHORIZED.value());

                    Map<String, String> error = new HashMap<>();
                    error.put("error_message", ex.getMessage());
                    response.setContentType(APPLICATION_JSON_VALUE);

                    new ObjectMapper().writeValue(response.getOutputStream(), error);
                }
            }
            else {
                filterChain.doFilter(request,response);
            }
        }
    }
}
