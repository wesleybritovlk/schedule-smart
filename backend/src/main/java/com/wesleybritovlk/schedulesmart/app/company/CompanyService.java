package com.wesleybritovlk.schedulesmart.app.company;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

public interface CompanyService {
    Object get(JwtAuthenticationToken authentication);

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

    @Override
    public Object get(JwtAuthenticationToken authentication) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'get'");
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