package com.huiguan.web.dto;

import com.huiguan.web.model.Article;

import java.util.Set;

public class CreateNewSectionRequest {
    String url;
    String title;
    Set<Article> articles;
}
