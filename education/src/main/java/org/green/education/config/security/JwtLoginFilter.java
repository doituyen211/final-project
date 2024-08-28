package com.green.api.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Map;


@Component
public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {
    private final JwtHandler jwtHandler;

    @Autowired
    public JwtLoginFilter(AuthenticationManager authenticationManager, JwtHandler jwtHandler) {
        super(new AntPathRequestMatcher("/api/v1/auth/login", "POST"), authenticationManager);
        this.jwtHandler = jwtHandler;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
//        String username = request.getParameter("email");
//        String password = request.getParameter("password");
        // Parse JSON request body
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> requestBody = objectMapper.readValue(request.getInputStream(), Map.class);

        String username = requestBody.get("email");
        String password = requestBody.get("password");
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
        return getAuthenticationManager().authenticate(authentication);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain, Authentication authResult)
            throws IOException, ServletException {

        // Extract the user's roles (authorities)
        Collection<? extends GrantedAuthority> authorities = authResult.getAuthorities();

        // Assuming you have a single role, extract it
        String role = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst() // Get the first (and only) role
                .orElseThrow(() -> new RuntimeException("User has no roles assigned"));


        // Generate the JWT token with the username and role
        String token = jwtHandler.generateToken(authResult.getName(), role);

        // Add the token to the response header
        response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    }

}
