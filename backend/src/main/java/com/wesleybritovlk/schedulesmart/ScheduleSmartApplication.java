package com.wesleybritovlk.schedulesmart;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wesleybritovlk.schedulesmart.core.CommonResource;

import lombok.val;

@RestController
@SpringBootApplication
public class ScheduleSmartApplication {

	@Value("${spring.application.name}")
	private String applicationName;

	public static void main(String[] args) {
		SpringApplication.run(ScheduleSmartApplication.class, args);
	}

	@GetMapping
	public ResponseEntity<Map<String, Object>> hello() {
		val message = "Welcome to %s!".formatted(applicationName);
		val resource = CommonResource.toMessage(message);
		return ResponseEntity.ok(resource);
	}
}
