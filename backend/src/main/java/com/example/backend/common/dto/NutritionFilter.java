package com.example.backend.common.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NutritionFilter {
    private Double energyMin;
    private Double energyMax;
    private Double carbohydratesMin;
    private Double carbohydratesMax;
    private Double proteinMin;
    private Double proteinMax;
    private Double fatMin;
    private Double fatMax;
}
