declare module 'react-apexcharts' {
  import React from 'react';
  
  interface ApexOptions {
    chart?: {
      type?: string;
      fontFamily?: string;
      background?: string;
      toolbar?: {
        show?: boolean;
        tools?: {
          download?: boolean;
          selection?: boolean;
          zoom?: boolean;
          zoomin?: boolean;
          zoomout?: boolean;
          pan?: boolean;
          reset?: boolean;
        };
      };
    };
    dataLabels?: {
      enabled?: boolean;
      style?: {
        fontSize?: string;
        fontFamily?: string;
        fontWeight?: string;
        colors?: string[];
      };
      formatter?: (val: number, opts: any) => string;
    };
    colors?: string[];
    labels?: string[];
    title?: {
      text?: string;
      align?: 'left' | 'center' | 'right';
      style?: {
        fontSize?: string;
        fontWeight?: string;
        color?: string;
        fontFamily?: string;
      };
    };
    xaxis?: {
      type?: 'category' | 'datetime' | 'numeric';
      labels?: {
        style?: {
          fontSize?: string;
        };
      };
    };
    yaxis?: {
      labels?: {
        style?: {
          fontSize?: string;
        };
      };
    };
    plotOptions?: {
      heatmap?: {
        radius?: number;
        enableShades?: boolean;
        shadeIntensity?: number;
        reverseNegativeShade?: boolean;
        distributed?: boolean;
        useFillColorAsStroke?: boolean;
        colorScale?: {
          ranges?: Array<{
            from: number;
            to: number;
            color: string;
            name: string;
          }>;
        };
      };
      pie?: {
        donut?: {
          size?: string;
          labels?: {
            show?: boolean;
            name?: {
              show?: boolean;
              fontSize?: string;
              fontFamily?: string;
              fontWeight?: string;
              color?: string;
            };
            value?: {
              show?: boolean;
              fontSize?: string;
              fontFamily?: string;
              fontWeight?: string;
              color?: string;
              formatter?: (val: number | string) => string;
            };
            total?: {
              show?: boolean;
              label?: string;
              fontSize?: string;
              fontFamily?: string;
              fontWeight?: string;
              color?: string;
              formatter?: (w: any) => string;
            };
          };
        };
      };
    };
    tooltip?: {
      theme?: string;
      style?: {
        fontSize?: string;
        fontWeight?: string;
        fontFamily?: string;
      };
      y?: {
        formatter?: (val: number) => string;
      };
      custom?: (params: any) => string;
    };
    legend?: {
      position?: 'top' | 'right' | 'bottom' | 'left';
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      labels?: {
        colors?: string;
      };
      markers?: {
        width?: number;
        height?: number;
        radius?: number;
        size?: number;
        strokeWidth?: number;
        fillColors?: string[];
        shape?: string;
        offsetX?: number;
        offsetY?: number;
        customHTML?: () => any;
        onClick?: () => void;
      };
      itemMargin?: {
        horizontal?: number;
        vertical?: number;
      };
    };
    responsive?: Array<{
      breakpoint?: number;
      options?: any;
    }>;
  }

  interface ApexSeries {
    name: string;
    data: Array<{
      x: string;
      y: number;
    }>;
  }

  interface ReactApexChartProps {
    options: ApexOptions;
    series: ApexSeries[] | number[];
    type: string;
    height?: number | string;
    width?: number | string;
  }

  const ReactApexChart: React.FC<ReactApexChartProps>;
  export default ReactApexChart;
} 