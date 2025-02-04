package com.tech_job.TechJob.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "techjob")
public class Post {
    private String desc;
    private int exp;
    private String profile;
    private String[] skills;
}
