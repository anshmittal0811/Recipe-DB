package com.example.backend.service;

import com.example.backend.dto.CategoryIngredientsResponse;
import com.example.backend.dto.IngredientCategoryResponse;
import com.example.backend.dto.IngredientRecipesResponse;
import com.example.backend.dto.IngredientResponse;
import com.example.backend.entity.Ingredient;
import com.example.backend.repository.IngredientRepository;
import com.example.backend.repository.RecipeIngredientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final ModelMapper modelMapper;

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
        return modelMapper.map(ingredient, IngredientResponse.class);
    }

    public List<CategoryIngredientsResponse> getTopIngredientsByCategory(String category) {
        return ingredientRepository.findTop20ByCategory(category).stream()
                .map(response -> modelMapper.map(response, CategoryIngredientsResponse.class))
                .collect(Collectors.toList());
    }

    public List<IngredientRecipesResponse> getRecipesByIngredient(Long ingredientId) {
        return recipeIngredientRepository.findTop20RecipesByIngredient(ingredientId).stream()
                .map(response -> modelMapper.map(response, IngredientRecipesResponse.class))
                .collect(Collectors.toList());
    }

}
