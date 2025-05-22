
import React from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from 'recharts';
import { cn } from "@/lib/utils";

interface ModelData {
  id: string;
  name: string;
  color: string;
  [key: string]: any;
}

interface BarChartProps {
  data: Record<string, number> | any;
  models: ModelData[];
  selectedModels: string[];
  metric: string;
  metricName: string;
  className?: string;
}

const BarChart = ({
  data,
  models,
  selectedModels,
  metric,
  metricName,
  className
}: BarChartProps) => {
  // Transform data for the bar chart
  const chartData = [{
    category: metricName,
    ...Object.fromEntries(
      selectedModels.map(modelId => [modelId, data[modelId] || 0])
    )
  }];

  return (
    <div className={cn("w-full glass-panel rounded-xl p-6", className)}>
      <h3 className="text-lg font-medium mb-6 text-center">{metricName} Comparison</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{ top: 30, right: 30, left: 20, bottom: 110 }}
            barGap={12}
            barSize={32}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} vertical={false} />
            <XAxis 
              dataKey="category"
              angle={0}
              textAnchor="middle"
              height={80}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
              label={{ 
                value: metricName, 
                position: 'bottom',
                offset: 40,
                style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 14, fontWeight: 500 }
              }}
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
                              <span className="text-xs">{modelName}: <b>{entry.value.toLocaleString()}</b></span>
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
              wrapperStyle={{ paddingTop: 30, paddingBottom: 20 }}
              verticalAlign="bottom"
            />
            {selectedModels.map((modelId, index) => {
              const model = models.find(m => m.id === modelId);
              return (
                <Bar 
                  key={modelId}
                  dataKey={modelId}
                  fill={model?.color || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                  name={model?.name || modelId}
                  radius={[6, 6, 0, 0]}
                  style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}
                >
                  <LabelList 
                    dataKey={modelId} 
                    position="top" 
                    fontSize={11}
                    fontWeight={500}
                    formatter={(value: number) => value > 999 ? value.toLocaleString() : value}
                    offset={5}
                  />
                </Bar>
              );
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
