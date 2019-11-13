package com.huiguan.web.dto;

import com.huiguan.web.model.Resource;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class CreateNewArticleRequest {
    String content;
    Timestamp creationTime;
    Resource[] resources;
}
