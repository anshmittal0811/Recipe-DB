import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NutrientsProgress from "../components/NutrientsProgress";
import { CustomSelect } from "../components/common/CustomSelect";
import { useRecipeDetails } from "../hooks/useRecipeDetails";
import { useRecipeIngredients } from "../hooks/useRecipeIngredients";
import { useNutritionalValue } from "../hooks/useNutritionalValue";
import NutritionalValueDisplay from "../components/NutritionalValueDisplay";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryTypes = [
    { value: "ingredient", name: "Ingredient" },
    { value: "processes-utensils", name: "Processes & Utensils" },
    { value: "nutritional-values", name: "Nutritional Values" },
  ];
  const [searchQueryType, setSearchQueryType] = useState(queryTypes[0]);

  // Use React Query hooks
  const {
    data: recipe,
    isLoading: isRecipeLoading,
    error: recipeError,
  } = useRecipeDetails(id);

  const { data: ingredients = [], isLoading: isIngredientsLoading } =
    useRecipeIngredients(id);

  const {
    data: nutritionalValue,
    isLoading: isNutritionalValueLoading,
    error: nutritionalValueError,
  } = useNutritionalValue(id);

  const isLoading = isRecipeLoading || isIngredientsLoading || isNutritionalValueLoading;
  const error = recipeError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">
              Loading recipe details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
              onClick={() => navigate("/recipes")}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Back to Recipes
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Recipe Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The recipe you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/recipes")}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Back to Recipes
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
            onClick={() => navigate("/recipes")}
            className="mb-4 flex items-center text-primary hover:text-primary/80 transition-colors"
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
            Back to Recipes
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {recipe.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-600">
            <span>{recipe.region}</span>
            <span>•</span>
            <span>{recipe.continent}</span>
            <span>•</span>
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <img
            src={
              recipe.imgUrl ||
              "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg"
            }
            alt={recipe.title}
            className="h-[20rem] w-full object-cover rounded-2xl"
            onError={(e) => {
              e.currentTarget.src =
                "https://www.mimisrecipes.com/wp-content/uploads/2018/12/recipe-placeholder-featured.jpg";
            }}
          />

          {/* Nutrition Information */}
          <div className="w-full">
            <NutrientsProgress
              nutrients={[
                {
                  name: "Calories",
                  current: recipe.calories || 0,
                  total: 2000,
                  unit: "",
                },
                {
                  name: "Carbohydrates",
                  current: recipe.carbohydrates || 0,
                  total: 1000,
                  unit: "",
                },
                {
                  name: "Proteins",
                  current: recipe.protein || 0,
                  total: 500,
                  unit: "",
                },
              ]}
            />
          </div>
        </div>

        <div>
          {/* Ingredients Table */}
          <div className="mt-12">
            <div className="md:hidden">
              <CustomSelect
                options={queryTypes}
                value={searchQueryType.value}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setSearchQueryType(
                      selectedOption as {
                        name: string;
                        value: string;
                      }
                    );
                  }
                }}
              />
            </div>
            <div className="hidden md:flex justify-center items-center bg-[#F1F1F1] rounded-full px-1 py-1 shadow-sm">
              <div className="flex justify-center items-center space-x-6">
                {queryTypes.map((queryType) => (
                  <button
                    key={queryType.value}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      searchQueryType.value === queryType.value
                        ? "bg-white text-gray-900"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                    onClick={() => setSearchQueryType(queryType)}
                  >
                    {queryType.name}
                  </button>
                ))}
              </div>
            </div>
            {searchQueryType.value === "ingredient" ? (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ingredients
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="max-h-80 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ingredient
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            State
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Temperature
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ingredients.map((ingredient) => (
                          <tr key={ingredient.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <button
                                className="text-sm font-medium text-gray-900"
                                onClick={() =>
                                  navigate(`/ingredients/${ingredient.ingId}`)
                                }
                              >
                                {ingredient.ingredientName
                                  .charAt(0)
                                  .toUpperCase() +
                                  ingredient.ingredientName.slice(1)}
                              </button>
                              <div className="text-sm text-gray-500">
                                {ingredient.ingredientPhrase}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ingredient.quantity || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ingredient.unit || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ingredient.state || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ingredient.temperature || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : searchQueryType.value === "nutritional-values" ? (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Nutritional Value
                </h2>
                {nutritionalValueError ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">
                      Error loading nutritional data: {nutritionalValueError.message}
                    </p>
                  </div>
                ) : nutritionalValue ? (
                  <NutritionalValueDisplay nutritionalValue={nutritionalValue} />
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <p className="text-gray-500">No nutritional data available</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Processes & Utensils
                </h2>
                <div className="bg-white rounded-lg shadow overflow-hidden p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Processes */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Processes
                      </h3>
                      {recipe.processes ? (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {recipe.processes
                            .split("||")
                            .map((process: string) => process.trim())
                            .filter(
                              (
                                process: string,
                                index: number,
                                array: string[]
                              ) => array.indexOf(process) === index
                            )
                            .map((process: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900 capitalize">
                                  {process}
                                </span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No processes available
                        </p>
                      )}
                    </div>

                    {/* Utensils */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Utensils
                      </h3>
                      {recipe.utensils ? (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {recipe.utensils
                            .split("||")
                            .map((utensil: string) => utensil.trim())
                            .filter(
                              (
                                utensil: string,
                                index: number,
                                array: string[]
                              ) => array.indexOf(utensil) === index
                            )
                            .map((utensil: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-sm font-medium text-gray-900 capitalize">
                                  {utensil}
                                </span>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No utensils available
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
