package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class GetResourceResponse {
    int id;
    int articleId;
    String url;
    String content;
    String title;
    String description;
    int resourceType;
    String creationTime;
    String time;

    public GetResourceResponse(){}
}
