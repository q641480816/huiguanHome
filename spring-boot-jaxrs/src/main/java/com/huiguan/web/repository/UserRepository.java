package com.huiguan.web.repository;//package blog.repositories;

import com.huiguan.web.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends
        JpaRepository<User, Integer> {
}
