package com.wesleybritovlk.schedulesmart.infra;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import lombok.val;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private static final String[] SWAGGER_WHITE_LIST = { "/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**" };

    private static final List<String> ORIGIN_LIST = List.of();

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        val source = new UrlBasedCorsConfigurationSource();
        val config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(ORIGIN_LIST);
        config.setAllowedHeaders(List.of("Origin", "Content-Type", "Accept", "Authorization"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setMaxAge(3600L);
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    private void setSecurityHeaders(HeadersConfigurer<HttpSecurity> headers) {
        headers.httpStrictTransportSecurity(hsts -> hsts
                .maxAgeInSeconds(31536000)
                .includeSubDomains(true)
                .preload(true));
        headers.contentSecurityPolicy(csp -> csp
                .policyDirectives("default-src 'self'; "
                        + "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdn.redoc.ly; "
                        + "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
                        + "font-src 'self' https://fonts.gstatic.com; "
                        + "worker-src 'self' blob:; "
                        + "connect-src 'self' https://cdn.redoc.ly; "));
        headers.referrerPolicy(referrer -> referrer.policy(ReferrerPolicy.NO_REFERRER));
        headers.permissionsPolicyHeader(permissions -> permissions.policy("geolocation=(), microphone=(), camera=()"));
        headers.frameOptions(FrameOptionsConfig::sameOrigin);
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> {
                    requests.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    requests.requestMatchers(SWAGGER_WHITE_LIST).permitAll();
                    requests.anyRequest().permitAll();
                })
                .headers(this::setSecurityHeaders)
                .build();
    }
}
