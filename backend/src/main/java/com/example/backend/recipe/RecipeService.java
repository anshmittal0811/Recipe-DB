package com.example.backend.recipe;

import com.example.backend.common.dto.RegionCalorieAverageResponse;
import com.example.backend.common.dto.RegionRecipeCountResponse;
import com.example.backend.recipe.dto.RecipeIngredientResponse;
import com.example.backend.recipe.dto.RecipeResponse;
import com.example.backend.recipe.dto.RecipeSearchRequest;
import com.example.backend.recipe.entity.Recipe;
import com.example.backend.common.entity.RecipeNutrition;
import com.example.backend.common.RecipeIngredientRepository;
import com.example.backend.common.RecipeNutritionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    public Page<RecipeResponse> searchRecipes(RecipeSearchRequest req, Pageable pageable) {
        return recipeRepository.searchRecipes(
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
    }

    public RecipeResponse getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Recipe not found with id: " + id));

        return new RecipeResponse(
                recipe.getId(),
                recipe.getTitle(),
                recipe.getRegion(),
                recipe.getSubRegion(),
                recipe.getContinent(),
                recipe.getUrl(),
                recipe.getImgUrl(),
                recipe.getCalories(),
                recipe.getProtein(),
                recipe.getCarbohydrateByDifference(),
                recipe.getTotalTime(),
                recipe.getCookTime(),
                recipe.getPrepTime(),
                recipe.getServings(),
                recipe.getUtensils(),
                recipe.getProcesses()
        );
    }

    public RecipeNutrition getNutritionalValues(Long  recipeId)
    {
        return recipeNutritionRepository.findFirstByRecipeId(recipeId);
    }

    public List<RecipeIngredientResponse> getIngredientsByRecipeId(Long recipeId) {
        return recipeIngredientRepository.findByRecipeId(recipeId).stream()
                .map(ri -> new RecipeIngredientResponse(
                        ri.getId(),
                        ri.getIngredientPhrase(),
                        ri.getIngredientName(),
                        ri.getState(),
                        ri.getQuantity(),
                        ri.getUnit(),
                        ri.getTemperature(),
                        ri.getDOrF(),
                        ri.getSize(),
                        ri.getIngId(),
                        ri.getNdbId(),
                        ri.getMOrC()
                ))
                .collect(Collectors.toList());
    }

    public List<RegionRecipeCountResponse> getRecipeCountsByRegion() {
        return recipeRepository.countRecipesByRegion();
    }

    public List<RegionCalorieAverageResponse> getAverageCaloriesByRegion() {
        return recipeRepository.getAverageCaloriesByRegion();
    }
}
