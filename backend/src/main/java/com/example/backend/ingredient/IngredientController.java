package com.example.backend.ingredient;

import com.example.backend.ingredient.dto.CategoryIngredientsResponse;
import com.example.backend.ingredient.dto.IngredientCategoryResponse;
import com.example.backend.ingredient.dto.IngredientRecipesResponse;
import com.example.backend.ingredient.dto.IngredientResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/v1/ingredients")
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping()
    public ResponseEntity<List<IngredientCategoryResponse>> getIngredientCategory() {
        return ResponseEntity.ok(ingredientService.getIngredientWithCategory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredientResponse> getIngredientById(@PathVariable Long id) {
        return ResponseEntity.ok(ingredientService.getIngredientById(id));
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<CategoryIngredientsResponse>> getIngredientById(@PathVariable String category) {
        return ResponseEntity.ok(ingredientService.getTopIngredientsByCategory(category));
    }

    @GetMapping("/{ingredientId}/recipes")
    public ResponseEntity<List<IngredientRecipesResponse>> getRecipes(@PathVariable Long ingredientId) {
        List<IngredientRecipesResponse> ingredients = ingredientService.getRecipesByIngredient(ingredientId);
        return ResponseEntity.ok(ingredients);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> getIngredientSuggestions(
            @RequestParam String query,
            @RequestParam(defaultValue = "10") int limit) {

        if (query == null || query.trim().length() < 2) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<String> suggestions = ingredientService.findIngredientsByPartialName(query.trim(), limit);
        return ResponseEntity.ok(suggestions);
    }


}
