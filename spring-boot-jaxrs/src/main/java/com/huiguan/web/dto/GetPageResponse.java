package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class GetPageResponse {
    int sectionId;
    int articleSize;
    Set<GetArticleResponse> articleList;
}
