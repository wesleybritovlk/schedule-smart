package com.wesleybritovlk.schedulesmart.app.company;

import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

public interface CompanyPolicy {
    Object create(Object request);

    Object get(UUID id);
}

@Slf4j
@Service
@RequiredArgsConstructor
class CompanyPolicyImpl implements CompanyPolicy {
    private final CompanyRepository repository;

    @Override
    public Object create(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public Object get(UUID id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'get'");
    }

}