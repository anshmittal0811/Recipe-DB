import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';


export const useRecipeIngredients = (id: string | undefined) => {
  return useQuery({
    queryKey: ['recipe-ingredients', id],
    queryFn: () => recipeApi.getIngredients(Number(id)),
    enabled: !!id,
  });
}; 