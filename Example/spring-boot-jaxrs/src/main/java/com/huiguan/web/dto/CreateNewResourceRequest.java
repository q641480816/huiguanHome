package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Setter
@Getter
public class CreateNewResourceRequest {
    String url;
    int type;
    String content;
    String title;
    Timestamp time;
    String description;
    Timestamp creationTime;
}
