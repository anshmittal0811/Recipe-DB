import React from "react";
import ReactApexChart from "react-apexcharts";
import { DonutChartData } from "../data/donutChartData";

interface DonutChartProps {
  data: DonutChartData[];
  title: string;
  colors?: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  colors = [
    "#171543", "#B6EC1E", "#4A4A8A", "#7D7DB1", "#FFD54F",
    "#FF8A65", "#4DB6AC", "#81C784", "#FFB74D", "#BA68C8",
    "#64B5F6", "#4DD0E1", "#FFD54F", "#A1887F", "#90A4AE",
    "#FF8A80", "#FFCC02", "#8BC34A", "#FF5722", "#9C27B0",
    "#2196F3", "#00BCD4", "#FF9800", "#795548", "#607D8B"
  ]
}) => {
  // Transform data for ApexCharts
  const series = data.map(item => item.value);
  const labels = data.map(item => item.name);

  // Calculate total for percentage calculations
  const total = series.reduce((sum, value) => sum + value, 0);

  const options = {
    chart: {
      type: "donut" as const,
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
    colors: colors,
    labels: labels,
    dataLabels: {
      enabled: false, // Disable data labels to show values only on hover
    },
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
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontFamily:
                'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
              fontWeight: "600",
              color: "#1A1A1A",
            },
            value: {
              show: true,
              fontSize: "16px",
              fontFamily:
                'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
              fontWeight: "700",
              color: "#171543",
              formatter: function (val: number | string) {
                const numVal = typeof val === 'string' ? parseInt(val) : val;
                return numVal.toLocaleString();
              },
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontFamily:
                'Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
              fontWeight: "600",
              color: "#1A1A1A",
              formatter: function (w: any) {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return total.toLocaleString();
              },
            },
          },
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
      custom: function({ series, seriesIndex, dataPointIndex, w }: any) {
        const value = series[seriesIndex];
        const label = w.globals.labels[seriesIndex];
        const percentage = ((value / total) * 100).toFixed(1);
        
        return `
          <div class="custom-tooltip" style="padding: 8px; background: white; border: 1px solid #ccc; border-radius: 4px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${label}</div>
            <div style="color: #666;">Value: ${value.toLocaleString()}</div>
            <div style="color: #171543; font-weight: bold;">Percentage: ${percentage}%</div>
          </div>
        `;
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
      markers: {
        size: 10,
        strokeWidth: 0,
        offsetX: -5,
        offsetY: 0,
      },
      itemMargin: {
        horizontal: 25,
      },
      itemStyle: {
        border: "1px solid #1A1A1A",
      },
      onItemClick: {
        toggleDataSeries: false,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom" as const,
            markers: {
              size: 8,
              strokeWidth: 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: {
              horizontal: 15,
              vertical: 5,
            },
          },
          plotOptions: {
            pie: {
              donut: {
                size: "50%",
              },
            },
          },
        },
      },
    ],
  };

    return (
    <div className="w-full bg-background rounded-lg px-6 pb-4">
      <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="relative">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={400}
        />
      </div>
    </div>
  );
};

export default DonutChart; 