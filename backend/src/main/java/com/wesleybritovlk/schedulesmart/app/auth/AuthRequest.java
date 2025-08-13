package com.wesleybritovlk.schedulesmart.app.auth;

import org.hibernate.validator.constraints.br.CNPJ;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.wesleybritovlk.schedulesmart.infra.validation.Identifier;
import com.wesleybritovlk.schedulesmart.infra.validation.Mobile;
import com.wesleybritovlk.schedulesmart.infra.validation.Password;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public interface AuthRequest {
        @Schema(name = "AuthRequestCompanyLogin")
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public record CompanyLogin(
                        @NotBlank(message = "'cnpj' cannot be null") @CNPJ @Schema(example = "12345678000100") String cnpj,
                        @NotBlank(message = "'password' cannot be null") @Password @Schema(example = "@Abc1234") String password) {
        }

        @Schema(name = "AuthRequestCompanyRegister")
        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public record CompanyRegister(
                        @NotBlank(message = "'cnpj' cannot be null") @CNPJ @Schema(example = "12345678000100") String cnpj,
                        @NotBlank(message = "'password' cannot be null") @Password @Schema(example = "@Abc1234") String password,
                        @NotBlank(message = "'name' cannot be null") @Schema(example = "Schedule Smart") String name,
                        @NotBlank(message = "'legalName' cannot be null") @Schema(example = "Schedule Smart LTDA") String legalName,
                        @NotBlank(message = "'slug' cannot be null") @Identifier @Schema(example = "schedule_smart") String slug,
                        @NotBlank(message = "'contactFullName' cannot be null") @Schema(example = "Fulano de Tal") String contactFullName,
                        @NotBlank(message = "'contactEmail' cannot be null") @Email @Schema(example = "fulano@example.com") String contactEmail,
                        @NotBlank(message = "'contactPhone' cannot be null") @Mobile @Schema(example = "5500912345678") String contactPhone) {
        }
}
