package com.huiguan.web.service;

import com.huiguan.web.dto.GetArticleResponse;
import com.huiguan.web.dto.GetShortArticleResponse;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Section;
import com.huiguan.web.repository.ArticleRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Primary
@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private static final Logger logger = LogManager.getLogger(ArticleServiceImpl.class);

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
        res = convertToEntityService.convertToArticleDto(article);
        return res;
    }

    @Override
    public int countBySection(int sectionId) {
        Optional<Section> existedSection = sectionService.findById(sectionId);
        if (!existedSection.isPresent()) {
            return 0;
        } else {
            return articleRepository.countArticleBySection(existedSection.get());
        }
    }


    private void updateArticleSection(Article toBeAdded,Section section){
        if (section!= null) {
            if (section.getId() > 0) {
                Optional<Section> existedSection = sectionService.findById(section.getId());
                if (existedSection.isPresent()) {
                    toBeAdded.setSection(existedSection.get());
                } else {
                    toBeAdded.setSection(null);
                }
            } else if (section.getTitle() != null) {
                Section existedSection = sectionService.findByTitle(section.getTitle());
                if (existedSection != null) {
                    toBeAdded.setSection(existedSection);
                } else {
                    toBeAdded.setSection(null);
                }
            }
        }
    }
    @Override
    public int addNewArticle(Article toBeAdded) {
        updateArticleSection(toBeAdded,toBeAdded.getSection());
        articleRepository.save(toBeAdded);
        return toBeAdded.getId();
    }

    @Override
    public int edit(int id, Article article) {
        if (!articleRepository.findById(id).isPresent()) return -1;

        Article toBeEdited = articleRepository.findById(id).get();
        updateArticleSection(toBeEdited,article.getSection());
        toBeEdited.setCreationTime(article.getCreationTime());
        if (article.getResources()!=null) {
            toBeEdited.setResources(article.getResources());
        }
        if(article.getContent()!=null) {
            toBeEdited.setContent(article.getContent());
        }
        if(article.getTitle()!=null) {
            toBeEdited.setTitle(article.getTitle());
        }
        if(article.getIsTop()!=null) {
            toBeEdited.setIsTop(article.getIsTop());
        }
        if (article.getUrl()!=null) {
            toBeEdited.setUrl(article.getUrl());
        }
        if (article.getDescription()!=null) {
            toBeEdited.setDescription(article.getDescription());
        }
        if(article.getTime()!=null){
            toBeEdited.setTime(article.getTime());
        }
        articleRepository.save(toBeEdited);
        return toBeEdited.getId();

    }

    @Override
    public Set<GetArticleResponse> findArticlePageSortBySectionAndId(int pageNum, int pageSize, int sectionId) {
        Pageable req = PageRequest.of(pageNum, pageSize, Sort.by("isTop").descending().and(Sort.by("creationTime").descending()));

        Optional<Section> articleSection = sectionService.findById(sectionId);
        if (!articleSection.isPresent()) {
            return null;
        }
        Page<Article> resEntityPage = articleRepository.findBySectionAndId(sectionId, req);
        List<Article> articleList = resEntityPage.getContent();
        Set<GetArticleResponse> articleDtoList = new LinkedHashSet<>();
        for (Article article : articleList) {
            articleDtoList.add(convertToEntityService.convertToArticleDto(article));
        }
        return articleDtoList;
    }

    @Override
    public void deleteById(int id) throws ApiException {
        Article article = articleRepository.findById(id).orElseThrow(() -> new ApiException("Article not found"));
        article.setSection(null);
        articleRepository.deleteById(id);
    }

    @Override
    public Set<GetArticleResponse> findLatestArticles(int start, int end) {
        logger.info("Retrieving latest 5 articles from section 4 to section 12");
        PageRequest req = new PageRequest(0, 5, Sort.Direction.DESC, "creationTime");
        Page<Article> articles=articleRepository.findLatestArticles(start,end,req);
        List<Article> articleList = articles.getContent();
        Set<GetArticleResponse> articleDtoList = new LinkedHashSet<>();
        for (Article article : articleList) {
            articleDtoList.add(convertToEntityService.convertToArticleDto(article));
        }

        return articleDtoList;
    }



    @Override
    public Set<GetShortArticleResponse> findLatestShortArticles(int start, int end) {
        Set<GetArticleResponse> articles = findLatestArticles(start, end);
        Set<GetShortArticleResponse> res = new LinkedHashSet<>();
        for (GetArticleResponse article: articles){
            res.add(convertToEntityService.convertToShortArticleDto(article));
        }
        return res;
    }

    @Override
    public Set<GetShortArticleResponse> findShortArticlePageSortBySectionAndId(int pageNum, int pageSize, int sectionId) {
        Set<GetArticleResponse> articles = findArticlePageSortBySectionAndId(pageNum,pageSize,sectionId);
        Set<GetShortArticleResponse> res = new LinkedHashSet<>();
        for (GetArticleResponse article: articles){
            res.add(convertToEntityService.convertToShortArticleDto(article));
        }
        return res;
    }

    @Override
    public  Set<GetShortArticleResponse> findByTitle(String title, int pageNum, int pageSize){
        PageRequest req = new PageRequest(pageNum, pageSize, Sort.Direction.DESC, "creationTime");
        Page<Article> articles = articleRepository.findArticlePageByTitle(title,req);
        List<Article> articleList = articles.getContent();
        Set<GetShortArticleResponse> res = new LinkedHashSet<>();
        for (Article article: articleList){
            res.add(convertToEntityService.convertToShortArticleDto(article));
        }
        return res;
    }

}
