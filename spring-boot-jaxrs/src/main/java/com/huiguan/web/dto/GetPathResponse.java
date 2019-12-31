package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetPathResponse {
    List<String> paths;
    public GetPathResponse(List<String> paths){
        this.paths=paths;
    }
}
