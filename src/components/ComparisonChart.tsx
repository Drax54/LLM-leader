
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip 
} from 'recharts';
import { cn } from "@/lib/utils";

interface ChartData {
  category: string;
  [key: string]: number | string;
}

interface Model {
  id: string;
  name: string;
  color: string;
}

interface ComparisonChartProps {
  data: ChartData[];
  models: Model[];
  selectedModels: string[];
  onModelToggle: (modelId: string) => void;
  className?: string;
}

const ComparisonChart = ({ 
  data, 
  models, 
  selectedModels, 
  onModelToggle,
  className 
}: ComparisonChartProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {models.map((model) => (
          <button
            key={model.id}
            className={cn(
              "px-4 py-1.5 text-sm rounded-full border transition-all duration-300",
              selectedModels.includes(model.id)
                ? `bg-opacity-20 border-opacity-80 shadow-sm`
                : "bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80"
            )}
            style={{
              backgroundColor: selectedModels.includes(model.id) 
                ? `${model.color}20` 
                : undefined,
              borderColor: selectedModels.includes(model.id) 
                ? model.color 
                : undefined,
              color: selectedModels.includes(model.id) 
                ? model.color 
                : undefined
            }}
            onClick={() => onModelToggle(model.id)}
          >
            {model.name}
          </button>
        ))}
      </div>

      <div className="h-[450px] w-full glass-panel rounded-xl p-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="category"
              tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 500 }}
              dy={4}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 10]} 
              tick={{ fill: "#6b7280", fontSize: 10 }}
              axisLine={false}
              tickCount={5}
            />
            
            {models
              .filter((model) => selectedModels.includes(model.id))
              .map((model) => (
                <Radar
                  key={model.id}
                  name={model.name}
                  dataKey={model.id}
                  stroke={model.color}
                  fill={model.color}
                  fillOpacity={0.15}
                  strokeWidth={2}
                  dot={{ fill: model.color, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 1, stroke: "#fff" }}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
              ))}
            
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="glass-panel p-4 shadow-lg rounded-lg border border-border/30">
                      <p className="text-sm font-medium mb-2">{payload[0].payload.category}</p>
                      <div className="space-y-1.5">
                        {payload.map((entry) => (
                          <div key={entry.name} className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs">{entry.name}: <b>{entry.value}</b>/10</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: 20 }}
              formatter={(value) => <span className="text-xs font-medium">{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
