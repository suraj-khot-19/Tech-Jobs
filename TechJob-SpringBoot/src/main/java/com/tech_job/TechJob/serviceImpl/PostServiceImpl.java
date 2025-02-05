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
        Post post = repo.findById(id).orElse(null);
        if (post != null) {
            repo.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean updatePost(String id, Post updateThisPost) {
        Post post = repo.findById(id).orElse(null);

        if (post != null) {
            //desc
            if (updateThisPost.getDesc() != null)
                post.setDesc(updateThisPost.getDesc());
            //exp
            if (updateThisPost.getExp() != 0)
                post.setExp(updateThisPost.getExp());
            //profile
            if (updateThisPost.getProfile() != null)
                post.setProfile(updateThisPost.getProfile());
            //skills
            if (updateThisPost.getSkills() != null)
                post.setSkills(updateThisPost.getSkills());

            //save
            repo.save(post);

            return true;
        } else {
            return false;
        }
    }
}
