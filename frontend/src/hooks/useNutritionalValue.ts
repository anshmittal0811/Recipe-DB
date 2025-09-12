import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';

// Query keys
export const nutritionalValueKeys = {
  all: ['nutritional-values'] as const,
  detail: (id: number) => [...nutritionalValueKeys.all, id] as const,
};

// Hook to get nutritional value by recipe ID
export const useNutritionalValue = (id: string | undefined) => {
  return useQuery({
    queryKey: nutritionalValueKeys.detail(Number(id)),
    queryFn: () => recipeApi.getNutritionalValue(Number(id)),
    enabled: !!id && !isNaN(Number(id)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 