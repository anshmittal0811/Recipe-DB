package com.example.backend.repository;

import com.example.backend.entity.RecipeNutrition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeNutritionRepository extends JpaRepository<RecipeNutrition, Long> {
    RecipeNutrition findFirstByRecipeId(long id);
}
