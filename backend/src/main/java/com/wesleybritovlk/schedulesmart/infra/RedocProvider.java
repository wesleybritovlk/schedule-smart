package com.wesleybritovlk.schedulesmart.infra;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedocProvider {
    @GetMapping("redoc")
    public String serveRedoc() {
        return "redoc.html";
    }
}
