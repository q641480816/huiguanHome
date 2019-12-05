package com.huiguan.web.model;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="content",columnDefinition ="MEDIUMTEXT")
    private String content;

    @Column(name="is_top")
    private Boolean isTop;

    @Column(name="description")
    @Type(type = "text")
    private String description;

    @Column(name="url")
    private String url;

    @Column(name="title")
    private String title;

    @Column(name="creation_time")
    private Timestamp creationTime;

    @Column(name="time")
    private Timestamp time;

    @OneToMany(cascade = CascadeType.ALL,fetch=FetchType.EAGER)
    @JoinColumn(name="resources_articles_fk")
    private Set<Resource> resources = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sections_id")
    @JsonIgnore
    private Section section;

    public Article(String content, Timestamp creationTime){
        this.content=content;
        this.creationTime = creationTime;
    }
    public Article(){}
}