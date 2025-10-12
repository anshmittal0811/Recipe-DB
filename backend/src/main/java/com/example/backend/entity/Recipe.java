package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    private Long id;

    private double calories;

    @Column(name = "cook_time")
    private String cookTime;

    @Column(name = "prep_time")
    private String prepTime;

    private String servings;

    private String title;

    @Column(name = "total_time")
    private String totalTime;

    private String url;

    private String region;

    @Column(name = "sub_region")
    private String subRegion;

    private String continent;

    private String source;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "carbohydratebydifference(g)")
    private Double carbohydrates;

    @Column(name = "energy(kcal)")
    private Double energyKcal;

    @Column(name = "protein(g)")
    private Double protein;

    @Column(name = "totallipid(fat)(g)")
    private Double totalLipid;

    private String utensils;

    private String processes;

    private String vegan;

    private String pescetarian;

    @Column(name = "ovo_vegetarian")
    private String ovoVegetarian;

    @Column(name = "lacto_vegetarian")
    private String lactoVegetarian;

    @Column(name = "ovo_lacto_vegetarian")
    private String ovoLactoVegetarian;

}