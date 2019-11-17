package com.huiguan.web.service;

import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.repository.ArticleRepository;
import com.huiguan.web.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Primary
@Service
@Transactional
public class ArticleServiceImpl implements ArticleService{


    @Autowired
    private ArticleRepository articleRepository;

    @Override
    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    @Override
    public Optional<Article> findById(int id) {
        return articleRepository.findById(id);
    }

    @Override
    public int addNewResource(Article toBeAdded) {
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
    public void deleteById(int id) {
        articleRepository.deleteById(id);
    }
}
