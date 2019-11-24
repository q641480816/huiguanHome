package com.huiguan.web.service;


import com.huiguan.web.dto.GetResourceResponse;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Resource;
import com.huiguan.web.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Primary
@Service
@Transactional
public class ResourceServiceImpl implements ResourceService{

    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private ConvertToEntityService convertToEntityService;
    @Override
    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }


    @Override
    @Transactional
    public GetResourceResponse findById(int id) throws ApiException {
        Resource resource = resourceRepository.findById(id).orElseThrow(() -> new ApiException("Resource not found"));
        return convertToEntityService.convertToResourceDto(resource);
    }

    @Override
    public int addNewResource(Resource toBeAdded) {
        resourceRepository.save(toBeAdded);
        return toBeAdded.getId();
    }

    @Override
    public Resource edit(int id, Resource resource) {
        Resource toBeEdited = resourceRepository.findById(id).get();
        toBeEdited.setCreationTime(resource.getCreationTime());
        toBeEdited.setArticle(toBeEdited.getArticle());
        toBeEdited.setContent(resource.getContent());
        toBeEdited.setTitle(resource.getTitle());
        toBeEdited.setResourceType(resource.getResourceType());
        toBeEdited.setUrl(resource.getUrl());
        toBeEdited.setDescription(resource.getDescription());
        resourceRepository.save(toBeEdited);
        return toBeEdited;
    }

    @Override
    public void deleteById(int id) {
        resourceRepository.deleteById(id);
    }
}
