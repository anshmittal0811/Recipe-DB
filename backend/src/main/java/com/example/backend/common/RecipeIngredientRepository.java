package com.example.backend.common;

import com.example.backend.ingredient.dto.IngredientRecipesResponse;
import com.example.backend.recipe.dto.RecipeIngredientResponse;
import com.example.backend.common.entity.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {

    @Query(value = """
    SELECT ri.id AS id,
           ri.ingredient_phrase AS ingredientPhrase,
           ri.ingredient_name AS ingredientName,
           ri.state AS state,
           ri.quantity AS quantity,
           ri.unit AS unit,
           ri.temperature AS temperature,
           ri.d_f AS dOrF,
           ri.size AS size,
           ri.ing_id AS ingId,
           ri.ndb_id AS ndbId,
           ri.m_or_c AS mOrC FROM recipe_ingredients ri WHERE ri.recipe_id = :recipeId
    """, nativeQuery = true)
    List<RecipeIngredientResponse> findByRecipeId(@Param("recipeId") Long recipeId);

    @Query(value = """
    SELECT r.id AS recipe_id,
           r.title AS recipe_name,
           ri.state AS ingredient_state,
           r.region AS region,
           r.continent AS continent
    FROM recipes r
    JOIN recipe_ingredients ri ON r.id = ri.recipe_id
    WHERE ri.ing_id = :ingredientId
    LIMIT 20
""", nativeQuery = true)
    List<IngredientRecipesResponse> findTop20RecipesByIngredient(@Param("ingredientId") Long ingredientId);
}
