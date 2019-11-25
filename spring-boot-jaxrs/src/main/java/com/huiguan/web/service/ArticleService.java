package com.huiguan.web.service;

import com.huiguan.web.dto.GetArticleResponse;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ArticleService {
    List<Article> findAll();

    GetArticleResponse findById(int id) throws ApiException;

    int addNewArticle(Article toBeAdded);

    Article edit(int id, Article article);

    void deleteById(int id);

    Set<GetArticleResponse> findArticlePageSortBySectionAndId(int pageNum, int pageSize, int sectionId);

    int countBySection(int sectionId);
}
