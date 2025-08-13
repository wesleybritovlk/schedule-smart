package com.wesleybritovlk.schedulesmart.app.company;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<CompanyEntity, UUID> {

    Optional<CompanyEntity> findByDeletedAtIsNullAndCnpj(String cnpj);

    boolean existsByDeletedAtIsNullAndCnpjOrSlug(String cnpj, String slug);

}
