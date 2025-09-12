import { useQuery } from '@tanstack/react-query';
import { receptorApi } from '../services/api';
import { ReceptorQueryParams } from '../interfaces/Receptor';

export const useReceptors = (type: string, params: ReceptorQueryParams) => {
  return useQuery({
    queryKey: ['receptors', type, params],
    queryFn: () => receptorApi.getByType(type, params),
    enabled: !!type,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}; 