import React from "react";

interface NutrientData {
  name: string;
  current: number;
  total: number;
  unit: string;
}

interface NutrientsProgressProps {
  nutrients: NutrientData[];
  title?: string;
  subtitle?: string;
}

const NutrientsProgress: React.FC<NutrientsProgressProps> = ({
  nutrients,
  title = "Nutritional Information",
  subtitle = "",
}) => {
  const calculateProgress = (current: number, total: number) => {
    return Math.min((current / total) * 100, 100);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </div>

      <div className="space-y-4">
        {nutrients.map((nutrient, index) => {
          const progress = calculateProgress(nutrient.current, nutrient.total);

          return (
            <div key={index} className="flex flex-col items-start w-full">
              <div className="flex items-center gap-2 w-full">
                <span className="font-bold text-gray-900 text-sm">
                  {nutrient.name}
                </span>
              </div>
              <div className="flex w-full gap-4">
                <div className="flex-1 flex items-center gap-2 h-10">
                  <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-lg relative"
                      style={{
                        width: `${progress}%`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 4px,
                          rgba(255,255,255,0.5) 4px,
                          rgba(255,255,255,0.5) 8px
                        )`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end min-w-fit">
                  <span className="font-bold text-gray-900 text-sm">
                    {nutrient.current.toFixed(2)}/{nutrient.total.toFixed(2)}
                    {nutrient.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutrientsProgress;
