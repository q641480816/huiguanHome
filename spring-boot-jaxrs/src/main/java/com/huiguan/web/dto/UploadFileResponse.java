package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadFileResponse extends BaseResponse {
    String name;

    public UploadFileResponse(boolean isSuccess,String message){
        this.isSuccess=isSuccess;
        if(isSuccess){
            this.name=message;
            this.httpStatus = 200;
        }
        else{
            this.httpStatus=400;
            this.errorMessage=message;
        }
    }
}
