import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RecipeChart = ({
  data,
  title,
  type = "line",
}) => {
  const ChartComponent =
    type === "line" ? LineChart : AreaChart;

  const DataComponent =
    type === "line" ? Line : Area;

  return (
    <div
      className="
        rounded-[32px]
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-6
      "
    >
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track your recipe publishing growth over time
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <ChartComponent data={data}>
          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#E2E8F0"
          />

          <XAxis
            dataKey="date"
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#94A3B8",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: "16px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            }}
            labelStyle={{
              color: "#0F172A",
              fontWeight: 600,
            }}
          />

          <DataComponent
            type="monotone"
            dataKey="count"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.12}
            strokeWidth={4}
            dot={{
              fill: "#f97316",
              strokeWidth: 0,
              r: 5,
            }}
            activeDot={{
              r: 8,
              fill: "#fb923c",
            }}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default RecipeChart;