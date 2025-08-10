package com.wesleybritovlk.schedulesmart.app.auth;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.server.ResponseStatusException;

import com.wesleybritovlk.schedulesmart.app.company.CompanyPolicy;
import com.wesleybritovlk.schedulesmart.core.CommonResource;

import lombok.RequiredArgsConstructor;
import lombok.val;
import lombok.extern.slf4j.Slf4j;

public interface AuthService {
    AuthResponse.Token loginCompany(AuthRequest.CompanyLogin request);

    AuthResponse.Token registerCompany(AuthRequest.CompanyRegister request);

    AuthResponse.Token loginUser(Object request);

    AuthResponse.Token registerUser(Object request);

    AuthResponse.Token refreshToken(JwtAuthenticationToken authentication);
}

@Slf4j
@Service
@RequiredArgsConstructor
class AuthServiceImpl implements AuthService {
    private final CompanyPolicy companyPolicy;
    private final AuthTokenHelper tokenHelper;
    private final PasswordEncoder passEncoder;
    private final AuthMapper mapper;

    @Override
    public AuthResponse.Token loginCompany(AuthRequest.CompanyLogin request) {
        try {
            val auth = companyPolicy.getAuth(request.cnpj());
            log.info("Company auth retrieved for login: ID: {}, slug: {}", auth.id(), auth.slug());
            if (!passEncoder.matches(request.password(), auth.password())) {
                log.error("Invalid password for company with CNPJ: {}", request.cnpj());
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
            }
            log.info("Password matched for company with CNPJ: {}", request.cnpj());
            Map<String, Object> claim = CommonResource.hashMap(CommonResource.entry("scope", "COMPANY"));
            val token = tokenHelper.generateToken(auth.cnpj(), claim);
            log.info("Token generated for company with ID: {}, slug: {}", auth.id(), auth.slug());
            return token;
        } catch (Exception e) {
            log.error("Error during company login: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login failed CNPJ or Password invalid");
        }
    }

    @Override
    public AuthResponse.Token registerCompany(AuthRequest.CompanyRegister request) {
        val password = passEncoder.encode(request.password());
        val companyReq = mapper.toCompanyRequest(request, password);
        val auth = companyPolicy.createAuth(companyReq);
        log.info("Company registered with ID: {}, slug: {}", auth.id(), auth.slug());
        Map<String, Object> claim = CommonResource.hashMap(CommonResource.entry("scope", "COMPANY"));
        val token = tokenHelper.generateToken(auth.cnpj(), claim);
        log.info("Token generated for company with ID: {}, slug: {}", auth.id(), auth.slug());
        return token;
    }

    @Override
    public AuthResponse.Token loginUser(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }

    @Override
    public AuthResponse.Token registerUser(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'registerUser'");
    }

    @Override
    public AuthResponse.Token refreshToken(JwtAuthenticationToken authentication) {
        try {
            val jwt = authentication.getToken();
            val scope = jwt.getClaimAsString("scope");
            if (ObjectUtils.isEmpty(scope)) {
                log.error("Token scope is missing");
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token scope");
            }
            String newSubject;
            switch (scope) {
                case "COMPANY" -> {
                    val company = companyPolicy.getAuth(jwt.getSubject());
                    newSubject = company.cnpj();
                }
                case "USER" -> {
                    // val user = userPolicy.getAuth(jwt.getSubject());
                    // newSubject = user.email();
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User token refresh not implemented");
                }
                default -> throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token scope");
            }
            val token = tokenHelper.generateToken(newSubject, jwt.getClaims());
            log.info("Token refreshed with subject: {}", newSubject);
            return token;
        } catch (Exception e) {
            log.error("Error during token refresh: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token refresh failed");
        }
    }
}