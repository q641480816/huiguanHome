package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class GetShortPageResponse extends BaseResponse{
    int sectionId;
    int articleSize;
    Set<GetShortArticleResponse> articleList;

    public GetShortPageResponse(){}

    public GetShortPageResponse(String errorMessage){
        super (errorMessage);
    }
}
