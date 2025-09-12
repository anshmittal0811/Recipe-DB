import React from 'react';
import { INutritionalValue } from '../interfaces/NutritionalValue';

interface NutritionalValueDisplayProps {
  nutritionalValue: INutritionalValue;
}

const NutritionalValueDisplay: React.FC<NutritionalValueDisplayProps> = ({ nutritionalValue }) => {
  // Helper function to format numbers
  const formatNumber = (value: string): string => {
    const num = parseFloat(value);
    return isNaN(num) ? '0' : num.toFixed(2);
  };

  // Helper function to get unit for different nutrients
  const getUnit = (nutrientName: string): string => {
    if (nutrientName.includes('energy')) return 'kcal';
    if (nutrientName.includes('protein') || nutrientName.includes('carbohydrate') || 
        nutrientName.includes('fat') || nutrientName.includes('fiber') || 
        nutrientName.includes('sugar')) return 'g';
    if (nutrientName.includes('vitamin') || nutrientName.includes('mineral')) return 'mg';
    if (nutrientName.includes('calcium') || nutrientName.includes('iron') || 
        nutrientName.includes('magnesium') || nutrientName.includes('phosphorus') || 
        nutrientName.includes('potassium') || nutrientName.includes('sodium') || 
        nutrientName.includes('zinc')) return 'mg';
    return 'g';
  };

  // Group nutrients by category
  const nutrientCategories = {
    'Energy': [
      { key: 'energyKcal', label: 'Energy (kcal)', value: nutritionalValue.energyKcal },
      { key: 'energyKj', label: 'Energy (kJ)', value: nutritionalValue.energyKj },
    ],
    'Macronutrients': [
      { key: 'protein', label: 'Protein', value: nutritionalValue.protein },
      { key: 'carbohydrate', label: 'Carbohydrates', value: nutritionalValue.carbohydrate },
      { key: 'totalFat', label: 'Total Fat', value: nutritionalValue.totalFat },
      { key: 'totalDietaryFiber', label: 'Dietary Fiber', value: nutritionalValue.totalDietaryFiber },
      { key: 'totalSugars', label: 'Total Sugars', value: nutritionalValue.totalSugars },
    ],
    'Minerals': [
      { key: 'calcium', label: 'Calcium', value: nutritionalValue.calcium },
      { key: 'iron', label: 'Iron', value: nutritionalValue.iron },
      { key: 'magnesium', label: 'Magnesium', value: nutritionalValue.magnesium },
      { key: 'phosphorus', label: 'Phosphorus', value: nutritionalValue.phosphorus },
      { key: 'potassium', label: 'Potassium', value: nutritionalValue.potassium },
      { key: 'sodium', label: 'Sodium', value: nutritionalValue.sodium },
      { key: 'zinc', label: 'Zinc', value: nutritionalValue.zinc },
      { key: 'copper', label: 'Copper', value: nutritionalValue.copper },
      { key: 'manganese', label: 'Manganese', value: nutritionalValue.manganese },
      { key: 'selenium', label: 'Selenium', value: nutritionalValue.selenium },
    ],
    'Vitamins': [
      { key: 'vitaminA', label: 'Vitamin A (RAE)', value: nutritionalValue.vitaminARae },
      { key: 'vitaminB12', label: 'Vitamin B12', value: nutritionalValue.vitaminB12 },
      { key: 'vitaminB6', label: 'Vitamin B6', value: nutritionalValue.vitaminB6 },
      { key: 'vitaminC', label: 'Vitamin C', value: nutritionalValue.vitaminC },
      { key: 'vitaminD', label: 'Vitamin D', value: nutritionalValue.vitaminD },
      { key: 'vitaminE', label: 'Vitamin E', value: nutritionalValue.vitaminE },
      { key: 'vitaminK', label: 'Vitamin K', value: nutritionalValue.vitaminK },
      { key: 'thiamin', label: 'Thiamin (B1)', value: nutritionalValue.thiamin },
      { key: 'riboflavin', label: 'Riboflavin (B2)', value: nutritionalValue.riboflavin },
      { key: 'niacin', label: 'Niacin (B3)', value: nutritionalValue.niacin },
      { key: 'pantothenicAcid', label: 'Pantothenic Acid (B5)', value: nutritionalValue.pantothenicAcid },
      { key: 'folate', label: 'Folate (DFE)', value: nutritionalValue.folateDfe },
    ],
    'Amino Acids': [
      { key: 'alanine', label: 'Alanine', value: nutritionalValue.alanine },
      { key: 'arginine', label: 'Arginine', value: nutritionalValue.arginine },
      { key: 'asparticAcid', label: 'Aspartic Acid', value: nutritionalValue.asparticAcid },
      { key: 'cystine', label: 'Cystine', value: nutritionalValue.cystine },
      { key: 'glutamicAcid', label: 'Glutamic Acid', value: nutritionalValue.glutamicAcid },
      { key: 'glycine', label: 'Glycine', value: nutritionalValue.glycine },
      { key: 'histidine', label: 'Histidine', value: nutritionalValue.histidine },
      { key: 'isoleucine', label: 'Isoleucine', value: nutritionalValue.isoleucine },
      { key: 'leucine', label: 'Leucine', value: nutritionalValue.leucine },
      { key: 'lysine', label: 'Lysine', value: nutritionalValue.lysine },
      { key: 'methionine', label: 'Methionine', value: nutritionalValue.methionine },
      { key: 'phenylalanine', label: 'Phenylalanine', value: nutritionalValue.phenylalanine },
      { key: 'proline', label: 'Proline', value: nutritionalValue.proline },
      { key: 'serine', label: 'Serine', value: nutritionalValue.serine },
      { key: 'threonine', label: 'Threonine', value: nutritionalValue.threonine },
      { key: 'tryptophan', label: 'Tryptophan', value: nutritionalValue.tryptophan },
      { key: 'tyrosine', label: 'Tyrosine', value: nutritionalValue.tyrosine },
      { key: 'valine', label: 'Valine', value: nutritionalValue.valine },
    ],
    'Fatty Acids': [
      { key: 'totalSaturatedFattyAcids', label: 'Total Saturated Fat', value: nutritionalValue.totalSaturatedFattyAcids },
      { key: 'totalMonounsaturatedFattyAcids', label: 'Total Monounsaturated Fat', value: nutritionalValue.totalMonounsaturatedFattyAcids },
      { key: 'totalPolyunsaturatedFattyAcids', label: 'Total Polyunsaturated Fat', value: nutritionalValue.totalPolyunsaturatedFattyAcids },
      { key: 'totalTransFattyAcids', label: 'Total Trans Fat', value: nutritionalValue.totalTransFattyAcids },
      { key: 'cholesterol', label: 'Cholesterol', value: nutritionalValue.cholesterol },
    ],
    'Other': [
      { key: 'water', label: 'Water', value: nutritionalValue.water },
      { key: 'ash', label: 'Ash', value: nutritionalValue.ash },
      { key: 'caffeine', label: 'Caffeine', value: nutritionalValue.caffeine },
      { key: 'alcohol', label: 'Alcohol', value: nutritionalValue.ethylAlcohol },
    ],
  };

  return (
    <div className="space-y-6">
      {Object.entries(nutrientCategories).map(([category, nutrients]) => (
        <div key={category} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nutrients.map(({ key, label, value }) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatNumber(value)} {getUnit(key)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionalValueDisplay; 