package org.green.education.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtHandler {
    private final String secretKey;
    private final long expirationInMs;

    public JwtHandler(
            @Value("${jwt.secret-key}") String secretKey,
            @Value("${jwt.expiration-in-ms}") long expirationInMs) {
        this.secretKey = secretKey;
        this.expirationInMs = expirationInMs;
    }


    public String generateToken(String username, String fullName, Integer accountId, String role) {
        // Get the current time in milliseconds
        long currentTimeMillis = System.currentTimeMillis();

        // Create the JWT
        return Jwts.builder()
                .setSubject(username) // Set the subject (username)
                .setIssuer("com.vti") // Set the issuer
                .setIssuedAt(new Date(currentTimeMillis)) // Set the issued date
                .setExpiration(new Date(currentTimeMillis + expirationInMs)) // Set the expiration date
                .claim("role", role) // Add role claim
                .claim("fullName", fullName) // Add full name claim
                .claim("accountId", accountId) // Add account ID claim
                .signWith(SignatureAlgorithm.HS512, secretKey) // Sign the token with the secret key
                .compact(); // Generate the JWT string
    }


    public String parseEmail(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
        String username = claims.getSubject();
        return username;
    }

}
