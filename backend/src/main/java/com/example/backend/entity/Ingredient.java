package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ingredient {

    @Id
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "freq")
    private Integer freq;

    @Column(name = "similarity_achieved")
    private String similarityAchieved;

    @Column(name = "old_ing_id")
    private String oldIngId;

    @Column(name = "old_ing_name")
    private String oldIngName;

    @Column(name = "old_frequency")
    private String oldFrequency;

    @Column(name = "generic_name")
    private String genericName;

    @Column(name = "wiki_link")
    private String wikiLink;

    @Column(name = "wiki_image")
    private String wikiImage;

    @Column(name = "doubt")
    private String doubt;

    @Column(name = "\"10\"")
    private String ten; // Column name "10" is not valid as a variable, so using `ten`

    @Column(name = "category_f_db")
    private String categoryFDB;

    @Column(name = "category_d_rx")
    private String categoryDRx;

    @Column(name = "new_category")
    private String newCategory;

    @Column(name = "flavordb_link")
    private String flavorDbLink;

    @Column(name = "dietrx_link")
    private String dietRxLink;
}
