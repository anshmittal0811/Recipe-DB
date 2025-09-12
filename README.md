# RecipeDB 🍳

A comprehensive recipe database and exploration platform that provides access to over 118,000 recipes from cuisines across the globe. RecipeDB enables data-driven explorations of recipes, ingredients, and nutritional profiles from 6 continents, 26 geo-cultural regions, and 74 countries.

## 🌟 Features

### Recipe Management
- **Recipe Search**: Advanced search with filters for region, ingredients, dietary preferences, and nutritional content
- **Recipe Details**: Comprehensive recipe information including ingredients, nutritional values, cooking processes, and dietary classifications
- **Visual Search**: Interactive radial ingredient graph for exploring recipe relationships
- **Regional Analysis**: Recipe count and calorie averages by geographical regions

### Ingredient Exploration
- **Ingredient Database**: Access to over 23,500 ingredients from diverse categories
- **Category-based Browsing**: Explore ingredients by categories
- **Recipe-Ingredient Relationships**: Find recipes that use specific ingredients
- **Autocomplete Support**: Smart ingredient suggestions

### Nutritional Analysis
- **Nutritional Profiles**: Detailed nutritional information for recipes and ingredients
- **Dietary Classifications**: Support for vegan, vegetarian, pescetarian, and other dietary preferences
- **Health Insights**: Integration with flavor molecules and health associations

### Data Visualization
- **World Heat Map**: Visual representation of recipe distribution across regions
- **Statistics Dashboard**: Comprehensive analytics and insights
- **Interactive Charts**: Donut charts, progress bars, and other visualizations

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **TanStack React Query** for data fetching and caching
- **ApexCharts** for data visualization
- **D3.js** for interactive graphics
- **React Simple Maps** for geographical visualizations

### Backend
- **Spring Boot 3.5.3** with Java 17
- **Spring Data JPA** for database operations
- **PostgreSQL** as the primary database
- **Lombok** for reducing boilerplate code
- **Maven** for dependency management

### Infrastructure
- **Docker Compose** for containerized services
- **PostgreSQL** database
- **Elasticsearch** for search capabilities
- **Kibana** for data visualization and monitoring

## 📁 Project Structure

```
RecipeDB/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Application pages
│   │   ├── services/       # API service layer
│   │   └── interfaces/     # TypeScript type definitions
│   └── package.json
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/example/backend/
│   │       ├── recipe/     # Recipe-related services
│   │       ├── ingredient/ # Ingredient management
│   │       ├── receptor/   # Flavor receptor data
│   │       └── common/     # Shared utilities
│   └── pom.xml
└── docker-compose.yml      # Infrastructure setup
```

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Docker and Docker Compose
- Maven 3.6 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RecipeDB
   ```

2. **Start the infrastructure services**
   ```bash
   cd backend
   docker-compose up -d
   ```
   This will start PostgreSQL, Elasticsearch, and Kibana services.

3. **Set up the database**
   ```bash
   # Import the database dump (if available)
   psql -h localhost -U user -d recipe_db -f ../dump.sql
   ```

4. **Start the backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   The backend will be available at `http://localhost:8080`

5. **Start the frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will be available at `http://localhost:3000`

### Environment Configuration

Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080
```

## 📊 Database Schema

The application uses a PostgreSQL database with the following main entities:
- **Recipes**: Core recipe information with nutritional data
- **Ingredients**: Ingredient catalog with categories
- **Recipe Ingredients**: Many-to-many relationship between recipes and ingredients
- **Recipe Nutrition**: Detailed nutritional profiles
- **Receptors**: Flavor and odor receptor data

## 🔧 API Endpoints

### Recipes
- `GET /api/v1/recipes/{id}` - Get recipe by ID
- `POST /api/v1/recipes` - Search recipes with filters
- `GET /api/v1/recipes/{id}/ingredients` - Get recipe ingredients
- `GET /api/v1/recipes/{id}/nutritional-values` - Get nutritional data
- `GET /api/v1/recipes/count-by-region` - Recipe count by region
- `GET /api/v1/recipes/avg-calories-by-region` - Average calories by region

### Ingredients
- `GET /api/v1/ingredients` - Get all ingredient categories
- `GET /api/v1/ingredients/{id}` - Get ingredient by ID
- `GET /api/v1/ingredients/category/{category}` - Get ingredients by category
- `GET /api/v1/ingredients/{id}/recipes` - Get recipes using ingredient
- `GET /api/v1/ingredients/autocomplete` - Ingredient autocomplete

### Receptors
- `GET /api/v1/receptors/taste` - Get taste receptors
- `GET /api/v1/receptors/odor` - Get odor receptors

## 🎯 Usage

1. **Explore Recipes**: Use the search functionality to find recipes by region, ingredients, or dietary preferences
2. **Visual Search**: Interact with the radial ingredient graph to discover recipe relationships
3. **Nutritional Analysis**: View detailed nutritional information for recipes and ingredients
4. **Regional Insights**: Explore recipe distribution and nutritional patterns across different regions
5. **Ingredient Research**: Browse ingredients by category and find recipes that use them

## 📝 License

This project is for personal use and educational purposes.

## 🙏 Acknowledgments

- Recipe data sourced from various culinary databases
- Nutritional information from USDA
- Flavor molecule data from FlavorDB
- Health associations from Medline (DietRx)

---

**Note**: This is a personal project for exploring recipe data and culinary patterns. The database contains a substantial collection of recipes from around the world, making it a valuable resource for culinary research and exploration.
