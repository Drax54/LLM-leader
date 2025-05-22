
import React from 'react';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  Label
} from 'recharts';
import { cn } from "@/lib/utils";

interface JailbreakingAnalysisProps {
  modelName: string;
  safeResponsesPercentage: number;
  safeResponsesCount: number;
  totalResponsesCount: number;
  unsafeResponsesPercentage: number;
  unsafeResponsesCount: number;
  jailbreakingResistancePercentage: number;
  jailbreakingResistanceSafeCount: number;
  jailbreakingResistanceTotalCount: number;
}

const JailbreakingAnalysis = ({ 
  modelName,
  safeResponsesPercentage,
  safeResponsesCount,
  totalResponsesCount,
  unsafeResponsesPercentage,
  unsafeResponsesCount,
  jailbreakingResistancePercentage,
  jailbreakingResistanceSafeCount,
  jailbreakingResistanceTotalCount
}: JailbreakingAnalysisProps) => {
  // Data for the overall safety pie chart
  const safetyData = [
    { name: 'Safe Responses', value: safeResponsesPercentage, count: safeResponsesCount },
    { name: 'Unsafe Responses', value: unsafeResponsesPercentage, count: unsafeResponsesCount }
  ];
  
  // Data for the jailbreaking resistance pie chart
  const jailbreakingData = [
    { name: 'Successful Resistance', value: jailbreakingResistancePercentage, count: jailbreakingResistanceSafeCount },
    { name: 'Failed Resistance', value: 100 - jailbreakingResistancePercentage, count: jailbreakingResistanceTotalCount - jailbreakingResistanceSafeCount }
  ];
  
  // Colors for the charts
  const SAFETY_COLORS = ['#4ade80', '#f87171'];
  const JAILBREAK_COLORS = ['#60a5fa', '#fb923c'];
  
  // Custom tooltip for the pie charts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 shadow-md rounded-lg text-sm border border-border/30">
          <p className="font-medium mb-1">{payload[0].name}</p>
          <p>{payload[0].value}% ({payload[0].payload.count} responses)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-6 w-6 text-indigo-600" />
        <h2 className="text-2xl font-display font-semibold">{modelName} Jailbreaking & Red Teaming Analysis</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Overall Safety Stats Card */}
        <div className="glass-panel rounded-xl p-6 shadow-sm border border-border/30 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-display font-medium">Overall Safety Analysis</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
            <div className="w-full md:w-1/2 h-[240px] min-h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={safetyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {safetyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={SAFETY_COLORS[index % SAFETY_COLORS.length]} 
                        strokeWidth={2}
                        style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}
                      />
                    ))}
                    <Label
                      value={`${safeResponsesPercentage}%`}
                      position="center"
                      className="text-xl font-semibold"
                      fill="#374151"
                    />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6 px-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="font-medium">SAFE Responses:</span>
                </div>
                <p className="text-2xl font-semibold pl-5 mt-1">
                  {safeResponsesPercentage}% 
                  <span className="text-sm text-muted-foreground ml-2">
                    ({safeResponsesCount} out of {totalResponsesCount})
                  </span>
                </p>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="font-medium">UNSAFE Responses:</span>
                </div>
                <p className="text-2xl font-semibold pl-5 mt-1">
                  {unsafeResponsesPercentage}% 
                  <span className="text-sm text-muted-foreground ml-2">
                    ({unsafeResponsesCount} out of {totalResponsesCount})
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Jailbreaking Resistance Card */}
        <div className="glass-panel rounded-xl p-6 shadow-sm border border-border/30 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-display font-medium">Jailbreaking Resistance</h3>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
            <div className="w-full md:w-1/2 h-[240px] min-h-[240px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={jailbreakingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {jailbreakingData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={JAILBREAK_COLORS[index % JAILBREAK_COLORS.length]} 
                        strokeWidth={2}
                        style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}
                      />
                    ))}
                    <Label
                      value={`${jailbreakingResistancePercentage}%`}
                      position="center"
                      className="text-xl font-semibold"
                      fill="#374151"
                    />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 px-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="font-medium">Jailbreaking Resistance:</span>
                </div>
                <p className="text-2xl font-semibold pl-5 mt-1">
                  {jailbreakingResistancePercentage}% 
                  <span className="text-sm text-muted-foreground ml-2">
                    ({jailbreakingResistanceSafeCount} out of {jailbreakingResistanceTotalCount} attempts)
                  </span>
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4 pl-5 p-3 border border-border/40 rounded-lg bg-secondary/40">
                Measures the model's ability to resist adversarial prompts designed to bypass content safety measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JailbreakingAnalysis;
