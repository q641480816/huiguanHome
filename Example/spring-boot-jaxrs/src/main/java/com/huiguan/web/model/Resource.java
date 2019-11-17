package com.huiguan.web.model;



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

    @Column(name="description")
    private String description;

    @Column(name="title")
    private String title;

    @Column(name="content")
    @Type(type = "text")
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
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},fetch=FetchType.EAGER)
    @JsonIgnore
    @JoinTable(name = "articles_resources", joinColumns = {@JoinColumn(
                            name = "resources_id",
                            referencedColumnName = "id"
                    )
            },
            inverseJoinColumns = {@JoinColumn(
                            name = "articles_id",
                            referencedColumnName = "id"
                    )
            }
    )
    private Set<Article> articles = new HashSet<>();

    public Resource(String url, int resourceType, Set<Article> articles) {
        this.url = url;
        this.resourceType = resourceType;
        this.articles = articles;
    }
    public Resource(){}

}

