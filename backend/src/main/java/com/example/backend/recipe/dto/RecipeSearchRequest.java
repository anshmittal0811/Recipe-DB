package com.example.backend.recipe.dto;

import com.example.backend.common.dto.NutritionFilter;
import lombok.*;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeSearchRequest {
    private String region;
    private String continent;
    private String title;

    private List<String> includeIngredients = new ArrayList<>();
    private List<String> excludeIngredients = new ArrayList<>();

    private List<String> includeCategories = new ArrayList<>();
    private List<String> excludeCategories = new ArrayList<>();

    private List<String> utensils = new ArrayList<>();
    private List<String> processes = new ArrayList<>();

    private NutritionFilter nutrition = new NutritionFilter();

    private Integer page = 1;
    private Integer size = 10;
    private String sort;
}