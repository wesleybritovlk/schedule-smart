package com.wesleybritovlk.schedulesmart.app.company;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import lombok.val;
import lombok.extern.slf4j.Slf4j;

public interface CompanyService {
    CompanyResponse.Response get(JwtAuthenticationToken authentication);

    Object getProfile(JwtAuthenticationToken authentication);

    Object update(JwtAuthenticationToken authentication, Object request);

    Object updateProfile(JwtAuthenticationToken authentication, Object request);

    Object delete(JwtAuthenticationToken authentication);
}

@Slf4j
@Service
@RequiredArgsConstructor
class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository repository;
    private final CompanyMapper mapper;

    @Override
    public CompanyResponse.Response get(JwtAuthenticationToken authentication) {
        val jwt = authentication.getToken();
        val subject = jwt.getSubject();
        log.info("Fetching company details for subject: {}", subject);
        val company = repository.findByDeletedAtIsNullAndCnpj(subject)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found"));
        return mapper.toResponse(company);
    }

    @Override
    public Object getProfile(JwtAuthenticationToken authentication) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getProfile'");
    }

    @Override
    public Object update(JwtAuthenticationToken authentication, Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public Object updateProfile(JwtAuthenticationToken authentication, Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateProfile'");
    }

    @Override
    public Object delete(JwtAuthenticationToken authentication) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

}