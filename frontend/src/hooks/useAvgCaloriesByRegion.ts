import { useQuery } from '@tanstack/react-query';
import { buildApiUrl, getHeaders } from '../config/api';

export interface RegionData {
  region: string;
  averageCalories: number;
}

const fetchAvgCaloriesByRegion = async (): Promise<RegionData[]> => {
  const response = await fetch(`${buildApiUrl('/api/v1/recipes/avg-calories-by-region')}`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const useAvgCaloriesByRegion = () => {
  return useQuery({
    queryKey: ['avgCaloriesByRegion'],
    queryFn: fetchAvgCaloriesByRegion,
  });
}; 