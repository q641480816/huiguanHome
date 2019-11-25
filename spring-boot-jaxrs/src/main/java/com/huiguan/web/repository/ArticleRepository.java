package com.huiguan.web.repository;

import com.huiguan.web.model.Article;
import com.huiguan.web.model.Section;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
    @Query("select r from Article r where r.section=?1")
    Page<Article> findBySectionAndId(Section section, Pageable request);

    int countArticleBySection(Section section);
}
