package org.green.education.config.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtHandler jwtHandler;
    private final UserDetailsService userDetailsService;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    public JwtAuthenticationFilter(JwtHandler jwtHandler, UserDetailsService userDetailsService, AuthenticationEntryPoint authenticationEntryPoint) {
        this.jwtHandler = jwtHandler;
        this.userDetailsService = userDetailsService;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("Bear"+authorization);
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            String token = authorization.substring(7);
            System.out.println("token"+token);

            String username = jwtHandler.parseEmail(token);
            System.out.println("username"+username);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            Authentication authentication = UsernamePasswordAuthenticationToken
                    .authenticated(userDetails, null, userDetails.getAuthorities());
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(authentication);
            SecurityContextHolder.setContext(context);
        } catch (Throwable throwable) {
            String message = "JwtAuthenticaionFilter failed";
            logger.error(message, throwable);
            authenticationEntryPoint.commence(request, response, new BadCredentialsException(message, throwable));
            return;
        }
        filterChain.doFilter(request, response);
    }
}
