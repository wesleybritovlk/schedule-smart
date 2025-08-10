package com.wesleybritovlk.schedulesmart.infra;

import java.time.ZonedDateTime;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.val;

@ControllerAdvice
@RequiredArgsConstructor
public class ExceptionHandlerAdvice {

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(
                        MethodArgumentNotValidException ex, HttpServletRequest request) {
                val status = HttpStatus.valueOf(ex.getStatusCode().value());
                val allErrors = ex.getBindingResult().getAllErrors();
                val message = allErrors.stream().map(ObjectError::getDefaultMessage)
                                .collect(Collectors.joining(", "));
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()),
                                status.value(), status.getReasonPhrase(), message, request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(ResponseStatusException.class)
        public ResponseEntity<ExceptionResponse> handleResponseStatusException(ResponseStatusException ex,
                        HttpServletRequest request) {
                val status = HttpStatus.valueOf(ex.getStatusCode().value());
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()),
                                status.value(), status.getReasonPhrase(), ex.getReason(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadableException(
                        HttpMessageNotReadableException ex, HttpServletRequest request) {
                val status = HttpStatus.BAD_REQUEST;
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(MissingServletRequestParameterException.class)
        public ResponseEntity<ExceptionResponse> handleMissingServletRequestParameterException(
                        MissingServletRequestParameterException ex, HttpServletRequest request) {
                val status = HttpStatus.BAD_REQUEST;
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(Throwable.class)
        public ResponseEntity<Object> handleUnexpectedException(Throwable ex, HttpServletRequest request) {
                val status = HttpStatus.INTERNAL_SERVER_ERROR;
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ExceptionResponse> handleGeneralException(Exception ex,
                        HttpServletRequest request) {
                val status = HttpStatus.FORBIDDEN;
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(ConstraintViolationException.class)
        public ResponseEntity<ExceptionResponse> handleConstraintViolationException(
                        ConstraintViolationException ex,
                        HttpServletRequest request) {
                val status = HttpStatus.BAD_REQUEST;
                val message = ex.getConstraintViolations().stream().map(ConstraintViolation::getMessage)
                                .collect(Collectors.joining(", "));
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), message, request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(MaxUploadSizeExceededException.class)
        public ResponseEntity<ExceptionResponse> handleMultipartException(MaxUploadSizeExceededException ex,
                        HttpServletRequest request) {
                val status = HttpStatus.BAD_REQUEST;
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), ex.getBody().getDetail(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @ExceptionHandler(IllegalArgumentException.class)
        public ResponseEntity<ExceptionResponse> handleIllegalArgumentException(IllegalArgumentException ex,
                        HttpServletRequest request) {
                val status = HttpStatus.BAD_REQUEST;
                val response = new ExceptionResponse(String.valueOf(ZonedDateTime.now()), status.value(),
                                status.getReasonPhrase(), ex.getMessage(), request.getRequestURI());
                return ResponseEntity.status(status).body(response);
        }

        @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
        public record ExceptionResponse(
                        String timestamp,
                        int status,
                        String error,
                        String message,
                        String requestPath) {
        }
}
