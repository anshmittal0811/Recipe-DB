package com.example.backend.recipe;

import com.example.backend.recipe.dto.RecipeResponse;
import com.example.backend.common.dto.RegionCalorieAverageResponse;
import com.example.backend.common.dto.RegionRecipeCountResponse;
import com.example.backend.recipe.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @Query(
            value = """
        SELECT DISTINCT r.id AS id,
               r.title AS title,
               r.region AS region,
               r.sub_region AS subRegion,
               r.continent AS continent,
               r.url AS url,
               r.img_url AS imgUrl,
               r.calories AS calories,
               r."protein(g)" AS protein,
               r."carbohydratebydifference(g)" AS carbohydrates,
               r.total_time AS totalTime,
               r.cook_time AS cookTime,
               r.prep_time AS prepTime,
               r.servings AS servings,
               r.utensils AS utensils,
               r.processes AS processes
        FROM recipes r
        WHERE (
          (:includeIngredientsIsEmpty = true OR EXISTS (
              SELECT 1 FROM recipe_ingredients ri
              WHERE ri.recipe_id = r.id AND ri.ingredient_name IN (:includeIngredients)
          ))
          AND
          (:excludeIngredientsIsEmpty = true OR NOT EXISTS (
              SELECT 1 FROM recipe_ingredients ri
              WHERE ri.recipe_id = r.id AND ri.ingredient_name IN (:excludeIngredients)
          ))
          AND
          (:includeCategoriesIsEmpty = true OR EXISTS (
              SELECT 1 FROM recipe_ingredients ri
              JOIN ingredients i ON ri.ing_id = i.id
              WHERE ri.recipe_id = r.id AND i."category_d_rx" IN (:includeCategories)
          ))
          AND
          (:excludeCategoriesIsEmpty = true OR NOT EXISTS (
              SELECT 1 FROM recipe_ingredients ri
              JOIN ingredients i ON ri.ing_id = i.id
              WHERE ri.recipe_id = r.id AND i."category_d_rx" IN (:excludeCategories)
          ))
          AND (:region IS NULL OR LOWER(r.region) = LOWER(:region))
          AND (:continent IS NULL OR LOWER(r.continent) = LOWER(:continent))
          AND (:title IS NULL OR LOWER(r.title) LIKE CONCAT('%', LOWER(:title), '%'))
          AND (:energyMin IS NULL OR "energy(kcal)" >= :energyMin)
          AND (:energyMax IS NULL OR "energy(kcal)" <= :energyMax)
          AND (:carbohydratesMin IS NULL OR "carbohydratebydifference(g)" >= :carbohydratesMin)
          AND (:carbohydratesMax IS NULL OR "carbohydratebydifference(g)" <= :carbohydratesMax)
          AND (:proteinMin IS NULL OR "protein(g)" >= :proteinMin)
          AND (:proteinMax IS NULL OR "protein(g)" <= :proteinMax)
          AND (:fatMin IS NULL OR "totallipid(fat)(g)" >= :fatMin)
          AND (:fatMax IS NULL OR "totallipid(fat)(g)" <= :fatMax)
        )
        """,
            nativeQuery = true
    )
    Page<RecipeResponse> searchRecipes(
            String region,
            String continent,
            String title,
            Double energyMin,
            Double energyMax,
            Double carbohydratesMin,
            Double carbohydratesMax,
            Double proteinMin,
            Double proteinMax,
            Double fatMin,
            Double fatMax,
            Boolean includeIngredientsIsEmpty,
            List<String> includeIngredients,
            Boolean excludeIngredientsIsEmpty,
            List<String> excludeIngredients,
            Boolean includeCategoriesIsEmpty,
            List<String> includeCategories,
            Boolean excludeCategoriesIsEmpty,
            List<String> excludeCategories,
            Boolean utensilsIsEmpty,
            List<String> utensils,
            Boolean processesIsEmpty,
            List<String> processes,
            Pageable pageable
    );

    Optional<Recipe> findById(Long id);

    @Query(value = """
        SELECT r.region AS region, COUNT(*) AS recipes
        FROM recipes r
        GROUP BY r.region
        ORDER BY recipes DESC
    """, nativeQuery = true)
    List<RegionRecipeCountResponse> countRecipesByRegion();

    @Query(value = """
        SELECT r.region AS region, AVG(r.calories) AS averageCalories
        FROM recipes r
        WHERE r.region IS NOT NULL
        GROUP BY r.region
        ORDER BY r.region
    """, nativeQuery = true)
    List<RegionCalorieAverageResponse> getAverageCaloriesByRegion();
}