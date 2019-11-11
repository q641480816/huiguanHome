package com.huiguan.web.service;


import com.huiguan.web.model.Resource;
import com.huiguan.web.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Primary
@Service
public class ResourceServiceImpl implements ResourceService{

    @Autowired
    private ResourceRepository resourceRepository;
    @Override
    public List<Resource> findAll() {
        return resourceRepository.findAll();
    }


    @Override
    public Optional<Resource> findById(int id) {
        return resourceRepository.findById(id);
    }

    @Override
    public int addNewResource(Resource beBeAdded) {
        resourceRepository.save(beBeAdded);
        return beBeAdded.getId();
    }

    @Override
    public Resource edit(int id, Resource resource) {
        Resource toBeEdited = resourceRepository.findById(id).get();
        toBeEdited.setResourceType(resource.getResourceType());
        toBeEdited.setUrl(resource.getUrl());
        resourceRepository.save(toBeEdited);
        return toBeEdited;
    }

    @Override
    public void deleteById(int id) {
        resourceRepository.deleteById(id);
    }
}
