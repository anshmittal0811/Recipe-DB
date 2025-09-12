// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  TIMEOUT: 10000,
};

// API endpoints
export const API_ENDPOINTS = {
  RECIPES: '/api/v1/recipes',
  SEARCH: '/api/v1/search',
  INGREDIENTS: '/api/v1/ingredients',
  RECEPTORS: '/api/v1/receptors',
  INGREDIENTS_BY_CATEGORY: '/api/v1/ingredients/category',
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get headers
export const getHeaders = (): HeadersInit => {
  return {
    'Content-Type': 'application/json',
  };
}; 