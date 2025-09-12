import React from "react";
import ReactApexChart from "react-apexcharts";
import { CategoryHeatmapData } from "../data/categoriesHeatmapData";
import { categoryColumns } from "../data/categoriesHeatmapData";

interface CategoriesHeatmapProps {
  data: CategoryHeatmapData[];
  title?: string;
}

const CategoriesHeatmap: React.FC<CategoriesHeatmapProps> = ({
  data,
  title = "Ingredient Categories by Region",
}) => {
  // Transform data for ApexCharts heatmap
  const series = categoryColumns.map((category) => ({
    name: category,
    data: data.map((regionData) => ({
      x: regionData.region,
      y: (regionData[category] as number) || 0,
    })),
  }));

  const options = {
    chart: {
      type: "heatmap" as const,
      fontFamily:
        'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      background: "#F6F6F6",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#171543", "#B6EC1E"], // Primary to secondary gradient
    title: {
      align: "center" as const,
      style: {
        fontSize: "18px",
        fontWeight: "600",
        color: "#1A1A1A",
        fontFamily:
          'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      },
    },
    xaxis: {
      type: "category" as const,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily:
            'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
          colors: "#1A1A1A",
          fontWeight: "600",
        },
      },
      axisBorder: {
        color: "#E5E7EB",
      },
      axisTicks: {
        color: "#E5E7EB",
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "11px",
          fontFamily:
            'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
          colors: "#1A1A1A",
          fontWeight: "600",
        },
      },
      axisBorder: {
        color: "#E5E7EB",
      },
      axisTicks: {
        color: "#E5E7EB",
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 0,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    plotOptions: {
      heatmap: {
        radius: 2,
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: false,
        distributed: false,
        useFillColorAsStroke: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 5,
              color: "#171543",
              name: "0-5%",
            },
            {
              from: 5,
              to: 10,
              color: "#4A4A8A",
              name: "5-10%",
            },
            {
              from: 10,
              to: 15,
              color: "#7D7DB1",
              name: "10-15%",
            },
            {
              from: 15,
              to: 25,
              color: "#B6EC1E",
              name: "15-25%",
            },
          ],
        },
      },
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
        fontWeight: "600",
        fontFamily:
          'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      },
      y: {
        formatter: function (val: number) {
          return val.toFixed(2) + "%";
        },
      },
    },
    legend: {
      position: "right" as const,
      fontFamily:
        'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      fontSize: "12px",
      fontWeight: "600",
      labels: {
        colors: "#1A1A1A",
      },
    },
  };

  return (
    <div className="w-full bg-background rounded-lg px-6 pb-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="heatmap"
        height={450}
      />
    </div>
  );
};

export default CategoriesHeatmap;
