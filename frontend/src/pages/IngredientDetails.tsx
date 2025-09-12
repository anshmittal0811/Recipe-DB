import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useIngredientDetails,
  useIngredientRecipes,
} from "../hooks/useIngredientDetails";

const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: ingredient, isLoading, error } = useIngredientDetails(id);
  const {
    data: recipes,
    isLoading: recipesLoading,
    error: recipesError,
  } = useIngredientRecipes(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              Loading ingredient details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="text-red-600 text-lg font-semibold mb-2">
              Error loading ingredient details
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!ingredient) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <div className="text-gray-600 text-lg font-semibold mb-2">
              Ingredient not found
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-primary hover:text-opacity-80 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {(ingredient.genericName || ingredient.name)
              .charAt(0)
              .toUpperCase() +
              (ingredient.genericName || ingredient.name).slice(1)}
          </h1>
          <p className="text-gray-600">
            ID: {ingredient.id} • Frequency: {ingredient.freq.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {ingredient.name.charAt(0).toUpperCase() +
                      ingredient.name.slice(1)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Generic Name
                  </label>
                  <p className="text-gray-900 font-medium">
                    {ingredient.genericName.charAt(0).toUpperCase() +
                      ingredient.genericName.slice(1)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Category
                  </label>
                  <button
                    onClick={() => {
                      const category = ingredient.newCategory?.length > 0 && !ingredient.newCategory.includes("Incorrect")
                        ? ingredient.newCategory
                        : ingredient?.categoryDRx;
                      if (category && category !== "-") {
                        // Extract only the first word (before hyphen or space)
                        const firstWord = category.split(/[- ]/)[0];
                        navigate(`/category/${firstWord.toLowerCase()}`);
                      }
                    }}
                    className="text-gray-900 font-medium hover:text-blue-600 hover:underline cursor-pointer flex items-center space-x-1"
                    disabled={!ingredient.newCategory?.length && !ingredient?.categoryDRx}
                  >
                    <span>
                      {ingredient.newCategory?.length > 0 && !ingredient.newCategory.includes("Incorrect")
                        ? ingredient.newCategory.charAt(0).toUpperCase() +
                          ingredient.newCategory.slice(1)
                        : ingredient?.categoryDRx ?? "-"}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Frequency
                  </label>
                  <p className="text-gray-900 font-medium">
                    {ingredient.freq.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recipes Table */}
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow">
                {(recipesLoading || recipesError) && (
                  <div className="px-6 py-4 border-b border-gray-200">
                    {recipesLoading && (
                      <div className="flex items-center mt-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600 text-sm">
                          Loading recipes...
                        </span>
                      </div>
                    )}
                    {recipesError && (
                      <div className="text-red-600 text-sm mt-2">
                        Error loading recipes: {recipesError.message}
                      </div>
                    )}
                  </div>
                )}

                {recipes && recipes.length > 0 ? (
                  <div className="overflow-auto max-h-96 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Recipe Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            State
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Region
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Continent
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg overflow-hidden">
                        {recipes.slice(0, 10).map((recipe) => (
                          <tr
                            key={recipe.recipe_id}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-sm font-medium text-gray-900 truncate max-w-[200px]"
                                onClick={() =>
                                  navigate(`/recipes/${recipe.recipe_id}`)
                                }
                              >
                                {recipe.recipe_name}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
                              >
                                {recipe.ingredient_state
                                  .charAt(0)
                                  .toUpperCase() +
                                  recipe.ingredient_state.slice(1) +
                                  " " +
                                  (recipe.ingredient_state
                                    ? ingredient.name
                                    : ingredient?.name.charAt(0).toUpperCase() +
                                      ingredient?.name.slice(1))}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {recipe.region}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {recipe.continent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500">
                      No recipes found for this ingredient.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Image
              </h3>
              <img
                src={
                  ingredient.wikiImage ||
                  "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg"
                }
                alt={ingredient.name}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg";
                }}
              />
            </div>

            {/* External Links */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                External Links
              </h3>
              <div className="space-y-3">
                {ingredient.wikiLink && (
                  <a
                    href={ingredient.wikiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-opacity-80"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Wikipedia
                  </a>
                )}
                {ingredient.flavorDbLink && (
                  <a
                    href={ingredient.flavorDbLink.split("~")[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-opacity-80"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    FlavorDB
                  </a>
                )}
                {ingredient.dietRxLink && (
                  <a
                    href={ingredient.dietRxLink.split("~")[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:text-opacity-80"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    DietRx
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
