package com.wesleybritovlk.schedulesmart.core;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.AbstractMap.SimpleEntry;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Stream;

import org.springframework.web.context.request.WebRequest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.val;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CommonResource {
    public static String getAuthorization(WebRequest webRequest) {
        return webRequest.getHeader("Authorization");
    }

    public static String getAuthorization(HttpServletRequest httpRequest) {
        return httpRequest.getHeader("Authorization");
    }

    public static Map<String, Object> toMessage(String message) {
        return hashMap(simpleEntry("message", message));
    }

    public static Map<String, Object> toMessage(String message, Object data) {
        return linkedMap(simpleEntry("message", message), simpleEntry("data", data));
    }

    public static Map<String, Object> toData(Object data) {
        return hashMap(simpleEntry("data", data));
    }

    public static Map<String, Object> toJsonMap(String jsonStr) {
        try {
            return new ObjectMapper().readValue(jsonStr, Map.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting to JSON", e);
        }
    }

    public static String toJsonStr(Object jsonObj) {
        try {
            val mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
            return mapper.writeValueAsString(jsonObj);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting to JSON", e);
        }
    }

    public static void saveTextToFile(String content, String fileName) {
        try {
            val file = new File(fileName);
            try (val writer = new FileWriter(file)) {
                writer.write(content);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static <K, V> SimpleEntry<K, V> simpleEntry(K key, V value) {
        return new SimpleEntry<>(key, value);
    }

    @SafeVarargs
    public static <K, V> Map<K, V> hashMap(SimpleEntry<K, V>... entries) {
        Map<K, V> map = new HashMap<>();
        Stream.of(entries).forEach(entry -> map.putIfAbsent(entry.getKey(), entry.getValue()));
        return map;
    }

    @SafeVarargs
    public static <K, V> Map<K, V> linkedMap(SimpleEntry<K, V>... entries) {
        Map<K, V> map = new LinkedHashMap<>();
        Stream.of(entries).forEach(entry -> map.putIfAbsent(entry.getKey(), entry.getValue()));
        return map;
    }
}
