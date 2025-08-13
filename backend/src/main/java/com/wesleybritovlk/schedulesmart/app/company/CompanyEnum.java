package com.wesleybritovlk.schedulesmart.app.company;

import lombok.AllArgsConstructor;

public interface CompanyEnum {
    @AllArgsConstructor
    public enum Status {
        ACTIVE,
        INACTIVE,
        BLOCKED
    }
}
