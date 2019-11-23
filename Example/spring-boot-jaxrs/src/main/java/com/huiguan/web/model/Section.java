package com.huiguan.web.model;

import lombok.Getter;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "sections")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title")
    private String title;

    @Column(name = "url")
    private String url;

    @OneToMany(cascade = CascadeType.PERSIST,fetch=FetchType.LAZY)
    @JoinColumn(name = "sections_id")
    @JsonIgnore
    private Set<Article> articles = new HashSet<>();

    public  Section() {}
}
