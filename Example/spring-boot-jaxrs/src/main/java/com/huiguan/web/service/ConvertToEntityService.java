package com.huiguan.web.service;

import com.huiguan.web.dto.CreateNewArticleRequest;
import com.huiguan.web.dto.CreateNewResourceRequest;
import com.huiguan.web.dto.CreateNewSectionRequest;
import com.huiguan.web.model.Article;
import com.huiguan.web.model.Resource;
import com.huiguan.web.model.Section;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
