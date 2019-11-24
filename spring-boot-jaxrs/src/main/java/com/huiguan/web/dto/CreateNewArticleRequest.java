package com.huiguan.web.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.huiguan.web.model.Resource;
import com.huiguan.web.model.Section;
import lombok.Getter;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonProperty;

import java.sql.Time;
import java.sql.Timestamp;

@Setter
@Getter
public class CreateNewArticleRequest {
    String content;
    Timestamp creationTime;
    Resource[] resources;
    @JsonProperty("time")
    @JsonFormat(pattern = "dd/mm/yyyy")
    Timestamp time;
    String title;
    String url;
    String description;
    Section section;
}
