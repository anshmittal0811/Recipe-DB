package com.example.backend.repository;

import com.example.backend.dto.RecipeResponse;
import com.example.backend.dto.RegionCalorieAverageResponse;
import com.example.backend.dto.RegionRecipeCountResponse;
import com.example.backend.entity.Recipe;
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
        SELECT *
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
          AND (:energyMin IS NULL OR r."energy(kcal)" >= :energyMin)
          AND (:energyMax IS NULL OR r."energy(kcal)" <= :energyMax)
          AND (:carbohydratesMin IS NULL OR r."carbohydratebydifference(g)" >= :carbohydratesMin)
          AND (:carbohydratesMax IS NULL OR r."carbohydratebydifference(g)" <= :carbohydratesMax)
          AND (:proteinMin IS NULL OR r."protein(g)" >= :proteinMin)
          AND (:proteinMax IS NULL OR r."protein(g)" <= :proteinMax)
          AND (:fatMin IS NULL OR r."totallipid(fat)(g)" >= :fatMin)
          AND (:fatMax IS NULL OR r."totallipid(fat)(g)" <= :fatMax)
        )
        """,
            nativeQuery = true
    )
    Page<Recipe> searchRecipes(
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