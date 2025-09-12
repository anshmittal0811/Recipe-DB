import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecipes } from "../hooks/useRecipes";
import { CustomSelect } from "../components/common/CustomSelect";
import { IRecipeQueryState } from "../interfaces/RecipeQueryState";

const Recipes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryState, setQueryState] = useState<IRecipeQueryState | null>(null);

  const { data: paginatedData, isLoading, error } = useRecipes(queryState);

  const recipes = paginatedData?.content || [];
  const totalPages = paginatedData?.totalPages || 0;
  const totalElements = paginatedData?.totalElements || 0;
  const currentPage = queryState?.page || 1;
  const pageSize = queryState?.size || 20;

  // Check for query state from navigation
  useEffect(() => {
    if (location.state?.queryState) {
      setQueryState(location.state.queryState);
    }
  }, [location.state]);

  const clearFilters = () => {
    setQueryState(null);
  };

  const handlePageChange = (newPage: number) => {
    setQueryState((prev) =>
      prev
        ? { ...prev, page: newPage }
        : {
            page: newPage,
            size: 10,
            sort: "title",
          }
    );
  };

  const handlePageSizeChange = (newSize: number) => {
    setQueryState((prev) =>
      prev
        ? { ...prev, size: newSize, page: 1 }
        : {
            page: 1,
            size: newSize,
            sort: "title",
          }
    );
  };

  const handleViewRecipe = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between mt-6">
        <div />

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                1
              </button>
              {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
            </>
          )}

          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 text-sm border rounded-md ${
                pageNum === currentPage
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Recipes</h1>

          {/* Display Query State */}
          {queryState && (
            <div className="mb-6 p-4 bg-primary bg-opacity-10 border border-primary rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Search Filters Applied:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {queryState.title && (
                  <div className="text-sm">
                    <span className="font-medium text-primary">Title:</span>{" "}
                    {queryState.title}
                  </div>
                )}
                {queryState.region && (
                  <div className="text-sm">
                    <span className="font-medium text-primary">Region:</span>{" "}
                    {queryState.region}
                  </div>
                )}
                {queryState.continent && (
                  <div className="text-sm">
                    <span className="font-medium text-primary">
                      Continent:
                    </span>{" "}
                    {queryState.continent}
                  </div>
                )}
                {queryState.includeIngredients &&
                  queryState.includeIngredients.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium text-primary">
                        Include Ingredients:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {queryState.includeIngredients.map(
                          (ingredient, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs"
                            >
                              {ingredient}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {queryState.excludeIngredients &&
                  queryState.excludeIngredients.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium text-primary">
                        Exclude Ingredients:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {queryState.excludeIngredients.map(
                          (ingredient, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs"
                            >
                              {ingredient}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                {queryState.includeCategories &&
                  queryState.includeCategories.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium text-primary">
                        Include Categories:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {queryState.includeCategories.map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {queryState.excludeCategories &&
                  queryState.excludeCategories.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium text-primary">
                        Exclude Categories:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {queryState.excludeCategories.map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                {queryState.nutrition && (
                  <div className="text-sm">
                    <span className="font-medium text-primary">
                      Nutrition Filters:
                    </span>
                    {/* {JSON.stringify(queryState.nutrition.energyMin)} */}
                    <div className="mt-1 space-y-1">
                      {'energyMin' in queryState.nutrition && 'energyMax' in queryState.nutrition && (
                        <div>
                          Energy: {queryState.nutrition.energyMin}-
                          {queryState.nutrition.energyMax} kcal
                        </div>
                      )}
                      {'proteinMin' in queryState.nutrition && 'proteinMax' in queryState.nutrition && (
                        <div>
                          Protein: {queryState.nutrition.proteinMin}-
                          {queryState.nutrition.proteinMax} g
                        </div>
                      )}
                      {'carbohydratesMin' in queryState.nutrition && 'carbohydratesMax' in queryState.nutrition && (
                        <div>
                          Carbs: {queryState.nutrition.carbohydratesMin}-
                          {queryState.nutrition.carbohydratesMax} g
                        </div>
                      )}
                      {'fatMin' in queryState.nutrition && 'fatMax' in queryState.nutrition && (
                        <div>
                          Fat: {queryState.nutrition.fatMin}-
                          {queryState.nutrition.fatMax} g
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="mt-3 px-3 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary/80 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Loading recipes...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Error: {error.message}</p>
            </div>
          )}

          {/* Recipe Results */}
          {!isLoading && !error && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    Showing {(currentPage - 1) * pageSize + 1} to{" "}
                    {Math.min(currentPage * pageSize, totalElements)} of{" "}
                    {totalElements} results
                  </span>
                  <CustomSelect
                    options={[
                      { name: "10 per page", value: "10" },
                      { name: "20 per page", value: "20" },
                      { name: "50 per page", value: "50" },
                    ]}
                    value={pageSize?.toString()}
                    onChange={(value) =>
                      handlePageSizeChange(Number(value?.value))
                    }
                    className="w-40"
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {totalElements} recipe{totalElements !== 1 ? "s" : ""} found
                  {totalPages > 1 &&
                    ` (showing page ${currentPage} of ${totalPages})`}
                </span>
              </div>

              {recipes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {queryState
                      ? "No recipes found matching your criteria."
                      : "No recipes available."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto max-w-full rounded-md shadow-md">
                  <table className="w-full">
                    <thead className="bg-primary text-white text-left">
                      <tr>
                        <th className="p-2">TITLE</th>
                        <th className="p-2">REGION</th>
                        <th className="p-2">CONTINENT</th>
                        <th className="p-2">SERVINGS</th>
                        <th className="p-2">CALORIES</th>
                        <th className="p-2">PROTEIN</th>
                        <th className="p-2">MORE INFO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipes.map((recipe, index) => (
                        <tr
                          key={recipe.id}
                          className={`${
                            index % 2 === 0
                              ? "bg-primary bg-opacity-5"
                              : "bg-white"
                          }`}
                        >
                          <td className="p-2 font-semibold">{recipe.title}</td>
                          <td className="p-2">{recipe.region}</td>
                          <td className="p-2">{recipe.continent}</td>
                          <td className="p-2">{recipe.servings}</td>
                          <td className="p-2">{recipe.calories?.toFixed(2)}</td>
                          <td className="p-2">{recipe.protein?.toFixed(2)}</td>
                          <td className="p-2">
                            <button 
                              onClick={() => handleViewRecipe(recipe.id.toString())}
                              className="px-4 py-2 rounded-full bg-secondary font-semibold text-black text-sm hover:bg-opacity-80 transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
