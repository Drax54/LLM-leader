
import React from 'react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { cn } from "@/lib/utils";

interface ModelData {
  id: string;
  name: string;
  color: string;
  [key: string]: any;
}

interface LineChartProps {
  data: Record<string, Record<string, number>> | any;
  models: ModelData[];
  selectedModels: string[];
  metric: string;
  metricName: string;
  className?: string;
}

const LineChart = ({
  data,
  models,
  selectedModels,
  metric,
  metricName,
  className
}: LineChartProps) => {
  // Transform data for the line chart
  const chartData = Object.keys(data).map(category => {
    const categoryData: any = { category };
    selectedModels.forEach(modelId => {
      if (data[category] && data[category][modelId] !== undefined) {
        categoryData[modelId] = data[category][modelId];
      } else {
        categoryData[modelId] = 0;
      }
    });
    return categoryData;
  });

  return (
    <div className={cn("w-full glass-panel rounded-xl p-6", className)}>
      <h3 className="text-lg font-medium mb-6 text-center">{metricName} Trend Comparison</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="category"
              angle={-35}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval={0}
              tickMargin={15}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-panel p-3 shadow-lg rounded-lg border border-border/30">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      <div className="space-y-1.5">
                        {payload.map((entry) => {
                          const modelName = models.find(m => m.id === entry.dataKey)?.name || entry.dataKey;
                          return (
                            <div key={entry.dataKey} className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-xs">{modelName}: <b>{entry.value}</b></span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              formatter={(value, entry) => {
                const modelName = models.find(m => m.id === value)?.name || value;
                return <span className="text-xs">{modelName}</span>;
              }}
              wrapperStyle={{ paddingTop: 20 }}
              verticalAlign="bottom"
            />
            {selectedModels.map((modelId) => {
              const model = models.find(m => m.id === modelId);
              return (
                <Line 
                  key={modelId}
                  type="monotone"
                  dataKey={modelId}
                  stroke={model?.color || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                  activeDot={{ r: 8, strokeWidth: 1, stroke: '#fff' }}
                  name={model?.name || modelId}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2, r: 4, stroke: '#fff' }}
                />
              );
            })}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
