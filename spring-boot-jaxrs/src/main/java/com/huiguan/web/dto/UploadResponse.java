package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UploadResponse extends BaseResponse {
    List<Integer> SuccessId;
    public UploadResponse(int httpStatus, boolean isSuccess) {
        super(httpStatus, isSuccess);
    }


    public UploadResponse() {
        this.setSuccess(false);
    }

    public UploadResponse(String errorMessage) {
        super(errorMessage);
    }
}
