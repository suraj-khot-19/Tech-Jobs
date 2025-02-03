package com.tech_job.TechJob.service;

import com.tech_job.TechJob.model.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPost();

    Post addNewPost(Post post);
}
