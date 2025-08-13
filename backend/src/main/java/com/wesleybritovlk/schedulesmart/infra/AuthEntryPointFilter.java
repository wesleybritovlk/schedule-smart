package com.wesleybritovlk.schedulesmart.infra;

import java.io.IOException;
import java.time.ZonedDateTime;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.wesleybritovlk.schedulesmart.core.CommonResource;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.val;

@Configuration
@RequiredArgsConstructor
public class AuthEntryPointFilter implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {
        val status = HttpStatus.UNAUTHORIZED;
        val exResponse = new ExceptionHandlerAdvice.ExceptionResponse(String.valueOf(ZonedDateTime.now()),
                status.value(), status.getReasonPhrase(), authException.getMessage(), request.getRequestURI());
        response.setStatus(status.value());
        response.setContentType("application/json");
        val resource = CommonResource.toJsonStr(exResponse);
        response.getWriter().write(resource);
    }

}