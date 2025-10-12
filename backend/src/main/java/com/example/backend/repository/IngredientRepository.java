package com.example.backend.repository;

import com.example.backend.dto.CategoryIngredientsResponse;
import com.example.backend.dto.IngredientCategoryResponse;
import com.example.backend.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query(value = """
    SELECT name AS ingredient, "category_d_rx" AS category
    FROM (
        SELECT name, "category_d_rx",
               ROW_NUMBER() OVER (PARTITION BY "category_d_rx" ORDER BY freq DESC) AS rn
        FROM ingredients
        WHERE "category_d_rx" IS NOT NULL
          AND TRIM("category_d_rx") <> ''
          AND "category_d_rx" NOT ILIKE '%MISC%'
          AND "category_d_rx" NOT IN (
              'Additive-Salt',
              'Additive-Sugar',
              'Additive-Vinegar',
              'Additive-Yeast'
          )
    ) sub
    WHERE rn <= 6
""", nativeQuery = true)
    List<IngredientCategoryResponse> getIngredientAndCategory();

    @Query(value = """
    SELECT i.name FROM ingredients i
        WHERE LOWER(i.name) LIKE CONCAT('%', :query, '%')
        ORDER BY
        CASE
          WHEN LOWER(i.name) LIKE CONCAT(:query, '%') THEN 1
          WHEN LOWER(i.name) LIKE CONCAT('%', :query, '%') THEN 2
          ELSE 3
        END,
        LENGTH(i.name),
        i.name
            LIMIT :limit""", nativeQuery = true)
    List<String> findIngredientNamesByPartialMatch(@Param("query") String query, @Param("limit") int limit);


    @Query(value = """
        SELECT i.id, i.name AS ingredient, i.wiki_image AS image_url
        FROM ingredients i
        WHERE LOWER(i.category_d_rx) = LOWER(:category)
        ORDER BY i.freq DESC
        LIMIT 20
    """, nativeQuery = true)
    List<CategoryIngredientsResponse> findTop20ByCategory(@Param("category") String category);

    Optional<Ingredient> findById(Long id);

}