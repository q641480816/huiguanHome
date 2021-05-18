package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Set;

@Setter
@Getter
public class GetArticleResponse extends BaseArticleResponse{
    String content;
    Set<GetResourceResponse> resources;
    public GetArticleResponse(){}
}
