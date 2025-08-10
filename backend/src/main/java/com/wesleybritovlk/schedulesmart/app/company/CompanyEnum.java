package com.wesleybritovlk.schedulesmart.app.company;

import lombok.AllArgsConstructor;
import lombok.Getter;

public interface CompanyEnum {
    @Getter
    @AllArgsConstructor
    public enum Status {
        ACTIVE("active"),
        INACTIVE("inactive"),
        BLOCKED("blocked");

        private final String value;

    }
}
