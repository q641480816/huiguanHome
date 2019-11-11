package blog.services;

import blog.models.Resource;
import blog.repositories.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Resource findById(int id) {
        return resourceRepository.findOne(id);
    }

    @Override
    public int addNewResource(Resource beBeAdded) {
        resourceRepository.save(beBeAdded);
        return beBeAdded.getId();
    }

    @Override
    public Resource edit(int id, Resource resource) {
        Resource toBeEdited = resourceRepository.findOne(id);
        toBeEdited.setResourceType(resource.getResourceType());
        toBeEdited.setUrl(resource.getUrl());
        resourceRepository.save(toBeEdited);
        return toBeEdited;
    }

    @Override
    public void deleteById(int id) {
        resourceRepository.delete(id);
    }
}
