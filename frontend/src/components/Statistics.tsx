import React, { useState } from "react";
import { CustomSelect } from "./common/CustomSelect";
import WorldHeatMap from "./WorldHeatMap";
import CategoriesHeatmap from "./CategoriesHeatmap";
import DonutChart from "./DonutChart";
import { useAvgCaloriesByRegion } from "../hooks/useAvgCaloriesByRegion";
import { useRecipeCountByRegion } from "../hooks/useRecipeCountByRegion";
import { useCategoriesHeatmap } from "../hooks/useCategoriesHeatmap";
import { ingredientsData, processesData, utensilsData } from "../data/donutChartData";

const Statistics = () => {
  const statisticsTypes = [
    {
      name: "Recipes",
      value: "RECIPES",
    },
    {
      name: "Categories",
      value: "CATEGORIES",
    },
    {
      name: "Ingredients",
      value: "INGREDIENTS",
    },
    {
      name: "Nutrition",
      value: "NUTRITION",
    },
    {
      name: "Processes",
      value: "PROCESSES",
    },
    {
      name: "Utensils",
      value: "UTENSILS",
    },
  ];

  const [searchQueryType, setSearchQueryType] = useState<{
    name: string;
    value: string;
  }>(statisticsTypes[0]);

  // Fetch average calories by region data
  const { data: regionData, isLoading: loading, error } = useAvgCaloriesByRegion();
  
  // Fetch recipe count by region data
  const { 
    data: recipeCountData, 
    isLoading: recipeCountLoading, 
    error: recipeCountError 
  } = useRecipeCountByRegion();

  // Fetch categories heatmap data
  const { 
    data: categoriesData, 
    isLoading: categoriesLoading, 
    error: categoriesError 
  } = useCategoriesHeatmap();

  return (
    <div className="space-y-6">
      {/* Mobile: Select dropdown */}
      <div className="md:hidden">
        <CustomSelect
          options={statisticsTypes}
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

      {/* Desktop: Button group */}
      <div className="hidden md:flex justify-center items-center bg-[#F1F1F1] rounded-full px-1 py-1 shadow-sm w-fit">
        <div className="flex justify-center items-center space-x-6">
          {statisticsTypes.map((statisticsType) => (
            <button
              key={statisticsType.value}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                searchQueryType.value === statisticsType.value
                  ? "bg-white text-gray-900"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={() => setSearchQueryType(statisticsType)}
            >
              {statisticsType.name}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {searchQueryType.value === "RECIPES" && (
          <div className="space-y-4">
            {recipeCountLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {recipeCountError && (
              <div className="text-red-600 text-center py-4">
                Error loading data: {recipeCountError.message}
              </div>
            )}
            {!recipeCountLoading && !recipeCountError && recipeCountData && recipeCountData.length > 0 && (
              <div className="rounded-2xl shadow-lg p-4">
                <WorldHeatMap
                  data={recipeCountData}
                  title="Recipe Count by Region"
                  valueKey="recipes"
                  colorScheme="blue"
                />
              </div>
            )}
            {!recipeCountLoading && !recipeCountError && (!recipeCountData || recipeCountData.length === 0) && (
              <div className="text-gray-500 text-center py-4">
                No data available
              </div>
            )}
          </div>
        )}
        {searchQueryType.value === "CATEGORIES" && (
          <div className="space-y-4">
            {categoriesLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {categoriesError && (
              <div className="text-red-600 text-center py-4">
                Error loading data: {categoriesError.message}
              </div>
            )}
            {!categoriesLoading && !categoriesError && categoriesData && categoriesData.length > 0 && (
              <div className="rounded-2xl shadow-lg p-4">
                <CategoriesHeatmap
                  data={categoriesData}
                  title="Ingredient Categories Distribution by Region"
                />
              </div>
            )}
            {!categoriesLoading && !categoriesError && (!categoriesData || categoriesData.length === 0) && (
              <div className="text-gray-500 text-center py-4">
                No data available
              </div>
            )}
          </div>
        )}
        {searchQueryType.value === "INGREDIENTS" && (
          <div className="space-y-4">
            <div className="rounded-2xl shadow-lg p-4">
              <DonutChart
                data={ingredientsData}
                title="Number of ingredients across categories"
                colors={[
                  "#171543", "#B6EC1E", "#4A4A8A", "#7D7DB1", "#FFD54F",
                  "#FF8A65", "#4DB6AC", "#81C784", "#FFB74D", "#BA68C8",
                  "#64B5F6", "#4DD0E1", "#FFD54F", "#A1887F", "#90A4AE",
                  "#FF8A80", "#FFCC02", "#8BC34A", "#FF5722", "#9C27B0",
                  "#2196F3", "#00BCD4", "#FF9800", "#795548", "#607D8B"
                ]}
              />
            </div>
          </div>
        )}
        {searchQueryType.value === "NUTRITION" && (
          <div className="space-y-4">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            )}
            {error && (
              <div className="text-red-600 text-center py-4">
                Error loading data: {error.message}
              </div>
            )}
            {!loading && !error && regionData && regionData.length > 0 && (
              <div className="rounded-2xl shadow-lg p-4">
                <WorldHeatMap
                  data={regionData}
                  title="Average Calories by Region"
                  valueKey="averageCalories"
                  colorScheme="green"
                />
              </div>
            )}
            {!loading && !error && regionData && regionData.length === 0 && (
              <div className="text-gray-500 text-center py-4">
                No data available
              </div>
            )}
          </div>
        )}
        {searchQueryType.value === "PROCESSES" && (
          <div className="space-y-4">
            <div className="rounded-2xl shadow-lg p-4">
              <DonutChart
                data={processesData}
                title="Unique processes across recipes"
                colors={[
                  "#171543", "#B6EC1E", "#4A4A8A", "#7D7DB1", "#FFD54F",
                  "#FF8A65", "#4DB6AC", "#81C784", "#FFB74D", "#BA68C8",
                  "#64B5F6", "#4DD0E1", "#FFD54F", "#A1887F", "#90A4AE",
                  "#FF8A80", "#FFCC02", "#8BC34A", "#FF5722", "#9C27B0",
                  "#2196F3", "#00BCD4", "#FF9800", "#795548", "#607D8B"
                ]}
              />
            </div>
          </div>
        )}
        {searchQueryType.value === "UTENSILS" && (
          <div className="space-y-4">
            <div className="rounded-2xl shadow-lg p-4">
              <DonutChart
                data={utensilsData}
                title="Unique utensils across recipes"
                colors={[
                  "#171543", "#B6EC1E", "#4A4A8A", "#7D7DB1", "#FFD54F",
                  "#FF8A65", "#4DB6AC", "#81C784", "#FFB74D", "#BA68C8",
                  "#64B5F6", "#4DD0E1", "#FFD54F", "#A1887F", "#90A4AE",
                  "#FF8A80", "#FFCC02", "#8BC34A", "#FF5722", "#9C27B0",
                  "#2196F3", "#00BCD4", "#FF9800", "#795548", "#607D8B"
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
