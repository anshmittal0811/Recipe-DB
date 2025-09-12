package com.example.backend.recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredientResponse {
    private Long id;
    private String ingredientPhrase;
    private String ingredientName;
    private String state;
    private String quantity;
    private String unit;
    private String temperature;
    private String dOrF;
    private String size;
    private Long ingId;
    private String ndbId;
    private String mOrC;
}
