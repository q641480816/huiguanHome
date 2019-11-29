package com.huiguan.web.service;

import com.huiguan.web.dto.GetArticleResponse;
import com.huiguan.web.dto.GetShortArticleResponse;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ArticleService {
    List<Article> findAll();

    GetArticleResponse findById(int id) throws ApiException;

    int addNewArticle(Article toBeAdded);

    int edit(int id, Article article);

    void deleteById(int id);

    Set<GetArticleResponse> findArticlePageSortBySectionAndId(int pageNum, int pageSize, int sectionId);

    Set<GetShortArticleResponse> findShortArticlePageSortBySectionAndId(int pageNum, int pageSize, int sectionId);

    int countBySection(int sectionId);

    Set<GetArticleResponse> findLatestArticles(int start, int end);

    Set<GetShortArticleResponse> findLatestShortArticles(int start,int end);
}
