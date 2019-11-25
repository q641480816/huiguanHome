package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Setter
@Getter
public class GetArticleResponse {
    int id;
    String content;
    String title;
    Timestamp time;
    Timestamp creation_time;
    String description;
    Set<GetResourceResponse> resources;
    String sectionTitle;
    String url;

    public GetArticleResponse(){}
}
