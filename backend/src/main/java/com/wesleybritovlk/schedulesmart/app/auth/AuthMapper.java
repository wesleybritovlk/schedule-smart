package com.wesleybritovlk.schedulesmart.app.auth;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.wesleybritovlk.schedulesmart.app.company.CompanyRequest;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuthMapper {
    @Mapping(target = "password", source = "password")
    CompanyRequest.Auth toCompanyRequest(AuthRequest.CompanyRegister request, String password);
}
