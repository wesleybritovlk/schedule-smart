package com.wesleybritovlk.schedulesmart.app.auth;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.val;

public interface AuthTokenHelper {
    AuthResponse.Token generateToken(String subject, Map<String, Object> otherClaims);
}

@Component
@RequiredArgsConstructor
class AuthTokenHelperImpl implements AuthTokenHelper {
    private final JwtEncoder jwtEncoder;

    private static final Long TTL_SECONDS = 1800L;
    private static final List<String> IGNORED_KEYS = List.of("sub", "exp", "iat", "jti");

    private Map<String, Object> sanitizeClaim(Map<String, Object> claims) {
        val sanitized = new HashMap<String, Object>(claims);
        IGNORED_KEYS.forEach(sanitized::remove);
        return sanitized;
    }

    private String createToken(String subject, Map<String, Object> otherClaims) {
        val instant = Instant.now();
        val jwtClaims = JwtClaimsSet.builder()
                .id(UUID.randomUUID().toString())
                .subject(subject)
                .issuedAt(instant)
                .expiresAt(instant.plusSeconds(TTL_SECONDS))
                .claims(claims -> claims.putAll(otherClaims))
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(jwtClaims)).getTokenValue();
    }

    public AuthResponse.Token generateToken(String subject, Map<String, Object> otherClaims) {
        val filteredClaims = sanitizeClaim(otherClaims);
        val token = createToken(subject, filteredClaims);
        return new AuthResponse.Token(token, TTL_SECONDS);
    }
}
