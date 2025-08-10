package com.wesleybritovlk.schedulesmart.app.auth;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

@Tag(name = "Auth", description = "Authentication operations")
public interface AuthController {
    @Operation(summary = "Login a company")
    @ApiResponse(responseCode = "200", description = "Successful company login", content = @Content(schemaProperties = {
            @SchemaProperty(name = "message", schema = @Schema(type = "string", example = "Success company login")),
            @SchemaProperty(name = "data", schema = @Schema(type = "object"))
    }))
    ResponseEntity<Map<String, Object>> loginCompany(Object request);

    @Operation(summary = "Register a company")
    @ApiResponse(responseCode = "200", description = "Successful company registration", content = @Content(schemaProperties = {
            @SchemaProperty(name = "message", schema = @Schema(type = "string", example = "Success company registration")),
            @SchemaProperty(name = "data", schema = @Schema(type = "object"))
    }))
    ResponseEntity<Map<String, Object>> registerCompany(Object request);

    ResponseEntity<Map<String, Object>> loginUser(Object request);

    ResponseEntity<Map<String, Object>> registerUser(Object request);

    @Operation(summary = "Refresh authentication token")
    @ApiResponse(responseCode = "200", description = "Successful token refresh", content = @Content(schemaProperties = {
            @SchemaProperty(name = "data", schema = @Schema(type = "object"))
    }))
    ResponseEntity<Map<String, Object>> refresh(JwtAuthenticationToken authentication);
}

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
class AuthControllerImpl implements AuthController {
    private final AuthService service;

    @Override
    @PostMapping("company/login")
    public ResponseEntity<Map<String, Object>> loginCompany(@RequestBody Object request) {
        val response = service.loginCompany(request);
        val resource = CommonResource.toMessage("Success company login", response);
        return ResponseEntity.ok(resource);
    }

    @Override
    @PostMapping("company/register")
    public ResponseEntity<Map<String, Object>> registerCompany(@RequestBody Object request) {
        val response = service.registerCompany(request);
        val resource = CommonResource.toMessage("Success company registration", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(resource);
    }

    @Override
    public ResponseEntity<Map<String, Object>> loginUser(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loginUser'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> registerUser(Object request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'registerUser'");
    }

    @Override
    @GetMapping("refresh")
    public ResponseEntity<Map<String, Object>> refresh(JwtAuthenticationToken authentication) {
        val response = service.refreshToken(authentication);
        val resource = CommonResource.toData(response);
        return ResponseEntity.ok(resource);
    }

}
