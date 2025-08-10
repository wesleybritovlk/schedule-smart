package com.wesleybritovlk.schedulesmart.app.auth;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.val;

@Component
@RequiredArgsConstructor
public class AuthTokenHelper {
    private final JwtEncoder jwtEncoder;

    private String createToken(UUID id, String subject, Map<String, Object> otherClaims) {
        val instant = Instant.now();
        val jwtClaims = JwtClaimsSet.builder()
                .id(id.toString())
                .subject(subject)
                .issuedAt(instant)
                .expiresAt(instant.plusSeconds(3600))
                .claims(claims -> claims.putAll(otherClaims))
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwtClaims)).getTokenValue();
    }

    public String generateToken(UUID id, String subject, Map<String, Object> claims) {
        return createToken(id, subject, claims);
    }
}
