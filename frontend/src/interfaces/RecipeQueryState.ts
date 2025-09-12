import { INutritionFilters } from "./NutritionFilters";

export interface IRecipeQueryState {
    region?: string;
    continent?: string;
    title?: string;
    includeIngredients?: string[];
    excludeIngredients?: string[];
    includeCategories?: string[];
    excludeCategories?: string[];
    nutrition?: Partial<INutritionFilters>;
    page?: number;
    size?: number;
    sort?: string;
}
