package com.huiguan.web.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateResponse extends BaseResponse {
    int id;

    public UpdateResponse(int httpStatus, boolean isSuccess) {
        super(httpStatus, isSuccess);
    }


    public UpdateResponse() {

    }

    public UpdateResponse(String errorMessage) {
        super(errorMessage);
    }
}
