import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { RecipeCountByRegion } from "../hooks/useRecipeCountByRegion";
import { RegionData } from "../hooks/useAvgCaloriesByRegion";

// Type definitions for react-simple-maps
interface GeographyProperties {
  name: string;
  [key: string]: any;
}

interface GeographyFeature {
  rsmKey: string;
  properties: GeographyProperties;
  [key: string]: any;
}

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";



// Props for the component
interface WorldHeatMapProps {
  data: RegionData[] | RecipeCountByRegion[];
  title?: string;
  valueKey?: string;
  colorScheme?: "green" | "blue" | "red" | "purple";
}

// Region to countries mapping
const regionToCountries: Record<string, string[]> = {
  Australian: ["Australia"],
  Belgian: ["Belgium"],
  Canadian: ["Canada"],
  Caribbean: [
    "Jamaica",
    "Haiti",
    "Dominican Republic",
    "Cuba",
    "Trinidad and Tobago",
  ],
  "Central American": [
    "Guatemala",
    "Honduras",
    "El Salvador",
    "Nicaragua",
    "Costa Rica",
    "Panama",
  ],
  "Chinese and Mongolian": ["China", "Mongolia"],
  Deutschland: ["Germany"],
  "Eastern European": [
    "Poland",
    "Czech Republic",
    "Slovakia",
    "Hungary",
    "Romania",
    "Bulgaria",
    "Ukraine",
    "Belarus",
    "Lithuania",
    "Latvia",
    "Estonia",
    "Russia",
  ],
  French: ["France"],
  Greek: ["Greece"],
  "Indian Subcontinent": [
    "India",
    "Pakistan",
    "Bangladesh",
    "Sri Lanka",
    "Nepal",
    "Bhutan",
  ],
  Irish: ["Ireland"],
  Italian: ["Italy"],
  Japanese: ["Japan"],
  Korean: ["South Korea", "North Korea"],
  Mexican: ["Mexico"],
  "Middle Eastern": [
    "Saudi Arabia",
    "Iran",
    "Iraq",
    "Syria",
    "Lebanon",
    "Jordan",
    "Israel",
    "Palestine",
    "Kuwait",
    "Qatar",
    "Bahrain",
    "Oman",
    "Yemen",
    "United Arab Emirates",
    "Turkey",
  ],
  "Northern Africa": ["Morocco", "Algeria", "Tunisia", "Libya", "Egypt"],
  "Rest Africa": [
    "Nigeria",
    "South Africa",
    "Kenya",
    "Ethiopia",
    "Ghana",
    "Uganda",
    "Tanzania",
    "Sudan",
    "Chad",
    "Niger",
    "Mali",
    "Burkina Faso",
    "Senegal",
    "Guinea",
    "Sierra Leone",
    "Liberia",
    "Ivory Coast",
    "Togo",
    "Benin",
    "Cameroon",
    "Central African Republic",
    "Democratic Republic of the Congo",
    "Republic of the Congo",
    "Gabon",
    "Equatorial Guinea",
    "Angola",
    "Zambia",
    "Zimbabwe",
    "Botswana",
    "Namibia",
    "Mozambique",
    "Malawi",
    "Zambia",
    "Madagascar",
    "Mauritius",
    "Seychelles",
    "Congo",
    "S. Sudan",
    "Mauritania",
    "Dem. Rep. Congo",
    "Central African Rep.",
    "Somalia",
    "Somaliland",
    "Rwanda",
    "Burundi",
    "Lesotho",
    "Côte d'Ivoire",
    "Guinea-Bissau",
    "W. Sahara",
  ],
  Scandinavian: ["Sweden", "Norway", "Denmark", "Finland", "Iceland"],
  "South American": [
    "Brazil",
    "Argentina",
    "Chile",
    "Peru",
    "Colombia",
    "Venezuela",
    "Ecuador",
    "Bolivia",
    "Paraguay",
    "Uruguay",
    "Guyana",
    "Suriname",
    "French Guiana",
  ],
  "Southeast Asian": [
    "Thailand",
    "Vietnam",
    "Cambodia",
    "Laos",
    "Myanmar",
    "Malaysia",
    "Singapore",
    "Indonesia",
    "Philippines",
    "Brunei",
  ],
  "Spanish and Portuguese": ["Spain", "Portugal"],
  Thai: ["Thailand"],
  UK: ["United Kingdom"],
  US: ["United States of America"],
};

