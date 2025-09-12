import React, { useState } from "react";

interface SelectOption {
  name: string;
  value: string | number;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange: (selectedOption: SelectOption | null) => void;
  className?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    value
      ? options.find((option) => option.value === value) || options[0]
      : options[0]
  );

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(options[0]);
    onChange(options[0]);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative w-full px-3 py-2 text-left border border-primary rounded-md shadow-sm cursor-pointer
          ${
            disabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          }
        `}
        onClick={handleToggle}
      >
        <span
          className={`block truncate text-primary`}
        >
          {selectedOption.name}
        </span>

        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={`w-4 h-4 text-primary font-bold transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="#171543"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              No options available
            </div>
          ) : (
            options.map((option, index) => (
              <div
                key={option.value}
                className={`
                  px-3 py-2 text-sm cursor-pointer hover:bg-gray-100
                  ${
                    selectedOption?.value === option.value
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-900"
                  }
                `}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
