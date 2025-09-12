import { useQuery } from '@tanstack/react-query';
import { ingredientApi } from '../services/api';

// Query keys
export const ingredientDetailKeys = {
  all: ['ingredient-details'] as const,
  detail: (id: number) => [...ingredientDetailKeys.all, id] as const,
  recipes: (id: number) => [...ingredientDetailKeys.all, id, 'recipes'] as const,
};

// Hook to get ingredient details by ID
export const useIngredientDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ingredientDetailKeys.detail(Number(id)),
    queryFn: () => ingredientApi.getById(Number(id)),
    enabled: !!id && !isNaN(Number(id)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get recipes for a specific ingredient by ID
export const useIngredientRecipes = (id: string | undefined) => {
  return useQuery({
    queryKey: ingredientDetailKeys.recipes(Number(id)),
    queryFn: () => ingredientApi.getRecipes(Number(id)),
    enabled: !!id && !isNaN(Number(id)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 