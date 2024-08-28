package com.green.api.config.security;

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


    public String generateToken(String username, String role) {
        long currenTimeMilis = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(username)
                .setIssuer("com.vti")
                .setIssuedAt(new Date(currenTimeMilis))
                .setExpiration(new Date(currenTimeMilis + expirationInMs))
                .claim("role", role)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
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
