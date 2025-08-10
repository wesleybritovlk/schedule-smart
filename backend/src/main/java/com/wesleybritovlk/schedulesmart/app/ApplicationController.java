package com.wesleybritovlk.schedulesmart.app;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wesleybritovlk.schedulesmart.core.CommonResource;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.val;

@RestController
@RequiredArgsConstructor
class ApplicationController {
    private final ApplicationService service;

    @GetMapping
    public ResponseEntity<Map<String, Object>> get(HttpServletRequest request) {
        val response = service.getInfo(request);
        val resource = CommonResource.toData(response);
        return ResponseEntity.ok(resource);
    }
}