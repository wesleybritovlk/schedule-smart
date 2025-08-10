package com.wesleybritovlk.schedulesmart.infra;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.HandlerMethod;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.IntegerSchema;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.ObjectSchema;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import jakarta.servlet.http.HttpServletRequest;
import lombok.val;

@Configuration
public class ApplicationConfig {
        @Value("${spring.application.name}")
        private String appName;
        @Value("${spring.application.version}")
        private String appVersion;
        @Value("${spring.application.description}")
        private String appDescription;
        @Value("${spring.application.contact.name}")
        private String appContactName;
        @Value("${spring.application.contact.email}")
        private String appContactEmail;

        private static final List<Class<?>> HEADER_PARAMETER_TYPES = List.of(
                        WebRequest.class, HttpServletRequest.class, JwtAuthenticationToken.class);

        @Bean
        OpenAPI openAPI() {
                return new OpenAPI().info(new Info()
                                .title("%s Documentation".formatted(appName))
                                .version(appVersion)
                                .description(appDescription)
                                .contact(new Contact()
                                                .name(appContactName)
                                                .email(appContactEmail)))
                                .components(new Components()
                                                .addSecuritySchemes("Bearer Authentication",
                                                                new SecurityScheme()
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")));
        }

        private Schema<?> getUnauthorizedSchema(final String timestamp) {
                return new ObjectSchema()
                                .addProperty("timestamp", new StringSchema().example(timestamp))
                                .addProperty("status", new IntegerSchema().example("401"))
                                .addProperty("error", new StringSchema().example("Unauthorized"))
                                .addProperty("message", new StringSchema()
                                                .example("Full authentication is required to access this resource"))
                                .addProperty("request_path", new StringSchema().example("/"));
        }

        @Bean
        OperationCustomizer customizeOperations() {
                return (Operation operation, HandlerMethod handlerMethod) -> {
                        boolean hasWebRequestOrHttpRequest = handlerMethod.getMethodParameters() != null &&
                                        Arrays.stream(handlerMethod.getMethodParameters())
                                                        .anyMatch(param -> HEADER_PARAMETER_TYPES.stream()
                                                                        .anyMatch(hpt -> Objects.equals(hpt,
                                                                                        param.getParameterType())));
                        if (hasWebRequestOrHttpRequest) {
                                val responses = operation.getResponses();
                                if (!responses.containsKey("401")) {
                                        val timestamp = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo")).toString();
                                        val schema = getUnauthorizedSchema(timestamp);
                                        responses.addApiResponse("401", new ApiResponse().description("Unauthorized")
                                                        .content(new Content().addMediaType("application/json",
                                                                        new MediaType().schema(schema))));
                                }
                                operation.addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"));
                        }
                        return operation;
                };
        }

}
