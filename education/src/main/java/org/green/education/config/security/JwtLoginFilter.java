package org.green.education.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.green.education.entity.Account;
import org.green.education.repository.IAccountRepository;
import org.green.education.repository.IAuthRepository;
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
    @Autowired
    private IAccountRepository repository ;
    @Autowired
    private IAuthRepository authRepository ;
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {
        // Parse JSON request body
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> requestBody = objectMapper.readValue(request.getInputStream(), Map.class);

        // Check for either email or username in the request
        String email = requestBody.get("email");
        String username;

        if (email != null && email.contains("@")) {
            username = email;
        } else {
            username = repository.findAccountByUsername( requestBody.get("username")).getEmail();
        }

        String password =  requestBody.get("password");

        // Validate that the username and password are present
        if (username == null || password == null) {
            throw new AuthenticationException("Username or password not provided") {};
        }

        // Create an unauthenticated authentication token
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

        // Authenticate using the AuthenticationManager
        return getAuthenticationManager().authenticate(authRequest);
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

        String username = authResult.getName();
        Account account;
        if ( username.contains("@")) {
             account = authRepository.findByEmail(username);
        }
        else
        {
             account = authRepository.findByUsername(username);
        }
        String fullName = account.getFullName();
        Integer accountId = account.getId();

        // Generate the JWT token with the username and role
        String token = jwtHandler.generateToken(authResult.getName(),fullName, accountId,  role);

        // Add the token to the response header
        response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token);
    }

}
