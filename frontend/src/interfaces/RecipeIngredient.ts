export interface IRecipeIngredient {
    id: string;
    ingredientName: string;
    ingredientPhrase: string;
    quantity?: string;
    unit?: string;
    state?: string;
    temperature?: string;
    size: string;
    ingId: number;
    ndbId: string;
    dorF: string;
    morC: string;
}