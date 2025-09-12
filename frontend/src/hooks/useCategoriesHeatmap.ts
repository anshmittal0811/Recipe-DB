import { useQuery } from '@tanstack/react-query';
import { categoriesHeatmapData, CategoryHeatmapData } from '../data/categoriesHeatmapData';

export interface CategoryHeatmapDataPoint {
  region: string;
  category: string;
  value: number;
}

export const useCategoriesHeatmap = () => {
  return useQuery({
    queryKey: ['categoriesHeatmap'],
    queryFn: async (): Promise<CategoryHeatmapData[]> => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return categoriesHeatmapData;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Helper function to transform data for heatmap visualization
export const transformCategoriesData = (data: CategoryHeatmapData[]): CategoryHeatmapDataPoint[] => {
  const transformed: CategoryHeatmapDataPoint[] = [];
  
  data.forEach(regionData => {
    const region = regionData.region;
    Object.entries(regionData).forEach(([key, value]) => {
      if (key !== 'region' && typeof value === 'number') {
        transformed.push({
          region,
          category: key,
          value
        });
      }
    });
  });
  
  return transformed;
}; 