package org.green.core.model;

public class CoreResponse<T> {
    private int code;
    private String message;
    public T data;

    public CoreResponse(T allGrade, T httpStatus) {
    }
}
