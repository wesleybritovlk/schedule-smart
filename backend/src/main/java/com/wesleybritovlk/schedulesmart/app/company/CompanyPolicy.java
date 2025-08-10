package com.wesleybritovlk.schedulesmart.app.company;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.val;
import lombok.extern.slf4j.Slf4j;

public interface CompanyPolicy {
    CompanyResponse.Auth createAuth(CompanyRequest.Auth request);

    CompanyResponse.Auth getAuth(String cnpj);
}

@Slf4j
@Service
@RequiredArgsConstructor
class CompanyPolicyImpl implements CompanyPolicy {
    private final CompanyRepository repository;
    private final CompanyMapper mapper;

    @Override
    public CompanyResponse.Auth createAuth(@Valid CompanyRequest.Auth request) {
        log.info("Creating company auth with request: {}", request.slug());
        var entity = mapper.toAuthEntity(request);
        entity = repository.saveAndFlush(entity);
        log.info("Company auth created with ID: {}", entity.getId());
        val response = mapper.toAuthResponse(entity);
        log.info("Returning company response: {}", response.slug());
        return response;
    }

    @Override
    public CompanyResponse.Auth getAuth(String cnpj) {
        log.info("Retrieving company auth with cnpj: {}", cnpj);
        val entity = repository.findByCnpjAndDeletedAtIsNull(cnpj).orElseThrow(() -> {
            log.error("Company auth not found for CNPJ: {}", cnpj);
            return new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found");
        });
        log.info("Company auth retrieved: {}", entity.getSlug());
        return mapper.toAuthResponse(entity);
    }

}