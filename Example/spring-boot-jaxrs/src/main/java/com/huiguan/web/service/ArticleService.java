package com.huiguan.web.service;

import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;

import java.util.List;
import java.util.Optional;

public interface ArticleService {
    List<Article> findAll();
    Optional<Article> findById(int id);
    int addNewResource(Article toBeAdded);
    Article edit(int id, Article article);
    void deleteById(int id);
}
