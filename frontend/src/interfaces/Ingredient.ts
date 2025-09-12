export interface IIngredient {
  id: number;
  name: string;
  freq: number;
  similarityAchieved: string;
  oldIngId: string;
  oldIngName: string;
  oldFrequency: string;
  genericName: string;
  wikiLink: string;
  wikiImage: string;
  doubt: string;
  ten: string;
  categoryFDB: string;
  categoryDRx: string;
  newCategory: string;
  flavorDbLink: string;
  dietRxLink: string;
}

export interface ICategoryIngredient {
  id: number;
  ingredient: string;
  image_url: string;
} 