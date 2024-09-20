package org.green.core.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CoreResponse<T> {
    private int code;
    private String message;
    public T data;
}
