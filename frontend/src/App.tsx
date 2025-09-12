import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./providers/QueryProvider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import About from "./pages/About";
import IngredientDetails from "./pages/IngredientDetails";
import HowToUse from "./pages/HowToUse";
import Receptors from "./pages/Receptors";
import FAQ from "./pages/FAQ";
import CategoryDetails from "./pages/CategoryDetails";

const App = () => {
  return (
    <QueryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="/category/:category" element={<CategoryDetails />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/receptors" element={<Receptors />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </QueryProvider>
  );
};

export default App;
