package com.huiguan.web.repository;

import com.huiguan.web.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ResourceRepository extends
        JpaRepository<Resource, Integer> {

    @Query("select r FROM Resource r WHERE r.id>0" )
    Set<Resource> getAllExceptInitial();
}

