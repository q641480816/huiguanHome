package com.huiguan.web.repository;

import com.huiguan.web.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionRepository extends JpaRepository<Section, Integer> {
    Section findByTitle(String title);
}
