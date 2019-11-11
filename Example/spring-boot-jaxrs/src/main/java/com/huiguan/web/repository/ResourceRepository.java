package com.huiguan.web.repository;

import com.huiguan.web.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourceRepository extends
        JpaRepository<Resource, Integer> {

}

