package com.huiguan.web.repository;

import com.huiguan.web.dto.GetArticleResponse;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query("select r from Article r where r.section=?1")
    Page<Article> findBySectionAndId(Section section, Pageable request);

    @Query("select r from Article r where r.section.id >= ?1 AND r.section.id <= ?2")
    Page<Article> findLatestArticles(int start, int end, Pageable request);

    int countArticleBySection(Section section);

    @Query("select r from Article r where r.title like %?1%")
    Page<Article> findArticlePageByTitle(String title, PageRequest req);
}
