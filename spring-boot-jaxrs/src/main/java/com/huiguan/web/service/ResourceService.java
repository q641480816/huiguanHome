package com.huiguan.web.service;

import com.huiguan.web.dto.GetResourceResponse;
import com.huiguan.web.exception.ApiException;
import com.huiguan.web.model.Resource;

import java.util.List;
import java.util.Optional;

public interface ResourceService {
    List<Resource> findAll();
    GetResourceResponse findById(int id) throws ApiException;
    int addNewResource(Resource toBeAdded);
    Resource edit(int id, Resource resource);
    void deleteById(int id);
    void deleteAll();
}
