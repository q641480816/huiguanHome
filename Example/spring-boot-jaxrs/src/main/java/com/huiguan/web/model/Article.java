package com.huiguan.web.model;
import lombok.Getter;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name="description")
    private String description;

    @Column(name="url")
    private String url;

    @Column(name="title")
    private String title;

    @Column(name="creation_time")
    private Timestamp creationTime;

    @Column(name="time")
    private Timestamp time;

    @ManyToMany(mappedBy = "articles", cascade = CascadeType.PERSIST,fetch=FetchType.EAGER)
    private Set<Resource> resources = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "sections_id", insertable = false, updatable = false)
    @JsonIgnore
    private Section section;

    public Article(String content, Timestamp creationTime){
        this.content=content;
        this.creationTime = creationTime;
    }
    public Article(){}
}
