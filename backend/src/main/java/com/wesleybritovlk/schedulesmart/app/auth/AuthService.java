package com.wesleybritovlk.schedulesmart.app.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import com.wesleybritovlk.schedulesmart.app.company.CompanyPolicy;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

public interface AuthService {
    Object loginCompany(Object request);

    Object registerCompany(Object request);

    Object loginUser(Object request);

    Object registerUser(Object request);

    Object refreshToken(JwtAuthenticationToken authentication);
}

@Slf4j
@Service
@RequiredArgsConstructor
class AuthServiceImpl implements AuthService {
    private final CompanyPolicy companyPolicy;
    private final AuthTokenHelper tokenHelper;
    private final PasswordEncoder passEncoder;

    @Override
    public Object loginCompany(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginCompany'");
    }

    @Override
    public Object registerCompany(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'registerCompany'");
    }

    @Override
    public Object loginUser(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }

    @Override
    public Object registerUser(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'registerUser'");
    }

    @Override
    public Object refreshToken(JwtAuthenticationToken authentication) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'refreshToken'");
    }
}