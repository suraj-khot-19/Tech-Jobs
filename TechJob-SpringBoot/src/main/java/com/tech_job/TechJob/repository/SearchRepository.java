package com.tech_job.TechJob.repository;

import com.tech_job.TechJob.model.Post;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchRepository {
    List<Post> searchByKey(String key);
}
