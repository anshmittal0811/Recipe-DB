# API Configuration

## Environment Variables

Create a `.env` file in the root directory with the following content:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Backend URL Configuration

The application is configured to work with a backend running on `localhost:8080` by default. You can change this by:

1. **For Development**: Update the `REACT_APP_API_URL` in your `.env` file
2. **For Production**: Set the environment variable on your hosting platform

## API Endpoints

The application expects the following API endpoints:

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe by ID
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `GET /api/search` - Search recipes with query parameters
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `GET /api/categories/:id/recipes` - Get recipes by category
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites/:id` - Add recipe to favorites
- `DELETE /api/favorites/:id` - Remove recipe from favorites

## React Query Features

- **Automatic Caching**: Data is cached for optimal performance
- **Background Refetching**: Data stays fresh automatically
- **Error Handling**: Graceful error states with retry logic
- **Loading States**: Proper loading indicators
- **Optimistic Updates**: UI updates immediately for better UX
- **DevTools**: React Query DevTools for debugging (in development)

## Usage

The application uses TanStack React Query for all API calls. Custom hooks are available in the `src/hooks/` directory:

- `useRecipes()` - Get all recipes
- `useSearchRecipes(params)` - Search recipes
- `useRecipe(id)` - Get specific recipe
- `useCategories()` - Get all categories
- `useFavorites()` - Get user favorites
- `useToggleFavorite()` - Toggle favorite status

All hooks include loading states, error handling, and automatic cache management. 