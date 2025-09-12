export interface IRecipe {
    id: number;
    title: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    continent: string;
    cookTime: string;
    prepTime: string;
    totalTime: string;
    processes: string;
    region: string;
    servings: string;
    subRegion: string;
    imgUrl?: string;
    url?: string;
    utensils: string;
}

export interface IIngredientRecipe {
    recipe_id: number;
    recipe_name: string;
    ingredient_state: string;
    region: string;
    continent: string;
}
