package com.wesleybritovlk.schedulesmart.infra;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter.ReferrerPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;

import lombok.RequiredArgsConstructor;
import lombok.val;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    @Value("${rsa.public-key}")
    private RSAPublicKey publicKey;
    @Value("${rsa.private-key}")
    private RSAPrivateKey privateKey;
    private final AuthEntryPointFilter authEntryPointFilter;
    private final AccessDeniedFilter accessDeniedFilter;

    private static final String[] SWAGGER_WHITE_LIST = { "/v3/api-docs/**", "/swagger-ui.html", "/swagger-ui/**" };

    private static final List<String> ORIGIN_LIST = List.of(
            "http://localhost:4200",
            "http://localhost:8081");

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
                    authenticatedRoutes(requests);
                    requests.anyRequest().permitAll();
                })
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(jwtDecoder())
                                .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                        .accessDeniedHandler(accessDeniedFilter)
                        .authenticationEntryPoint(authEntryPointFilter))
                .headers(this::setSecurityHeaders)
                .build();
    }

    private void authenticatedRoutes(
            AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry requests) {
        requests.requestMatchers(HttpMethod.GET, "/api/v1/auth/refresh").hasAnyAuthority("COMPANY", "USER");
        requests.requestMatchers("/api/v1/companies/**").hasAnyAuthority("COMPANY");
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(publicKey).build();
    }

    @Bean
    JwtEncoder jwtEncoder() {
        val jwk = new RSAKey.Builder(this.publicKey).privateKey(privateKey).build();
        val jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter() {
        val converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> Stream.ofNullable(jwt.getClaim("scope"))
                .map(Object::toString).map(SimpleGrantedAuthority::new).map(GrantedAuthority.class::cast).toList());
        return converter;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

}
