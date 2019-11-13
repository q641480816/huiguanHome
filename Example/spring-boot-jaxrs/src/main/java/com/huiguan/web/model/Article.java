package com.huiguan.web.model;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Array;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="content")
    @Type(type = "text")
    private String content;

    @Column(name="creation_time")
    private Timestamp creationTime;

    @ManyToMany(mappedBy = "articles", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    private List<Resource> resources = new ArrayList<>();

    public Article(String content, Timestamp creationTime){
        this.content=content;
        this.creationTime = creationTime;
    }
    public Article(){}
}
