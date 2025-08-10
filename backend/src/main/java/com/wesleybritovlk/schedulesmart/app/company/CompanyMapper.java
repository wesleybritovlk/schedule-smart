package com.wesleybritovlk.schedulesmart.app.company;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface CompanyMapper {
    @Mapping(target = "status", constant = "ACTIVE")
    CompanyEntity toAuthEntity(CompanyRequest.Auth request);

    CompanyResponse.Auth toAuthResponse(CompanyEntity entity);

    CompanyResponse.Response toResponse(CompanyEntity entity);
}
