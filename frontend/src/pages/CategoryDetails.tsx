import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIngredientsByCategory } from '../hooks/useIngredients';
import { useRecipes } from '../hooks/useRecipes';
import { IRecipeQueryState } from '../interfaces/RecipeQueryState';

const CategoryDetails = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'recipes'>('ingredients');
  
  // Fetch ingredients by category
  const { data: ingredients, isLoading: ingredientsLoading, error: ingredientsError } = useIngredientsByCategory(category || '');
  
  // Create query state for recipes with the category
  const recipeQueryState: IRecipeQueryState = {
    includeCategories: category ? [category.charAt(0).toUpperCase() + category.slice(1)] : [],
    page: 1,
    size: 20
  };
  
  // Fetch recipes by category
  const { data: recipesData, isLoading: recipesLoading, error: recipesError } = useRecipes(recipeQueryState);

  if (ingredientsLoading || recipesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (ingredientsError || recipesError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Error loading data</div>
      </div>
    );
  }

  const firstTenIngredients = ingredients?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
            {category}
          </h1>
        </div>

        {/* Carousel - First 10 Ingredients */}
        {firstTenIngredients.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Ingredients</h2>
            <div className="relative">
              <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
                {firstTenIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/ingredients/${ingredient.id}`)}
                  >
                    <div className="h-32 bg-gray-200 overflow-hidden">
                      {ingredient.image_url ? (
                        <img
                          src={ingredient.image_url}
                          alt={ingredient.ingredient}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500 text-sm">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 text-center capitalize">
                        {ingredient.ingredient}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ingredients'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ingredients ({ingredients?.length || 0})
              </button>
              <button
                onClick={() => setActiveTab('recipes')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'recipes'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Recipes ({recipesData?.numberOfElements || 0})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">All Ingredients</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {ingredients?.map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                      onClick={() => navigate(`/ingredients/${ingredient.id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          {ingredient.image_url ? (
                            <img
                              src={ingredient.image_url}
                              alt={ingredient.ingredient}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-gray-900 capitalize">
                          {ingredient.ingredient}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recipes' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recipes</h3>
                {recipesData?.content && recipesData.content.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            Recipe Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            Region
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                            Continent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recipesData.content.map((recipe) => (
                          <tr 
                            key={recipe.id} 
                            className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                            onClick={() => navigate(`/recipes/${recipe.id}`)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {recipe.title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                              {recipe.region}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                              {recipe.continent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No recipes found for this category.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;