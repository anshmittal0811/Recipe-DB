package com.example.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredientResponse {
    private Long id;
    private String name;
    private Integer freq;
    private String similarityAchieved;
    private String oldIngId;
    private String oldIngName;
    private String oldFrequency;
    private String genericName;
    private String wikiLink;
    private String wikiImage;
    private String doubt;
    private String ten;
    private String categoryFDB;
    private String categoryDRx;
    private String newCategory;
    private String flavorDbLink;
    private String dietRxLink;
}
