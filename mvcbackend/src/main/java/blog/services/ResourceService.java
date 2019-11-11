package blog.services;

import blog.models.Resource;

import java.util.List;

public interface ResourceService {
    List<Resource> findAll();
    Resource findById(int id);
    int addNewResource(Resource toBeAdded);
    Resource edit(int id, Resource resource);
    void deleteById(int id);
}
