package com.tech_job.TechJob.controller;

import com.tech_job.TechJob.model.Post;
import com.tech_job.TechJob.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/tech/job/")
@RestController
public class PostController {

    private final PostService service;

    public PostController(PostService service) {
        super();
        this.service = service;
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPost() {
        return new ResponseEntity<>(service.getAllPost(), HttpStatus.OK);
    }

    @PostMapping("/new/post")
    public ResponseEntity<Post> addNewPost(@RequestBody Post post){
        return new ResponseEntity<>(service.addNewPost(post),HttpStatus.OK);
    }
}
