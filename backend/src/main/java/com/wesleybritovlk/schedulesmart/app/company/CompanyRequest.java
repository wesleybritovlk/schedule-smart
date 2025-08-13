package com.wesleybritovlk.schedulesmart.app.company;

import jakarta.validation.constraints.NotBlank;

public interface CompanyRequest {
    public record Auth(
            @NotBlank(message = "'name' cannot be null") String name,
            @NotBlank(message = "'legalName' cannot be null") String legalName,
            @NotBlank(message = "'cnpj' cannot be null") String cnpj,
            @NotBlank(message = "'slug' cannot be null") String slug,
            @NotBlank(message = "'password' cannot be null") String password,
            @NotBlank(message = "'contactFullName' cannot be null") String contactFullName,
            @NotBlank(message = "'contactEmail' cannot be null") String contactEmail,
            @NotBlank(message = "'contactPhone' cannot be null") String contactPhone) {
    }

}
