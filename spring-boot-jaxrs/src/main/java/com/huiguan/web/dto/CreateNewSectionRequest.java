package com.huiguan.web.dto;

import com.huiguan.web.model.Article;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class CreateNewSectionRequest {
    String url;
    String title;
    Set<Article> articles;
}
