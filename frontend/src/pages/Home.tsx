import React from "react";
import RadialIngredientGraph from "../components/RadialIngredientGraph";
import RecipeQueryForm from "../components/RecipeQueryForm";
import Statistics from "../components/Statistics";

const Home = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-text">Welcome to </span>
            <span className="text-primary">Recipe</span>
            <span className="text-secondary">DB</span>
          </span>
          <p className="text-xl text-gray-600 mb-8">
            A resource for exploring recipes and cooking ideas
          </p>
          <div className="mt-12">
            <div>
              <h1 className="text-left text-2xl font-bold text-gray-900">
                Summary
              </h1>
              <p className="text-gray-600 text-justify">
                Cooking is the act of turning nature into the culture which has
                enabled the advent of the omnivorous human diet. The cultural
                wisdom of processing raw ingredients into delicious dishes is
                embodied in their cuisines. Recipes thus are the cultural
                capsules that encode elaborate cooking protocols for evoking
                sensory satiation as well as providing nourishment. As we stand
                on the verge of an epidemic of diet-linked disorders, it is
                eminently important to investigate the culinary correlates of
                dietary elements to probe their association with sensory
                responses as well as consequences for nutrition and health.
                RecipeDB is a structured compilation of recipes, ingredients,
                and nutrition profiles interlinked with flavor profiles and
                health associations. The repertoire comprises of meticulous
                integration of over 1,18,000 recipes from cuisines across the
                globe (6 continents, 26 geo-cultural regions, and 74 countries),
                cooked using 268 processes (heat, cook, boil, simmer, bake,
                etc.), by blending over 23,500 ingredients from diverse
                categories, which are further linked to their flavor molecules
                (FlavorDB), nutritional profiles (USDA) and empirical records of
                disease associations obtained from Medline (DietRx). This
                resource is aimed at facilitating scientific explorations of the
                culinary space (recipe, ingredient, cooking processes, dietary
                styles, etc.) to taste attributes (flavor profile) and health
                (nutrition and disease associations) seeking for divergent
                applications.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-2xl font-bold text-gray-900">Visual Search</h1>
        <RadialIngredientGraph />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Search By</h1>
        <RecipeQueryForm />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Statistics</h1>
        <Statistics />
      </div>
    </div>
  );
};

export default Home;
