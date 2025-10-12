package com.example.backend.dto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryIngredientsResponse {
    private Long id;
    private String ingredient;
    private String image_url;
}
