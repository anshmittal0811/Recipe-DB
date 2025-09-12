package com.example.backend.recipe.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeResponse {
    private Long id;
    private String title;
    private String region;
    private String subRegion;
    private String continent;
    private String url;
    private String imgUrl;
    private double calories;
    private double protein;
    private double carbohydrates;
    private String totalTime;
    private String cookTime;
    private String prepTime;
    private String servings;
    private String utensils;
    private String processes;
}
