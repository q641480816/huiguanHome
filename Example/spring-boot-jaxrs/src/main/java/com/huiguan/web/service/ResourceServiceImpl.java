package com.huiguan.web.service;


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
    @Override
    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }


    @Override
    @Transactional
    public Optional<Resource> findById(int id) {
        return resourceRepository.findById(id);
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
        toBeEdited.setArticles(toBeEdited.getArticles());
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