// Color schemes
const colorSchemes = {
  green: [
    "#f4fbd2",
    "#e9f8c4",
    "#def5b6",
    "#d3f2a8",
    "#c8ef9a",
    "#bdee8b",
    "#b6ec1e",
    "#a8d518",
    "#9abf14",
    "#8ba910",
    "#7c940c",
    "#6d8008",
    "#5d6d05",
    "#4d5b02",
    "#3c4900",
    "#2d3900",
    "#202b00",
    "#151f00",
    "#0d1500",
    "#050b00",
  ],
  blue: [
    "#f7fbff",
    "#deebf7",
    "#c6dbef",
    "#9ecae1",
    "#6baed6",
    "#4292c6",
    "#2171b5",
    "#08519c",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
    "#083d56",
  ],
  red: [
    "#fff5f0",
    "#fee0d2",
    "#fcbba1",
    "#fc9272",
    "#fb6a4a",
    "#ef4538",
    "#d73027",
    "#b30000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
    "#7f0000",
  ],
  purple: [
    "#fcfbfd",
    "#efedf5",
    "#dadaeb",
    "#bcbddc",
    "#9e9ac8",
    "#807dba",
    "#6a51a3",
    "#54278f",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
    "#3f007d",
  ],
};

// Legend component
const Legend = ({
  colorRange,
  minValue,
  maxValue,
  title,
}: {
  colorRange: string[];
  minValue: number;
  maxValue: number;
  title: string;
}) => {
  const height = 30;

  return (
    <div className="text-center mt-2 mb-2 px-4">
      <div className="w-full max-w-2xl mx-auto">
        <svg width="100%" height={height + 20} viewBox={`0 0 400 ${height + 20}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {colorRange.map((color, i) => (
                <stop
                  key={i}
                  offset={`${(i / (colorRange.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          <rect
            x={0}
            y={0}
            width={400}
            height={height}
            rx={15}
            ry={15}
            fill="url(#colorGradient)"
            stroke="#ccc"
          />
          <text x="0" y={height + 15} className="text-xs font-semibold">
            {Math.round(minValue)}
          </text>
          <text x="200" y={height + 15} className="text-xs font-semibold" textAnchor="middle">
            {Math.round((minValue + maxValue) / 2)}
          </text>
          <text x="400" y={height + 15} className="text-xs font-semibold" textAnchor="end">
            {Math.round(maxValue)}
          </text>
        </svg>
        <div className="text-xs mt-1">{title}</div>
      </div>
    </div>
  );
};

// Main component
export default function WorldHeatMap({
  data,
  title = "Regional Data",
  valueKey = "averageCalories",
  colorScheme = "green",
}: WorldHeatMapProps) {
  // Create country to value mapping
  const countryValue: Record<string, number> = {};

  data.forEach((item) => {
    const region = item.region;
    const value = Number(item[valueKey as keyof typeof item]);
    const countries = regionToCountries[region] || [];

    countries.forEach((country) => {
      countryValue[country] = value;
    });
  });

  // Get min and max values for color scale
  const values = data.map((item) => Number(item[valueKey as keyof typeof item]));
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Create color scale
  const colorRange = colorSchemes[colorScheme];
  const colorScale = scaleQuantize<string>()
    .domain([minValue, maxValue])
    .range(colorRange);

  return (
    <div className="w-full h-full flex flex-col">
      <ReactTooltip id="tooltip" className="rounded-lg" />
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="flex-1 flex items-center justify-center">
       
        <ComposableMap
          style={{ width: "90%", height: "80%" }}
          projectionConfig={{ scale: 180 }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: GeographyFeature[] }) =>
              geographies.map((geo: GeographyFeature) => {
                const name = geo.properties.name;
                const val = countryValue[name] || 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={val ? colorScale(val) : "#EEE"}
                    stroke="#FFF"
                    data-tooltip-id="tooltip"
                    data-tooltip-html={`<strong>${name}</strong>: ${
                      val ? Math.round(val) : "No data"
                    }`}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "#FFD54F" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
      <div className="flex justify-center">
        <Legend
          colorRange={colorRange}
          minValue={minValue}
          maxValue={maxValue}
          title=""
        />
      </div>
    </div>
  );
}
