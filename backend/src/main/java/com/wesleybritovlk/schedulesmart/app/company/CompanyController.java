package com.wesleybritovlk.schedulesmart.app.company;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wesleybritovlk.schedulesmart.core.CommonResource;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperty;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.val;

@Tag(name = "Company", description = "Company operations")
public interface CompanyController {
    @Operation(summary = "Get company details")
    @ApiResponse(responseCode = "200", content = @Content(schemaProperties = {
            @SchemaProperty(name = "data", schema = @Schema(type = "object", implementation = CompanyResponse.Response.class))
    }))
    ResponseEntity<Map<String, Object>> get(JwtAuthenticationToken authentication);

}

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/companies")
class CompanyControllerImpl implements CompanyController {
    private final CompanyService service;

    @Override
    @GetMapping
    public ResponseEntity<Map<String, Object>> get(JwtAuthenticationToken authentication) {
        val response = service.get(authentication);
        val resource = CommonResource.toData(response);
        return ResponseEntity.ok(resource);
    }

}
