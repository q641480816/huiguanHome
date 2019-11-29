package com.huiguan.web.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class GetShortArticleResponse extends BaseArticleResponse {

    GetResourceResponse resource;

    public GetShortArticleResponse(){}
}
