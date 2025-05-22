
import React, { useState } from 'react';
import { 
  BarChart2, 
  PieChartIcon, 
  LineChartIcon, 
  Activity, 
  Radar as RadarChartIcon 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ComparisonChart from '@/components/ComparisonChart';
import BarChart from './BarChart';
import PieChart from './PieChart';
import LineChart from './LineChart';

interface ModelData {
  id: string;
  name: string;
  color: string;
  size?: number;
  price?: number;
  speed?: number;
  safeResponsesPercentage?: number;
  unsafeResponsesPercentage?: number;
  jailbreakingResistancePercentage?: number;
  parameters?: string;
  [key: string]: any;
}

interface ModelComparisonProps {
  currentModelId: string;
  models: ModelData[];
  className?: string;
}

const ModelComparison = ({ currentModelId, models, className }: ModelComparisonProps) => {
  const [selectedModels, setSelectedModels] = useState<string[]>([currentModelId]);
  
  // Define model attributes for radar chart comparison
  const radarChartData = [
    { category: 'Reasoning', [currentModelId]: 8.2, 'gpt-45': 8.7, 'claude-37': 8.9, 'grok-3': 8.1, 'deepseek-r1': 8.2 },
    { category: 'Knowledge', [currentModelId]: 7.9, 'gpt-45': 8.5, 'claude-37': 8.6, 'grok-3': 7.8, 'deepseek-r1': 7.9 },
    { category: 'Instruction', [currentModelId]: 8.3, 'gpt-45': 8.9, 'claude-37': 9.0, 'grok-3': 8.2, 'deepseek-r1': 8.3 },
    { category: 'Safety', [currentModelId]: 7.5, 'gpt-45': 8.8, 'claude-37': 9.2, 'grok-3': 6.2, 'deepseek-r1': 7.5 },
    { category: 'Math', [currentModelId]: 7.8, 'gpt-45': 8.6, 'claude-37': 8.8, 'grok-3': 7.9, 'deepseek-r1': 7.8 },
    { category: 'Coding', [currentModelId]: 8.1, 'gpt-45': 8.7, 'claude-37': 8.5, 'grok-3': 8.2, 'deepseek-r1': 8.1 },
    { category: 'Writing', [currentModelId]: 8.0, 'gpt-45': 8.5, 'claude-37': 8.9, 'grok-3': 7.7, 'deepseek-r1': 8.0 },
    { category: 'Creativity', [currentModelId]: 7.7, 'gpt-45': 8.3, 'claude-37': 8.1, 'grok-3': 7.9, 'deepseek-r1': 7.7 },
  ];

  // Define model performance metrics for other charts
  const performanceData = {
    'Size (B parameters)': {
      [currentModelId]: 10,
      'gpt-45': 1700,
      'claude-37': 390,
      'grok-3': 314,
      'deepseek-r1': 10
    },
    'Price ($/million tokens)': {
      [currentModelId]: 0.5,
      'gpt-45': 10,
      'claude-37': 8,
      'grok-3': 0,
      'deepseek-r1': 0.5
    },
    'Speed (tokens/sec)': {
      [currentModelId]: 85,
      'gpt-45': 120,
      'claude-37': 110,
      'grok-3': 90,
      'deepseek-r1': 85
    },
    'Safe Responses (%)': {
      [currentModelId]: 92,
      'gpt-45': 97,
      'claude-37': 100,
      'grok-3': 2.7,
      'deepseek-r1': 92
    },
    'Unsafe Responses (%)': {
      [currentModelId]: 8,
      'gpt-45': 3,
      'claude-37': 0,
      'grok-3': 97.3,
      'deepseek-r1': 8
    },
    'Jailbreaking Resistance (%)': {
      [currentModelId]: 42,
      'gpt-45': 78,
      'claude-37': 100,
      'grok-3': 2.7,
      'deepseek-r1': 42
    },
    'Code LiveBench (%)': {
      [currentModelId]: 78.1,
      'gpt-45': 75.2,
      'claude-37': 67.5,
      'grok-3': 67.4,
      'deepseek-r1': 78.1
    },
    'Aider Polyglot (%)': {
      [currentModelId]: 58.9,
      'gpt-45': 45.0,
      'claude-37': 60.4,
      'grok-3': 37.8,
      'deepseek-r1': 58.9
    },
    'SWEBench Verified (%)': {
      [currentModelId]: 52.3,
      'gpt-45': 38.0,
      'claude-37': 70.3,
      'grok-3': 28.5,
      'deepseek-r1': 52.3
    }
  };

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev => {
      if (prev.includes(modelId)) {
        // Don't allow deselecting the current model
        if (modelId === currentModelId) {
          return prev;
        }
        return prev.filter(id => id !== modelId);
      } else {
        // Maximum 5 models can be selected at a time
        if (prev.length >= 5) {
          return prev;
        }
        return [...prev, modelId];
      }
    });
  };

  // Extract size values for pie chart, converting parameters string to number if needed
  const getModelSize = (model: ModelData) => {
    if (model.size) return model.size;
    if (model.parameters) {
      // Extract number from parameters string (e.g. "7B Parameters" -> 7)
      const match = model.parameters.match(/(\d+)([BT])/);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2];
        // Convert to billions
        return unit === 'T' ? value * 1000 : value;
      }
    }
    return 0;
  };

  // Set sizes for models based on their parameters
  const modelsWithSize = models.map(model => ({
    ...model,
    size: getModelSize(model)
  }));

  return (
    <div className={className}>
      <h2 className="text-2xl font-display font-semibold mb-6">Model Comparison</h2>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {models.map((model) => (
          <button
            key={model.id}
            className={`px-3 py-1 text-sm rounded-full border transition-all duration-300 ${
              selectedModels.includes(model.id)
                ? `bg-opacity-15 border-opacity-20`
                : "bg-secondary border-transparent text-muted-foreground"
            }`}
            style={{
              backgroundColor: selectedModels.includes(model.id) ? `${model.color}20` : undefined,
              borderColor: selectedModels.includes(model.id) ? model.color : undefined,
              color: selectedModels.includes(model.id) ? model.color : undefined
            }}
            onClick={() => handleModelToggle(model.id)}
            disabled={model.id === currentModelId}  // Current model can't be deselected
          >
            {model.name}
          </button>
        ))}
        <p className="w-full text-xs text-muted-foreground mt-1">
          Select up to 5 models to compare. The current model cannot be deselected.
        </p>
      </div>

      <Tabs defaultValue="radar" className="w-full">
        <TabsList className="mb-6 grid grid-cols-5 h-auto">
          <TabsTrigger value="radar" className="py-2 flex gap-2 items-center">
            <RadarChartIcon className="h-4 w-4" /> Radar
          </TabsTrigger>
          <TabsTrigger value="bar" className="py-2 flex gap-2 items-center">
            <BarChart2 className="h-4 w-4" /> Bar
          </TabsTrigger>
          <TabsTrigger value="pie" className="py-2 flex gap-2 items-center">
            <PieChartIcon className="h-4 w-4" /> Pie
          </TabsTrigger>
          <TabsTrigger value="line" className="py-2 flex gap-2 items-center">
            <LineChartIcon className="h-4 w-4" /> Line
          </TabsTrigger>
          <TabsTrigger value="metrics" className="py-2 flex gap-2 items-center">
            <Activity className="h-4 w-4" /> Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <ComparisonChart 
                data={radarChartData} 
                models={modelsWithSize} 
                selectedModels={selectedModels} 
                onModelToggle={handleModelToggle} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BarChart 
                  data={performanceData['Size (B parameters)']} 
                  models={modelsWithSize}
                  selectedModels={selectedModels}
                  metric="size"
                  metricName="Size (B parameters)"
                />
                <BarChart 
                  data={performanceData['Safe Responses (%)']} 
                  models={modelsWithSize}
                  selectedModels={selectedModels}
                  metric="safeResponsesPercentage"
                  metricName="Safe Responses (%)"
                />
                <BarChart 
                  data={performanceData['Jailbreaking Resistance (%)']} 
                  models={modelsWithSize}
                  selectedModels={selectedModels}
                  metric="jailbreakingResistancePercentage"
                  metricName="Jailbreaking Resistance (%)"
                />
                <BarChart 
                  data={performanceData['Speed (tokens/sec)']} 
                  models={modelsWithSize}
                  selectedModels={selectedModels}
                  metric="speed"
                  metricName="Speed (tokens/sec)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChart 
                  models={modelsWithSize.map(model => ({
                    ...model,
                    value: model.size || 0
                  }))}
                  selectedModels={selectedModels}
                  metric="size"
                  metricName="Size Distribution (B parameters)"
                />
                <PieChart 
                  models={modelsWithSize.map(model => ({
                    ...model,
                    value: model.safeResponsesPercentage || 0
                  }))}
                  selectedModels={selectedModels}
                  metric="safeResponsesPercentage"
                  metricName="Safe Responses (%)"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                <LineChart 
                  data={performanceData}
                  models={modelsWithSize}
                  selectedModels={selectedModels}
                  metric="performanceData"
                  metricName="Performance Metrics"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(performanceData).map(([metric, data]) => (
                  <div key={metric} className="rounded-lg border p-4">
                    <h3 className="text-sm font-medium mb-3">{metric}</h3>
                    <div className="space-y-3">
                      {selectedModels.map(modelId => {
                        const model = models.find(m => m.id === modelId);
                        const value = data[modelId] || 0;
                        
                        // Determine color based on metric
                        let colorClass = "";
                        if (metric.includes("Safe")) {
                          colorClass = value > 90 ? "bg-green-100 text-green-800" : 
                                        value > 80 ? "bg-yellow-100 text-yellow-800" : 
                                        "bg-red-100 text-red-800";
                        } else if (metric.includes("Unsafe")) {
                          colorClass = value < 5 ? "bg-green-100 text-green-800" : 
                                        value < 10 ? "bg-yellow-100 text-yellow-800" : 
                                        "bg-red-100 text-red-800";
                        } else if (metric.includes("Jailbreaking")) {
                          colorClass = value > 70 ? "bg-green-100 text-green-800" : 
                                        value > 40 ? "bg-yellow-100 text-yellow-800" : 
                                        "bg-red-100 text-red-800";
                        }
                        
                        return (
                          <div key={modelId} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: model?.color || 'gray' }}
                              />
                              <span className="text-sm">{model?.name || modelId}</span>
                            </div>
                            <span className={`text-sm font-medium px-2 py-1 rounded ${colorClass}`}>
                              {value}
                              {metric.includes('%') ? '%' : ''}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelComparison;
