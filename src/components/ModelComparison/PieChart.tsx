
import React from 'react';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
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

interface PieChartProps {
  models: ModelData[];
  selectedModels: string[];
  metric: string;
  metricName: string;
  className?: string;
}

const PieChart = ({
  models,
  selectedModels,
  metric,
  metricName,
  className
}: PieChartProps) => {
  // Transform data for the pie chart
  const chartData = selectedModels.map(modelId => {
    const model = models.find(m => m.id === modelId);
    return {
      name: model?.name || modelId,
      value: model ? (model[metric] || 0) : 0,
      color: model?.color || `#${Math.floor(Math.random()*16777215).toString(16)}`,
      modelId
    };
  });

  // Calculate total value for percentage calculation
  const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className={cn("w-full glass-panel rounded-xl p-6", className)}>
      <h3 className="text-lg font-medium mb-6 text-center">{metricName} Distribution</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              dataKey="value"
              paddingAngle={2}
              // Simplified label to prevent overlap
              label={({ name, value }) => `${name}: ${value}`}
              labelLine={{ stroke: '#888', strokeWidth: 0.5, strokeDasharray: '2' }}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const entry = payload[0];
                  const entryValue = entry.value as number;
                  const percent = totalValue > 0 ? ((entryValue / totalValue) * 100).toFixed(1) : '0';
                  return (
                    <div className="glass-panel p-3 shadow-lg rounded-lg border border-border/30">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.payload.color }}
                        />
                        <span className="text-sm font-medium">{entry.name}</span>
                      </div>
                      <div className="mt-1 text-xs">
                        <p><b>{metricName}:</b> {entry.value}</p>
                        <p><b>Percentage:</b> {percent}%</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ padding: '20px 0 0' }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
