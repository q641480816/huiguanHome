package com.huiguan.web.service;

import com.huiguan.web.dto.*;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.model.Section;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class ConvertToEntityService {

    @Autowired
    private ModelMapper modelMapper;

    public Resource convertToResourceEntity(CreateNewResourceRequest req){
        Resource resource = modelMapper.map(req, Resource.class);
        return resource;
    }

    public Article convertToArticleEntity(CreateNewArticleRequest req){
        Article article = modelMapper.map(req, Article.class);
        return article;
    }

    public Section convertToSectionEntity(CreateNewSectionRequest req){
        Section section = modelMapper.map(req, Section.class);
        return section;
    }

    public GetResourceResponse convertToResourceDto(Resource resource){
        if (resource==null) return  null;
        GetResourceResponse res = new GetResourceResponse();
        if (resource.getArticle()!=null) {
            res.setArticleId(resource.getArticle().getId());
        }
        res.setContent(resource.getContent());
        res.setCreationTime(resource.getCreationTime());
        res.setDescription(resource.getDescription());
        res.setId(resource.getId());
        res.setUrl(resource.getUrl());
        res.setTitle(resource.getTitle());
        res.setResourceType(resource.getResourceType());
        return res;
    }

    public GetArticleResponse convertToArticleDto(Article article){
        if (article==null) return null;
        GetArticleResponse res = new GetArticleResponse();
        res.setContent(article.getContent());
        res.setCreation_time(article.getCreationTime());
        res.setDescription(article.getDescription());

        if (article.getResources()!=null){
            Set<GetResourceResponse> resourcesDto = new HashSet<>();
            for (Resource resource:article.getResources()){
                resourcesDto.add(convertToResourceDto(resource));
            }
            res.setResources(resourcesDto);
        }

        if (article.getSection()!=null){
            res.setSectionTitle(article.getSection().getTitle());
        }
        res.setTime(article.getTime());
        res.setUrl(article.getUrl());
        res.setTitle(article.getTitle());
        res.setId(article.getId());
        return res;
    }
}
