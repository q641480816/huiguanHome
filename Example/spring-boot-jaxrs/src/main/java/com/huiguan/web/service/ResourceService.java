package com.huiguan.web.service;

import com.huiguan.web.model.Resource;

import java.util.List;
import java.util.Optional;

public interface ResourceService {
    List<Resource> findAll();
    Optional<Resource> findById(int id);
    int addNewResource(Resource toBeAdded);
    Resource edit(int id, Resource resource);
    void deleteById(int id);
}
