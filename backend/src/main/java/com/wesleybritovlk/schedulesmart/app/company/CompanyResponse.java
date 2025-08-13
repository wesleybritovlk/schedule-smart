package com.wesleybritovlk.schedulesmart.app.company;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import io.swagger.v3.oas.annotations.media.Schema;

public interface CompanyResponse {
        public record Auth(
                        UUID id,
                        String cnpj,
                        String slug,
                        String password,
                        String contactFullName,
                        String contactEmail,
                        String contactPhone) {
        }

        @Schema(name = "CompanyResponseResponse")
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public record Response(
                        @Schema(example = "Schedule Smart") String name,
                        @Schema(example = "Schedule Smart LTDA") String legalName,
                        @Schema(example = "12345678000100") String cnpj,
                        @Schema(example = "schedule_smart") String slug,
                        CompanyEnum.Status status,
                        @Schema(example = "Fulano de Tal") String contactFullName,
                        @Schema(example = "fulano@example.com") String contactEmail,
                        @Schema(example = "5500912345678") String contactPhone,
                        ZonedDateTime createdAt) {
        }
}
