package com.wesleybritovlk.schedulesmart.app;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.wesleybritovlk.schedulesmart.core.CommonResource;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.val;
import lombok.extern.slf4j.Slf4j;

public interface ApplicationService {
    Map<String, String> getInfo(HttpServletRequest request);
}

@Slf4j
@Service
@RequiredArgsConstructor
class ApplicationServiceImpl implements ApplicationService {
    private final DataSource dataSource;

    @Value("${spring.application.name}")
    private String appName;
    @Value("${spring.application.version}")
    private String appVersion;
    @Value("${spring.application.description}")
    private String appdescription;

    @Override
    public Map<String, String> getInfo(HttpServletRequest request) {
        log.info("Fetching application info");
        val requestUrl = request.getRequestURL().toString();
        val status = CommonResource.linkedMap(
                CommonResource.entry("name", appName),
                CommonResource.entry("version", appVersion),
                CommonResource.entry("description", appdescription),
                CommonResource.entry("documentation_swagger", requestUrl + "docs"),
                CommonResource.entry("documentation_redoc", requestUrl + "redoc"),
                CommonResource.entry("api", "UP"));
        try {
            val future = CompletableFuture.runAsync(() -> {
                try (val conn = dataSource.getConnection()) {
                    status.put("database", "UP");
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
            future.get(1, TimeUnit.SECONDS);
        } catch (Exception e) {
            log.error("Database connection failed: {}", e.getMessage());
            status.put("database", "DOWN");
        }
        return status;
    }

}
