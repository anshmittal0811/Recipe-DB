package com.example.backend.service;

import com.example.backend.dto.RegionCalorieAverageResponse;
import com.example.backend.dto.RegionRecipeCountResponse;
import com.example.backend.dto.RecipeIngredientResponse;
import com.example.backend.dto.RecipeResponse;
import com.example.backend.dto.RecipeSearchRequest;
import com.example.backend.entity.Recipe;
import com.example.backend.entity.RecipeNutrition;
import com.example.backend.repository.RecipeIngredientRepository;
import com.example.backend.repository.RecipeNutritionRepository;
import com.example.backend.repository.RecipeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final RecipeNutritionRepository recipeNutritionRepository;
    private final ModelMapper modelMapper;

    public Page<RecipeResponse> searchRecipes(RecipeSearchRequest req, Pageable pageable) {
        Page<Recipe> recipePage = recipeRepository.searchRecipes(
                req.getRegion(),
                req.getContinent(),
                req.getTitle(),

                req.getNutrition().getEnergyMin(),
                req.getNutrition().getEnergyMax(),
                req.getNutrition().getCarbohydratesMin(),
                req.getNutrition().getCarbohydratesMax(),
                req.getNutrition().getProteinMin(),
                req.getNutrition().getProteinMax(),
                req.getNutrition().getFatMin(),
                req.getNutrition().getFatMax(),

                req.getIncludeIngredients().isEmpty(),
                req.getIncludeIngredients(),
                req.getExcludeIngredients().isEmpty(),
                req.getExcludeIngredients(),
                req.getIncludeCategories().isEmpty(),
                req.getIncludeCategories(),
                req.getExcludeCategories().isEmpty(),
                req.getExcludeCategories(),

                req.getUtensils().isEmpty(),
                req.getUtensils(),
                req.getProcesses().isEmpty(),
                req.getProcesses(),
                pageable
        );

        return recipePage.map(recipe -> modelMapper.map(recipe, RecipeResponse.class));
    }

    public RecipeResponse getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found with id: " + id));

        return modelMapper.map(recipe, RecipeResponse.class);
    }

    public RecipeNutrition getNutritionalValues(Long  recipeId)
    {
        return recipeNutritionRepository.findFirstByRecipeId(recipeId);
    }

    public List<RecipeIngredientResponse> getIngredientsByRecipeId(Long recipeId) {
        return recipeIngredientRepository.findByRecipeId(recipeId).stream()
                .map(response -> modelMapper.map(response, RecipeIngredientResponse.class))
                .collect(Collectors.toList());
    }

    public List<RegionRecipeCountResponse> getRecipeCountsByRegion() {
        return recipeRepository.countRecipesByRegion();
    }

    public List<RegionCalorieAverageResponse> getAverageCaloriesByRegion() {
        return recipeRepository.getAverageCaloriesByRegion();
    }

}