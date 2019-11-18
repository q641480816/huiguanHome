package com.huiguan.web.service;

import com.huiguan.web.model.Section;
import com.huiguan.web.repository.ResourceRepository;
import com.huiguan.web.repository.SectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
@Primary
public class SectionServiceImpl implements SectionService{
    @Autowired
    private SectionRepository sectionRepository;
    @Override
    public List<Section> findAll() {
        return sectionRepository.findAll();
    }


    @Override
    @Transactional
    public Optional<Section> findById(int id) {
        return sectionRepository.findById(id);
    }

    @Override
    public int addNewSection(Section toBeAdded) {
        sectionRepository.save(toBeAdded);
        return toBeAdded.getId();
    }



    @Override
    public Section edit(int id, Section resource) {
        Section toBeEdited = sectionRepository.findById(id).get();
        toBeEdited.setArticles(toBeEdited.getArticles());
        toBeEdited.setTitle(resource.getTitle());
        toBeEdited.setUrl(resource.getUrl());
        sectionRepository.save(toBeEdited);
        return toBeEdited;
    }

    @Override
    public void deleteById(int id) {
        sectionRepository.deleteById(id);
    }
}
