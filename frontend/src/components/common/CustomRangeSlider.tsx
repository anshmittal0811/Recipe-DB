import React, { useState, useRef, useEffect } from "react";

interface CustomRangeSliderProps {
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  label?: string;
  step?: number;
  className?: string;
}

export const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  label,
  step = 1,
  className = "",
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const getValueFromPercentage = (percentage: number) => {
    return Math.round((percentage / 100) * (max - min) + min);
  };

  const handleMouseDown = (e: React.MouseEvent, thumb: "min" | "max") => {
    setIsDragging(thumb);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const value = getValueFromPercentage(percentage);

    if (isDragging === "min") {
      const newMinValue = Math.min(value, maxValue - step);
      onMinChange(newMinValue);
    } else {
      const newMaxValue = Math.max(value, minValue + step);
      onMaxChange(newMaxValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, minValue, maxValue]);

  const minPercentage = getPercentage(minValue);
  const maxPercentage = getPercentage(maxValue);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-primary mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {/* Track */}
        <div
          ref={sliderRef}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        >
          {/* Selected range */}
          <div
            className="absolute h-2 bg-primary rounded-full"
            style={{
              left: `${minPercentage}%`,
              width: `${maxPercentage - minPercentage}%`,
            }}
          />
          
          {/* Min thumb */}
          <div
            className="absolute w-4 h-4 bg-primary rounded-full shadow-md cursor-pointer transform -translate-y-1 hover:scale-110 transition-transform"
            style={{ left: `${minPercentage}%` }}
            onMouseDown={(e) => handleMouseDown(e, "min")}
          />
          
          {/* Max thumb */}
          <div
            className="absolute w-4 h-4 bg-primary rounded-full shadow-md cursor-pointer transform -translate-y-1 hover:scale-110 transition-transform"
            style={{ left: `${maxPercentage - 2 >= 0 ? maxPercentage - 2 : 0}%` }}
            onMouseDown={(e) => handleMouseDown(e, "max")}
          />
        </div>
        
        {/* Value labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          <span>{minValue}</span>
          <span>{maxValue}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomRangeSlider; 