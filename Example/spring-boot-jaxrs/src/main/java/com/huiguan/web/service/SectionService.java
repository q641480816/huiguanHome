package com.huiguan.web.service;

import com.huiguan.web.model.Section;

import java.util.List;
import java.util.Optional;

public interface SectionService {
    List<Section> findAll();
    Optional<Section> findById(int id);
    int addNewSection(Section toBeAdded);
    Section edit(int id, Section article);
    void deleteById(int id);
}
