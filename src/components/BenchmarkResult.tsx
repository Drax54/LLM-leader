
import React from 'react';
import { Check, Info } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BenchmarkResultProps {
  benchmarkName: string;
  llama2Score?: number;
  claudeScore?: number;
  tooltipContent?: string;
  modelScore?: number;
  comparisonScore?: number | string;
}

const BenchmarkResult = ({ 
  benchmarkName, 
  llama2Score = 0, 
  claudeScore = 0,
  tooltipContent,
  modelScore,
  comparisonScore
}: BenchmarkResultProps) => {
  // Determine if we're using the llama2/claude scores or modelScore/comparisonScore
  const useModelComparison = modelScore !== undefined;
  
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Check className="h-5 w-5 text-slate-600" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-medium flex items-center gap-1 text-lg">
                {benchmarkName}
                {tooltipContent && <Info className="h-4 w-4 text-blue-500 opacity-70" />}
              </span>
            </TooltipTrigger>
            {tooltipContent && (
              <TooltipContent className="max-w-sm bg-blue-50 border border-blue-100 text-slate-800 p-3">
                <p>{tooltipContent}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-6">
        {useModelComparison ? (
          // Display modelScore and comparisonScore for RobustnessSection
          <>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Model Score</span>
                <span className="font-medium">{typeof modelScore === 'number' ? modelScore.toFixed(2) : modelScore}</span>
              </div>
              <Progress value={typeof modelScore === 'number' ? modelScore * 100 : 0} className="h-2 bg-slate-200" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Comparison Score</span>
                <span className="font-medium">{typeof comparisonScore === 'number' ? comparisonScore.toFixed(2) : comparisonScore}</span>
              </div>
              <Progress value={typeof comparisonScore === 'number' ? comparisonScore * 100 : 0} className="h-2 bg-slate-200" />
            </div>
          </>
        ) : (
          // Display llama2Score and claudeScore for BenchmarkTabs
          <>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Llama 2 7b Chat Score</span>
                <span className="font-medium">{llama2Score.toFixed(2)}</span>
              </div>
              <Progress value={llama2Score} className="h-2 bg-slate-200" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Claude 3 Opus Score</span>
                <span className="font-medium">{claudeScore.toFixed(2)}</span>
              </div>
              <Progress value={claudeScore} className="h-2 bg-slate-200" />
            </div>
          </>
        )}

        <div className="flex gap-8 pt-1">
          <Popover>
            <PopoverTrigger className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <span className="text-blue-600 mr-1">▸</span> example
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="text-sm">
                <h4 className="font-medium mb-2">Example Prompt</h4>
                <p className="text-slate-600 mb-2">
                  "Solve the following math problem step by step: If x^2 + 3x - 10 = 0, what are the values of x?"
                </p>
                <h4 className="font-medium mb-2">Model Response</h4>
                <p className="text-slate-600">
                  "To solve x^2 + 3x - 10 = 0, I'll use the quadratic formula: x = (-b ± √(b^2 - 4ac))/2a where a=1, b=3, c=-10. 
                  Calculating: x = (-3 ± √(9 + 40))/2 = (-3 ± √49)/2 = (-3 ± 7)/2. 
                  So, x = 2 or x = -5."
                </p>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <span className="text-blue-600 mr-1">▸</span> metrics
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="text-sm">
                <h4 className="font-medium mb-2">Metrics</h4>
                <p className="text-slate-600 mb-2">
                  <span className="font-medium">Accuracy:</span> Percentage of correct answers compared to ground truth.
                </p>
                <p className="text-slate-600 mb-2">
                  <span className="font-medium">Consistency:</span> Stability of responses across rephrased queries.
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Reasoning quality:</span> Evaluation of logical steps in problem-solving.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default BenchmarkResult;
