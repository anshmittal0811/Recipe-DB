import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About RecipeDB</h1>
          <p className="text-xl text-gray-600">
            Your ultimate destination for discovering, saving, and sharing delicious recipes
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            RecipeDB was created with a simple mission: to make cooking accessible, enjoyable, and 
            inspiring for everyone. Whether you're a seasoned chef or just starting your culinary journey, 
            we provide a platform where you can discover new recipes, organize your favorites, and 
            explore different cuisines from around the world.
          </p>
          <p className="text-gray-600">
            Our collection features thousands of carefully curated recipes, from quick weekday meals 
            to elaborate weekend feasts, ensuring there's something for every occasion and skill level.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Our intuitive interface makes it simple to browse, search, and save your favorite recipes 
              with just a few clicks.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">📱</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600">
              Access your recipes anywhere, anytime. Our responsive design works perfectly on all devices.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">🌍</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Cuisine</h3>
            <p className="text-gray-600">
              Explore recipes from different cultures and regions, bringing world flavors to your kitchen.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-orange-600 text-xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Updates</h3>
            <p className="text-gray-600">
              We constantly add new recipes and features to keep your cooking experience fresh and exciting.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-600">contact@recipedb.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Follow Us</h4>
              <p className="text-gray-600">@RecipeDB on social media</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 