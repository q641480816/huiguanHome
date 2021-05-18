package com.huiguan.web.model;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="time")
    private Timestamp time;

    @Column(name="description")
    @Type(type = "text")
    private String description;

    @Column(name="title")
    private String title;

    @Column(name="content",columnDefinition ="MEDIUMTEXT")
    private String content;

    @Column(name = "url")
    private String url;

    @Column(name="creation_time")
    private Timestamp creationTime;

    @Column(name = "type")
    private int resourceType;

    public Resource(String url, int resourceType){
        this.url=url;
        this.resourceType = resourceType;
    }
//    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},fetch=FetchType.EAGER)
//    @JsonIgnore
//    @JoinTable(name = "articles_resources", joinColumns = {@JoinColumn(
//                            name = "resources_id",
//                            referencedColumnName = "id"
//                    )
//            },
//            inverseJoinColumns = {@JoinColumn(
//                            name = "articles_id",
//                            referencedColumnName = "id"
//                    )
//            }
//
    @ManyToOne(fetch=FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "resources_articles_fk")
    @JsonIgnore
    private Article article;

    public Resource(String url, int resourceType, Article article) {
        this.url = url;
        this.resourceType = resourceType;
        this.article = article;
    }
    public Resource(){}

}

