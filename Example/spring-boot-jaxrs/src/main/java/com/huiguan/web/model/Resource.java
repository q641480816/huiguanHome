package com.huiguan.web.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "url")
    private String url;

    @Column(name = "type")
    private int resourceType;

    public Resource(String url, int resourceType){
        this.url=url;
        this.resourceType = resourceType;
    }
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE},fetch = FetchType.EAGER)
    @JoinTable(name = "articles_resources",
            joinColumns = {@JoinColumn(
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
    private List<Article> articles = new ArrayList<>();

    public Resource(String url, int resourceType, List<Article> articles) {
        this.url = url;
        this.resourceType = resourceType;
        this.articles = articles;
    }
    public Resource(){}

}

