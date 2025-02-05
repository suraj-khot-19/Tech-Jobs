package com.tech_job.TechJob.controller;

import com.tech_job.TechJob.model.Post;
import com.tech_job.TechJob.service.PostService;
import com.tech_job.TechJob.serviceImpl.SearchRepoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/tech/job/")
@RestController
public class PostController {

    @Autowired
    PostService service;

    @Autowired
    SearchRepoImpl searchService;

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPost() {
        return new ResponseEntity<>(service.getAllPost(), HttpStatus.OK);
    }

    @PostMapping("/new/post")
    public ResponseEntity<Post> addNewPost(@RequestBody Post post) {
        return new ResponseEntity<>(service.addNewPost(post), HttpStatus.OK);
    }

    @GetMapping("posts/search/{key}")
    public ResponseEntity<List<Post>> searchByKey(@PathVariable(name = "key") String key) {
        return new ResponseEntity<>(searchService.searchByKey(key), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable(name = "id") String id){
        boolean isDeleted=service.deleteById(id);
        if (isDeleted)
            return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully!");
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job post not found!");
    }
}
