import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomSelect } from "./common/CustomSelect";
import CustomInput from "./common/CustomInput";
import CustomAutocomplete from "./common/CustomAutocomplete";
import CustomRangeSlider from "./common/CustomRangeSlider";
import { useRecipeQuery } from "../hooks/useRecipeQuery";

const RecipeQueryForm = () => {
  const navigate = useNavigate();
  const {
    queryState,
    updateField,
    addToArrayField,
    removeFromArrayField,
    updateNutrition,
    resetQuery,
    getQueryObject,
  } = useRecipeQuery();

  const queryTypes = [
    {
      name: "Cuisine",
      value: "CUISINE",
    },
    {
      name: "Ingredient",
      value: "INGREDIENT",
    },
    {
      name: "Category",
      value: "CATEGORY",
    },
    {
      name: "Nutrition",
      value: "NUTRITION",
    },
    {
      name: "Advanced",
      value: "ADVANCED",
    },
  ];

  const [searchQueryType, setSearchQueryType] = useState<{
    name: string;
    value: string;
  }>(queryTypes[0]);

  const [includeIngredient, setIncludeIngredient] = useState<string>("");
  const [excludeIngredient, setExcludeIngredient] = useState<string>("");
  const [includeCategory, setIncludeCategory] = useState<string>("");
  const [excludeCategory, setExcludeCategory] = useState<string>("");

  const regions = [
    "Middle Eastern",
    "Chinese and Mongolian",
    "Korean",
    "Greek",
    "Australian",
    "Caribbean",
    "Belgian",
    "Central American",
    "Rest Africa",
    "Italian",
    "South American",
    "Scandinavian",
    "US",
    "Deutschland",
    "Indian Subcontinent",
    "Canadian",
    "Japanese",
    "Southeast Asian",
    "Irish",
    "French",
    "Eastern European",
    "Spanish and Portuguese",
    "UK",
    "Mexican",
    "Thai",
    "Northern Africa",
  ];

  const continents = [
    "North American",
    "Latin American",
    "Australasian",
    "European",
    "Asian",
    "African",
  ];

  const categories = [
    "Beverage-Alcoholic",
    "Beverage",
    "Additive-Sugar",
    "Vegetable",
    "Dairy",
    "MISC-Utensil",
    "Dish",
    "Additive-Vinegar",
    "Cereal",
    "Herb",
    "Maize",
    "Legume",
    "Plant Derivative",
    "Condiment",
    "Additive",
    "Additive-Salt",
    "Fruit",
    "Bakery",
    "Fish",
    "Nuts and Seeds",
    "Meat",
    "MISC-Other",
    "Flower",
    "Seafood",
    "Additive-Yeast",
    "Essential Oil",
    "Spice",
    "Plant",
    "Fungi",
    "dish",
  ];

  const handleSearch = () => {
    const query = getQueryObject(searchQueryType.value);
    console.log("Search query:", query);
    // Navigate to recipes page with query state
    navigate("/recipes", { state: { queryState: query } });
  };

  const handleReset = () => {
    resetQuery();
    setIncludeIngredient("");
    setExcludeIngredient("");
    setIncludeCategory("");
    setExcludeCategory("");
  };

  return (
    <div className="space-y-6">
      {/* Mobile: Select dropdown */}
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

      {/* Desktop: Button group */}
      <div className="hidden md:flex justify-center items-center bg-[#F1F1F1] rounded-full px-1 py-1 shadow-sm w-fit">
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

      <div className="space-y-4">
        {searchQueryType.value === "CUISINE" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <CustomAutocomplete
                label="Region"
                value={queryState.region || ""}
                onChange={(value) => updateField("region", value)}
                placeholder="Select a region"
                options={regions}
                className="flex-1"
              />
              <CustomAutocomplete
                label="Continent"
                value={queryState.continent || ""}
                onChange={(value) => updateField("continent", value)}
                placeholder="Select a continent"
                options={continents}
                className="flex-1"
              />
              <CustomInput
                label="Recipe Title"
                type="text"
                value={queryState.title}
                onChange={(value) => updateField("title", value)}
                placeholder="e.g., Chicken Tikka Masala"
                className="flex-1"
              />
            </div>
          </div>
        )}

        {searchQueryType.value === "INGREDIENT" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Include Ingredients
                </label>
                <div className="flex gap-2">
                  <CustomInput
                    type="text"
                    value={includeIngredient}
                    onChange={setIncludeIngredient}
                    placeholder="Add ingredient"
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (includeIngredient.trim()) {
                        addToArrayField(
                          "includeIngredients",
                          includeIngredient.trim()
                        );
                        setIncludeIngredient("");
                      }
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.includeIngredients &&
                    queryState.includeIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {ingredient}
                        <button
                          onClick={() =>
                            removeFromArrayField(
                              "includeIngredients",
                              ingredient
                            )
                          }
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Exclude Ingredients
                </label>
                <div className="flex gap-2">
                  <CustomInput
                    type="text"
                    value={excludeIngredient}
                    onChange={setExcludeIngredient}
                    placeholder="Add ingredient"
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (excludeIngredient.trim()) {
                        addToArrayField(
                          "excludeIngredients",
                          excludeIngredient.trim()
                        );
                        setExcludeIngredient("");
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.excludeIngredients &&
                    queryState.excludeIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {ingredient}
                        <button
                          onClick={() =>
                            removeFromArrayField(
                              "excludeIngredients",
                              ingredient
                            )
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {searchQueryType.value === "CATEGORY" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Include Categories
                </label>
                <div className="flex gap-2">
                  <CustomAutocomplete
                    value={includeCategory}
                    onChange={setIncludeCategory}
                    placeholder="Select a category"
                    options={categories}
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (includeCategory.trim()) {
                        addToArrayField(
                          "includeCategories",
                          includeCategory.trim()
                        );
                        setIncludeCategory("");
                      }
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.includeCategories &&
                    queryState.includeCategories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {category}
                        <button
                          onClick={() =>
                            removeFromArrayField("includeCategories", category)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Exclude Categories
                </label>
                <div className="flex gap-2">
                  <CustomAutocomplete
                    value={excludeCategory}
                    onChange={setExcludeCategory}
                    placeholder="Select a category"
                    options={categories}
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (excludeCategory.trim()) {
                        addToArrayField(
                          "excludeCategories",
                          excludeCategory.trim()
                        );
                        setExcludeCategory("");
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.excludeCategories &&
                    queryState.excludeCategories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {category}
                        <button
                          onClick={() =>
                            removeFromArrayField("excludeCategories", category)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {searchQueryType.value === "NUTRITION" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <CustomRangeSlider
                  label="Energy (kcal)"
                  min={0}
                  max={1200}
                  minValue={queryState.nutrition?.energyMin || 0}
                  maxValue={queryState.nutrition?.energyMax || 0}
                  onMinChange={(value) => updateNutrition({ energyMin: value })}
                  onMaxChange={(value) => updateNutrition({ energyMax: value })}
                  step={50}
                />
              </div>

              <div className="space-y-2">
                <CustomRangeSlider
                  label="Protein (g)"
                  min={0}
                  max={200}
                  minValue={queryState.nutrition?.proteinMin || 0}
                  maxValue={queryState.nutrition?.proteinMax || 0}
                  onMinChange={(value) =>
                    updateNutrition({ proteinMin: value })
                  }
                  onMaxChange={(value) =>
                    updateNutrition({ proteinMax: value })
                  }
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <CustomRangeSlider
                  label="Carbohydrates (g)"
                  min={0}
                  max={700}
                  minValue={queryState.nutrition?.carbohydratesMin || 0}
                  maxValue={queryState.nutrition?.carbohydratesMax || 0}
                  onMinChange={(value) =>
                    updateNutrition({ carbohydratesMin: value })
                  }
                  onMaxChange={(value) =>
                    updateNutrition({ carbohydratesMax: value })
                  }
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <CustomRangeSlider
                  label="Fat (g)"
                  min={0}
                  max={200}
                  minValue={queryState.nutrition?.fatMin || 0}
                  maxValue={queryState.nutrition?.fatMax || 0}
                  onMinChange={(value) => updateNutrition({ fatMin: value })}
                  onMaxChange={(value) => updateNutrition({ fatMax: value })}
                  step={5}
                />
              </div>
            </div>
          </div>
        )}

        {searchQueryType.value === "ADVANCED" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <CustomAutocomplete
                label="Region"
                value={queryState.region || ""}
                onChange={(value) => updateField("region", value)}
                placeholder="Select a region"
                options={regions}
                className="flex-1"
              />
              <CustomAutocomplete
                label="Continent"
                value={queryState.continent || ""}
                onChange={(value) => updateField("continent", value)}
                placeholder="Select a continent"
                options={continents}
                className="flex-1"
              />
              <CustomInput
                label="Recipe Title"
                type="text"
                value={queryState.title}
                onChange={(value) => updateField("title", value)}
                placeholder="e.g., Chicken Tikka Masala"
                className="flex-1"
              />
            </div>

            {/* Include/Exclude Ingredients */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Include Ingredients
                </label>
                <div className="flex gap-2">
                  <CustomInput
                    type="text"
                    value={includeIngredient}
                    onChange={setIncludeIngredient}
                    placeholder="Add ingredient"
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (includeIngredient.trim()) {
                        addToArrayField(
                          "includeIngredients",
                          includeIngredient.trim()
                        );
                        setIncludeIngredient("");
                      }
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.includeIngredients &&
                    queryState.includeIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {ingredient}
                        <button
                          onClick={() =>
                            removeFromArrayField(
                              "includeIngredients",
                              ingredient
                            )
                          }
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Exclude Ingredients
                </label>
                <div className="flex gap-2">
                  <CustomInput
                    type="text"
                    value={excludeIngredient}
                    onChange={setExcludeIngredient}
                    placeholder="Add ingredient"
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (excludeIngredient.trim()) {
                        addToArrayField(
                          "excludeIngredients",
                          excludeIngredient.trim()
                        );
                        setExcludeIngredient("");
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.excludeIngredients &&
                    queryState.excludeIngredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {ingredient}
                        <button
                          onClick={() =>
                            removeFromArrayField(
                              "excludeIngredients",
                              ingredient
                            )
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Include/Exclude Categories */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Include Categories
                </label>
                <div className="flex gap-2">
                  <CustomAutocomplete
                    value={includeCategory}
                    onChange={setIncludeCategory}
                    placeholder="Select a category"
                    options={categories}
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (includeCategory.trim()) {
                        addToArrayField(
                          "includeCategories",
                          includeCategory.trim()
                        );
                        setIncludeCategory("");
                      }
                    }}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.includeCategories &&
                    queryState.includeCategories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {category}
                        <button
                          onClick={() =>
                            removeFromArrayField("includeCategories", category)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-primary">
                  Exclude Categories
                </label>
                <div className="flex gap-2">
                  <CustomAutocomplete
                    value={excludeCategory}
                    onChange={setExcludeCategory}
                    placeholder="Select a category"
                    options={categories}
                    className="flex-1"
                  />
                  <button
                    onClick={() => {
                      if (excludeCategory.trim()) {
                        addToArrayField(
                          "excludeCategories",
                          excludeCategory.trim()
                        );
                        setExcludeCategory("");
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {queryState.excludeCategories &&
                    queryState.excludeCategories.map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm flex items-center gap-1"
                      >
                        {category}
                        <button
                          onClick={() =>
                            removeFromArrayField("excludeCategories", category)
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                </div>
              </div>
            </div>

            {/* Nutrition Filters */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <CustomRangeSlider
                  label="Energy (kcal)"
                  min={0}
                  max={1200}
                  minValue={queryState.nutrition?.energyMin || 0}
                  maxValue={queryState.nutrition?.energyMax || 0}
                  onMinChange={(value) => updateNutrition({ energyMin: value })}
                  onMaxChange={(value) => updateNutrition({ energyMax: value })}
                  step={50}
                />
              </div>

              <div className="space-y-2">
                <CustomRangeSlider
                  label="Protein (g)"
                  min={0}
                  max={200}
                  minValue={queryState.nutrition?.proteinMin || 0}
                  maxValue={queryState.nutrition?.proteinMax || 0}
                  onMinChange={(value) =>
                    updateNutrition({ proteinMin: value })
                  }
                  onMaxChange={(value) =>
                    updateNutrition({ proteinMax: value })
                  }
                  step={5}
                />
              </div>

              <div className="space-y-2">
                <CustomRangeSlider
                  label="Carbohydrates (g)"
                  min={0}
                  max={700}
                  minValue={queryState.nutrition?.carbohydratesMin || 0}
                  maxValue={queryState.nutrition?.carbohydratesMax || 0}
                  onMinChange={(value) =>
                    updateNutrition({ carbohydratesMin: value })
                  }
                  onMaxChange={(value) =>
                    updateNutrition({ carbohydratesMax: value })
                  }
                  step={10}
                />
              </div>

              <div className="space-y-2">
                <CustomRangeSlider
                  label="Fat (g)"
                  min={0}
                  max={200}
                  minValue={queryState.nutrition?.fatMin || 0}
                  maxValue={queryState.nutrition?.fatMax || 0}
                  onMinChange={(value) => updateNutrition({ fatMin: value })}
                  onMaxChange={(value) => updateNutrition({ fatMax: value })}
                  step={5}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default RecipeQueryForm;
