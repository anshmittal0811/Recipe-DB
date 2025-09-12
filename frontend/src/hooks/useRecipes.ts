import { useQuery } from '@tanstack/react-query';
import { recipeApi, PaginatedResponse } from '../services/api';
import { IRecipe } from '../interfaces/Recipe';
import { IRecipeQueryState } from '../interfaces/RecipeQueryState';

export const useRecipes = (queryState: IRecipeQueryState | null) => {
  return useQuery({
    queryKey: ['recipes', queryState],
    queryFn: async (): Promise<PaginatedResponse<IRecipe>> => {
      return await recipeApi.searchWithQueryState(queryState);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 