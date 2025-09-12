import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, getHeaders } from '../config/api';

export interface RecipeCountByRegion {
  region: string;
  count: number;
}

const fetchRecipeCountByRegion = async (): Promise<RecipeCountByRegion[]> => {
  const response = await fetch(`${buildApiUrl('/api/v1/recipes/count-by-region')}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useRecipeCountByRegion = () => {
  return useQuery({
    queryKey: ['recipeCountByRegion'],
    queryFn: fetchRecipeCountByRegion,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 