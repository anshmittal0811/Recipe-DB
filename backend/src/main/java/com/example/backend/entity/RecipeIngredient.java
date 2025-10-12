package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recipe_ingredients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    @Column(name = "ingredient_phrase")
    private String ingredientPhrase;

    @Column(name = "ingredient_name")
    private String ingredientName;

    private String state;

    private String quantity;

    private String unit;

    private String temperature;

    @Column(name = "d_f")
    private String dOrF;

    private String size;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ing_id", nullable = false)
    private Ingredient ingredient;

    @Column(name = "ndb_id")
    private String ndbId;

    @Column(name = "m_or_c")
    private String mOrC;

}