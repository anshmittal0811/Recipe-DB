import { useQuery } from '@tanstack/react-query';
import { recipeApi } from '../services/api';


export const useRecipeDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeApi.getById(Number(id)),
    enabled: !!id,
  });
}; 