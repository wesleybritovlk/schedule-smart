package com.wesleybritovlk.schedulesmart.app.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import io.swagger.v3.oas.annotations.media.Schema;

public interface AuthResponse {
    @Schema(name = "AuthResponseToken")
    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record Token(
            @Schema(example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...") String accessToken,
            @Schema(example = "1800") Long expiresIn) {
    }
}
