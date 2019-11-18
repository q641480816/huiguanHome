package com.huiguan.web.dto;

import com.huiguan.web.model.Resource;
import lombok.Getter;
import lombok.Setter;

import java.sql.Time;
import java.sql.Timestamp;

@Setter
@Getter
public class CreateNewArticleRequest {
    String content;
    Timestamp creationTime;
    Resource[] resources;
    Timestamp time;
    String title;
    String url;
    String description;
}
