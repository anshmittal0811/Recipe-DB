import { useState, useCallback } from "react";
import { INutritionFilters } from "../interfaces/NutritionFilters";
import { IRecipeQueryState } from "../interfaces/RecipeQueryState";



const initialNutritionFilters: Partial<INutritionFilters> = {
  energyMin: 0,
  carbohydratesMin: 0,
  proteinMin: 0,
  fatMin: 0,
};

const initialRecipeQueryState: IRecipeQueryState = {
  page: 1,
  size: 10,
  sort: "title",
};

export const useRecipeQuery = () => {
  const [queryState, setQueryState] = useState<IRecipeQueryState>(initialRecipeQueryState);

  // Update basic string fields
  const updateField = useCallback((field: keyof Pick<IRecipeQueryState, 'region' | 'continent' | 'title' | 'sort'>, value: string) => {
    setQueryState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Update array fields
  const updateArrayField = useCallback((
    field: keyof Pick<IRecipeQueryState, 'includeIngredients' | 'excludeIngredients' | 'includeCategories' | 'excludeCategories'>,
    value: string[]
  ) => {
    setQueryState(prev => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Add item to array field
  const addToArrayField = useCallback((
    field: keyof Pick<IRecipeQueryState, 'includeIngredients' | 'excludeIngredients' | 'includeCategories' | 'excludeCategories'>,
    item: string
  ) => {
    setQueryState(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), item],
    }));
  }, []);

  // Remove item from array field
  const removeFromArrayField = useCallback((
    field: keyof Pick<IRecipeQueryState, 'includeIngredients' | 'excludeIngredients' | 'includeCategories' | 'excludeCategories'>,
    item: string
  ) => {
    setQueryState(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter(i => i !== item),
    }));
  }, []);

  // Update nutrition filters
  const updateNutrition = useCallback((nutrition: Partial<INutritionFilters>) => {
    setQueryState(prev => ({
      ...prev,
      nutrition: {
        ...(prev.nutrition || initialNutritionFilters),
        ...nutrition,
      },
    }));
  }, []);

  // Update pagination
  const updatePagination = useCallback((page: number, size?: number) => {
    setQueryState(prev => ({
      ...prev,
      page,
      ...(size !== undefined && { size }),
    }));
  }, []);

  // Reset to initial state
  const resetQuery = useCallback(() => {
    setQueryState(initialRecipeQueryState);
  }, []);

  // Reset specific fields
  const resetField = useCallback((field: keyof IRecipeQueryState) => {
    setQueryState(prev => ({
      ...prev,
      [field]: initialRecipeQueryState[field],
    }));
  }, []);

  // Get query object for API calls
  const getQueryObject = useCallback((searchType?: string) => {
    const baseQuery = {
      page: queryState.page,
      size: queryState.size,
      sort: queryState.sort,
    };

    // Helper function to check if a value is empty
    const isEmpty = (value: any): boolean => {
      if (value === null || value === undefined || value === '') return true;
      if (Array.isArray(value)) return value.length === 0;
      return false;
    };

    // Helper function to conditionally add field if not empty
    const addIfNotEmpty = (obj: any, key: string, value: any) => {
      if (!isEmpty(value)) {
        obj[key] = value;
      }
    };

    const getNutritionQuery = () => {
      const nutritionQuery: any = { ...baseQuery };
        let nutritionFilters: { energyMin?: number; energyMax?: number; proteinMin?: number; proteinMax?: number; carbohydratesMin?: number; carbohydratesMax?: number; fatMin?: number; fatMax?: number } = { ...queryState.nutrition };
        
        if (queryState.nutrition && (queryState.nutrition.energyMin || queryState.nutrition.energyMax)) {
          nutritionFilters = {
            ...nutritionFilters,
            ...(queryState.nutrition.energyMin && { energyMin: queryState.nutrition.energyMin }),
            ...(queryState.nutrition.energyMax && { energyMax: queryState.nutrition.energyMax }),
          };
        }
        if (queryState.nutrition && (queryState.nutrition.proteinMin || queryState.nutrition.proteinMax)) {
          nutritionFilters = {
            ...nutritionFilters,
            ...(queryState.nutrition.proteinMin && { proteinMin: queryState.nutrition.proteinMin }),
            ...(queryState.nutrition.proteinMax && { proteinMax: queryState.nutrition.proteinMax }),
          };
        }
        if (queryState.nutrition && (queryState.nutrition.carbohydratesMin || queryState.nutrition.carbohydratesMax)) {
          nutritionFilters = {
            ...nutritionFilters,
            ...(queryState.nutrition.carbohydratesMin && { carbohydratesMin: queryState.nutrition.carbohydratesMin }),
            ...(queryState.nutrition.carbohydratesMax && { carbohydratesMax: queryState.nutrition.carbohydratesMax }),
          };
        }
        if (queryState.nutrition && (queryState.nutrition.fatMin || queryState.nutrition.fatMax)) {
          nutritionFilters = {
            ...nutritionFilters,
            ...(queryState.nutrition.fatMin && { fatMin: queryState.nutrition.fatMin }),
            ...(queryState.nutrition.fatMax && { fatMax: queryState.nutrition.fatMax }),
          };
        }
        
        if (Object.keys(nutritionFilters).length > 0) {
          nutritionQuery.nutrition = nutritionFilters;
        }
        return nutritionQuery;
    }

    // Only include fields relevant to the selected search type
    switch (searchType) {
      case "CUISINE":
        const cuisineQuery = { ...baseQuery };
        addIfNotEmpty(cuisineQuery, 'region', queryState.region);
        addIfNotEmpty(cuisineQuery, 'continent', queryState.continent);
        addIfNotEmpty(cuisineQuery, 'title', queryState.title);
        return cuisineQuery;

      case "INGREDIENT":
        const ingredientQuery = { ...baseQuery };
        addIfNotEmpty(ingredientQuery, 'includeIngredients', queryState.includeIngredients);
        addIfNotEmpty(ingredientQuery, 'excludeIngredients', queryState.excludeIngredients);
        return ingredientQuery;

      case "CATEGORY":
        const categoryQuery = { ...baseQuery };
        addIfNotEmpty(categoryQuery, 'includeCategories', queryState.includeCategories);
        addIfNotEmpty(categoryQuery, 'excludeCategories', queryState.excludeCategories);
        return categoryQuery;

      case "NUTRITION":
        return getNutritionQuery();

      case "ADVANCED":
        const advancedQuery = { ...baseQuery };
        addIfNotEmpty(advancedQuery, 'title', queryState.title);
        addIfNotEmpty(advancedQuery, 'region', queryState.region);
        addIfNotEmpty(advancedQuery, 'continent', queryState.continent);
        addIfNotEmpty(advancedQuery, 'includeIngredients', queryState.includeIngredients);
        addIfNotEmpty(advancedQuery, 'excludeIngredients', queryState.excludeIngredients);
        addIfNotEmpty(advancedQuery, 'includeCategories', queryState.includeCategories);
        addIfNotEmpty(advancedQuery, 'excludeCategories', queryState.excludeCategories);
        addIfNotEmpty(advancedQuery, 'nutrition', getNutritionQuery()?.nutrition);
        console.log(advancedQuery);
        return advancedQuery;

      default:
        return queryState;
    }
  }, [queryState]);

  return {
    queryState,
    updateField,
    updateArrayField,
    addToArrayField,
    removeFromArrayField,
    updateNutrition,
    updatePagination,
    resetQuery,
    resetField,
    getQueryObject,
  };
};