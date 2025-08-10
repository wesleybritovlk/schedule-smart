package com.wesleybritovlk.schedulesmart.infra;

import java.io.IOException;
import java.time.ZonedDateTime;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.wesleybritovlk.schedulesmart.core.CommonResource;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.val;

@Configuration
@RequiredArgsConstructor
public class AccessDeniedFilter implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
            AccessDeniedException accessDeniedException) throws IOException, ServletException {
        val status = HttpStatus.FORBIDDEN;
        val exResponse = new ExceptionHandlerAdvice.ExceptionResponse(String.valueOf(ZonedDateTime.now()),
                status.value(), status.getReasonPhrase(), accessDeniedException.getMessage(), request.getRequestURI());
        response.setStatus(status.value());
        response.setContentType("application/json");
        val resource = CommonResource.toJsonStr(exResponse);
        response.getWriter().write(resource);
    }
}