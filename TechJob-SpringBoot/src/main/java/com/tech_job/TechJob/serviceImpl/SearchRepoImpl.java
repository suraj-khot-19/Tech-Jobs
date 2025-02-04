package com.tech_job.TechJob.serviceImpl;

import com.mongodb.client.*;
import com.tech_job.TechJob.model.Post;
import com.tech_job.TechJob.repository.SearchRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SearchRepoImpl implements SearchRepository {
    /// mongo client
    @Autowired
    MongoClient mongoClient;

    /// mongo data converter
    @Autowired
    MongoConverter converter;

    @Override
    public List<Post> searchByKey(String key) {
        /// final list of posts
        List<Post> posts = new ArrayList<>();

        /// pipeline logic from mongodb atlas
        MongoDatabase database = mongoClient.getDatabase("thesuraj");
        MongoCollection<Document> collection = database.getCollection("techjob");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                        new Document("text",
                                new Document("query", key)  /// passing key here as search key
                                        .append("path", Arrays.asList("skills", "profile", "desc")))),
                new Document("$sort",
                        new Document("exp", 1L)),
                new Document("$limit", 5L)));

        /// converting mongo data into arraylist
        result.forEach(doc -> posts.add(converter.read(Post.class, doc)));

        /// return posts
        return posts;
    }
}
