package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IngredientRecipesResponse {
    private Long recipe_id;
    private String recipe_name;
    private String ingredient_state;
    private String region;
    private String continent;
}
