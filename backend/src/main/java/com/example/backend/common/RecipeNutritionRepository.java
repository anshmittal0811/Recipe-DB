package com.example.backend.common;

import com.example.backend.common.entity.RecipeNutrition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeNutritionRepository extends JpaRepository<RecipeNutrition, Long> {
    RecipeNutrition findFirstByRecipeId(long id);
}
