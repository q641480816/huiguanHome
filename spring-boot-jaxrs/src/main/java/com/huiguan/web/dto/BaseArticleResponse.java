package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class BaseArticleResponse {
    int id;
    String title;
    String time;
    String creationTime;
    String description;
    int sectionId;
    String url;
    Boolean isTop;
    public BaseArticleResponse(){}
}
