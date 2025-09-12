import { useQuery } from '@tanstack/react-query';
import { ingredientApi } from '../services/api';

// Query keys
export const ingredientKeys = {
  all: ['ingredients'] as const,
  lists: () => [...ingredientKeys.all, 'list'] as const,
  byCategory: (category: string) => [...ingredientKeys.all, 'category', category] as const,
};

// Hook to get all ingredients
export const useIngredients = () => {
  return useQuery({
    queryKey: ingredientKeys.lists(),
    queryFn: ingredientApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get ingredients by category
export const useIngredientsByCategory = (category: string) => {
  return useQuery({
    queryKey: ingredientKeys.byCategory(category),
    queryFn: () => ingredientApi.getByCategory(category),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!category,
  });
}; 