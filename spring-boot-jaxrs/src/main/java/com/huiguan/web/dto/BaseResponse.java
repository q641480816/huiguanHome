package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse {
    int httpStatus;
    boolean isSuccess;
    String errorMessage;

    public BaseResponse(int httpStatus, boolean isSuccess) {
        this.httpStatus = httpStatus;
        this.isSuccess = isSuccess;
    }

    public BaseResponse(String errorMessage) {
        this.errorMessage = errorMessage;
        this.isSuccess = false;
        httpStatus = 400;
    }

    public BaseResponse() {
    }

}
