package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateResponse extends BaseResponse {
    int id;
    public CreateResponse(int httpStatus, boolean isSuccess) {
        super(httpStatus, isSuccess);
    }


    public CreateResponse() {

    }

    public CreateResponse(String errorMessage) {
        super(errorMessage);
    }
}
