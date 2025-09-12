package com.example.backend.ingredient;

import com.example.backend.ingredient.dto.CategoryIngredientsResponse;
import com.example.backend.ingredient.dto.IngredientCategoryResponse;
import com.example.backend.ingredient.dto.IngredientRecipesResponse;
import com.example.backend.ingredient.dto.IngredientResponse;
import com.example.backend.ingredient.entity.Ingredient;
import com.example.backend.common.RecipeIngredientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    public List<IngredientCategoryResponse> getIngredientWithCategory() {
        return ingredientRepository.getIngredientAndCategory();
    }

    public List<String> findIngredientsByPartialName(String query, int limit) {
        String searchQuery = query.toLowerCase();
        return ingredientRepository.findIngredientNamesByPartialMatch(searchQuery, limit);
    }

    public IngredientResponse getIngredientById(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ingredient not found with id: " + id));

        return new IngredientResponse(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getFreq(),
                ingredient.getSimilarityAchieved(),
                ingredient.getOldIngId(),
                ingredient.getOldIngName(),
                ingredient.getOldFrequency(),
                ingredient.getGenericName(),
                ingredient.getWikiLink(),
                ingredient.getWikiImage(),
                ingredient.getDoubt(),
                ingredient.getTen(),
                ingredient.getCategoryFDB(),
                ingredient.getCategoryDRx(),
                ingredient.getNewCategory(),
                ingredient.getFlavorDbLink(),
                ingredient.getDietRxLink()
        );
    }

    public List<CategoryIngredientsResponse> getTopIngredientsByCategory(String category) {
        return ingredientRepository.findTop20ByCategory(category).stream()
                .map(response -> new CategoryIngredientsResponse(
                        response.getId(),
                        response.getIngredient(),
                        response.getImage_url()
                )).collect(Collectors.toList());
    }

    public List<IngredientRecipesResponse> getRecipesByIngredient(Long ingredientId) {
        return recipeIngredientRepository.findTop20RecipesByIngredient(ingredientId).stream()
                .map(response -> new IngredientRecipesResponse(
                        response.getRecipe_id(),
                        response.getRecipe_name(),
                        response.getIngredient_state(),
                        response.getRegion(),
                        response.getContinent()
                ))
                .collect(Collectors.toList());
    }

}
