package com.example.backend.controller;

import com.example.backend.dto.RegionCalorieAverageResponse;
import com.example.backend.dto.RegionRecipeCountResponse;
import com.example.backend.entity.RecipeNutrition;
import com.example.backend.service.RecipeService;
import com.example.backend.dto.RecipeIngredientResponse;
import com.example.backend.dto.RecipeResponse;
import com.example.backend.dto.RecipeSearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponse> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @GetMapping("/{recipeId}/ingredients")
    public ResponseEntity<List<RecipeIngredientResponse>> getIngredients(@PathVariable Long recipeId) {
        List<RecipeIngredientResponse> ingredients = recipeService.getIngredientsByRecipeId(recipeId);
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/{recipeId}/nutritional-values")
    public ResponseEntity<RecipeNutrition> getNutritionalValues(@PathVariable Long recipeId) {
        RecipeNutrition recipeNutrition = recipeService.getNutritionalValues(recipeId);
        return ResponseEntity.ok(recipeNutrition);
    }

    @PostMapping()
    public ResponseEntity<Page<RecipeResponse>> searchRecipes(
            @RequestBody RecipeSearchRequest request
    ) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize());
        Page<RecipeResponse> result = recipeService.searchRecipes(request, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/count-by-region")
    public ResponseEntity<List<RegionRecipeCountResponse>> getRecipeCountsByRegion() {
        List<RegionRecipeCountResponse> result = recipeService.getRecipeCountsByRegion();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/avg-calories-by-region")
    public ResponseEntity<List<RegionCalorieAverageResponse>> getAverageCaloriesByRegion() {
        return ResponseEntity.ok(recipeService.getAverageCaloriesByRegion());
    }

}