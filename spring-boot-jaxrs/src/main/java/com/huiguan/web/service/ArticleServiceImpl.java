package com.huiguan.web.service;

import com.huiguan.web.dto.GetArticleResponse;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.model.Section;
import com.huiguan.web.repository.ArticleRepository;
import com.huiguan.web.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Pageable;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Primary
@Service
@Transactional
public class ArticleServiceImpl implements ArticleService{


    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private ConvertToEntityService convertToEntityService;
    @Autowired
    private SectionService sectionService;

    @Override
    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    @Override
    public GetArticleResponse findById(int id) throws ApiException {
        GetArticleResponse res = new GetArticleResponse();
        Article article = articleRepository.findById(id).orElseThrow(() -> new ApiException("Article not found"));
        res=convertToEntityService.convertToArticleDto(article);
        return res;
    }

    @Override
    public int addNewArticle(Article toBeAdded) {
        articleRepository.save(toBeAdded);
        return toBeAdded.getId();
    }

    @Override
    public Article edit(int id, Article article) {
        Article toBeEdited = articleRepository.findById(id).get();
        toBeEdited.setCreationTime(article.getCreationTime());
        toBeEdited.setResources(toBeEdited.getResources());
        toBeEdited.setContent(article.getContent());
        toBeEdited.setTitle(article.getTitle());
        toBeEdited.setUrl(article.getUrl());
        toBeEdited.setDescription(article.getDescription());
        articleRepository.save(toBeEdited);
        return toBeEdited;

    }

    @Override
    public Set<GetArticleResponse> findArticlePageSortBySectionAndId(int pageNum, int pageSize, String section){
        PageRequest req = new PageRequest(pageNum, pageSize, Sort.Direction.DESC,"id");
        Section articleSection = sectionService.findByTitle(section);
        Page<Article> resEntityPage = articleRepository.findBySectionAndId(articleSection, req);
        List<Article> articleList = resEntityPage.getContent();
        Set<GetArticleResponse> articleDtoList = new HashSet<>();
        for (Article article:articleList){
            articleDtoList.add(convertToEntityService.convertToArticleDto(article));
        }
        return articleDtoList;
    }
    @Override
    public void deleteById(int id) {
        articleRepository.deleteById(id);
    }
}
