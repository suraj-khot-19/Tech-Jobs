package com.tech_job.TechJob.serviceImpl;

import com.tech_job.TechJob.model.Post;
import com.tech_job.TechJob.repository.PostRepository;
import com.tech_job.TechJob.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    PostRepository repo;

    @Override
    public List<Post> getAllPost() {
        return repo.findAll();
    }

    @Override
    public Post addNewPost(Post post) {
        return repo.save(post);
    }

    @Override
    public boolean deleteById(String id) {
        Post post=repo.findById(id).orElse(null);
        if (post!=null){
            repo.deleteById(id);
            return true;
        }
        else {
            return false;
        }
    }
}
