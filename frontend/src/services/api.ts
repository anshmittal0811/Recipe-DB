import { buildApiUrl, getHeaders, API_ENDPOINTS } from '../config/api';
import { IRecipe, IIngredientRecipe } from '../interfaces/Recipe';
import { IRecipeIngredient } from '../interfaces/RecipeIngredient';
import { IRecipeQueryState } from '../interfaces/RecipeQueryState';
import { IIngredient, ICategoryIngredient } from '../interfaces/Ingredient';
import { IReceptor, ReceptorQueryParams } from '../interfaces/Receptor';
import { INutritionalValue } from '../interfaces/NutritionalValue';


export interface PaginatedResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  recipeCount: number;
  icon: string;
  color: string;
}

export interface IngredientCategory {
  ingredient: string;
  category: string;
}

export interface SearchParams {
  query?: string;
  category?: string;
  difficulty?: string;
  time?: string;
}

// API Response wrapper interface
interface ApiResponse<T> {
  timestamp: string;
  data: T;
}

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = buildApiUrl(endpoint);
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const jsonResponse: ApiResponse<T> = await response.json();
  return jsonResponse.data;
};

// Recipe API functions
export const recipeApi = {
  // Get all recipes
  getAll: async (): Promise<IRecipe[]> => {
    return apiRequest<IRecipe[]>(API_ENDPOINTS.RECIPES);
  },

  // Get recipe by ID
  getById: async (id: number): Promise<IRecipe> => {
    return apiRequest<IRecipe>(`${API_ENDPOINTS.RECIPES}/${id}`);
  },

  // Search recipes with RecipeQueryState and pagination
  searchWithQueryState: async (queryState: IRecipeQueryState | null): Promise<PaginatedResponse<IRecipe>> => {
    if (!queryState) {
      return apiRequest<PaginatedResponse<IRecipe>>(`${API_ENDPOINTS.RECIPES}`, {
        method: 'POST',
        body: JSON.stringify({}),
      });
    }
    
    return apiRequest<PaginatedResponse<IRecipe>>(`${API_ENDPOINTS.RECIPES}`, {
      method: 'POST',
      body: JSON.stringify(queryState),
    });
  },

  getIngredients: async (id: number): Promise<IRecipeIngredient[]> => {
    return apiRequest<IRecipeIngredient[]>(`${API_ENDPOINTS.RECIPES}/${id}/ingredients`);
  },

  // Get nutritional value for a recipe
  getNutritionalValue: async (id: number): Promise<INutritionalValue> => {
    return apiRequest<INutritionalValue>(`${API_ENDPOINTS.RECIPES}/${id}/nutritional-values`);
  },
};



// Ingredient API functions
export const ingredientApi = {
  // Get all ingredients with their categories
  getAll: async (): Promise<IngredientCategory[]> => {
    return apiRequest<IngredientCategory[]>(API_ENDPOINTS.INGREDIENTS);
  },

  // Get ingredient details by ID
  getById: async (id: number): Promise<IIngredient> => {
    return apiRequest<IIngredient>(`${API_ENDPOINTS.INGREDIENTS}/${id}`);
  },

  // Get recipes for a specific ingredient by ID
  getRecipes: async (id: number): Promise<IIngredientRecipe[]> => {
    return apiRequest<IIngredientRecipe[]>(`${API_ENDPOINTS.INGREDIENTS}/${id}/recipes`);
  },

  // Get ingredients by category
  getByCategory: async (category: string): Promise<ICategoryIngredient[]> => {
    return apiRequest<ICategoryIngredient[]>(`${API_ENDPOINTS.INGREDIENTS_BY_CATEGORY}/${category}`);
  },
};

// Receptor API functions
export const receptorApi = {
  // Get receptors by type (taste or odor) with pagination
  getByType: async (type: string, params: ReceptorQueryParams): Promise<IReceptor[]> => {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
    });
    
    return apiRequest<IReceptor[]>(`${API_ENDPOINTS.RECEPTORS}/${type}?${queryParams}`);
  },
};