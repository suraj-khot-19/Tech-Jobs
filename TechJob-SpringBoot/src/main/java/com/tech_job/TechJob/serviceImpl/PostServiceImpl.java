package com.tech_job.TechJob.serviceImpl;

import com.tech_job.TechJob.model.Post;
import com.tech_job.TechJob.repository.PostRepository;
import com.tech_job.TechJob.service.PostService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository repo;

    public PostServiceImpl(PostRepository repo) {
        super();
        this.repo = repo;
    }

    @Override
    public List<Post> getAllPost() {
        return repo.findAll();
    }
}
