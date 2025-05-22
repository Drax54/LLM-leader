
import React from 'react';

interface ModelInfoPanelProps {
  fullName: string;
  description: string;
  parameters: string;
  developer: string;
  publishDate: string;
  modelType?: string;
  trainingData?: string;
  license?: string;
}

const ModelInfoPanel = ({ 
  fullName, 
  description, 
  parameters, 
  developer, 
  publishDate,
  modelType,
  trainingData,
  license
}: ModelInfoPanelProps) => {
  return (
    <div className="glass-panel rounded-xl p-8 mb-12">
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-amber-400 bg-amber-50">
          <span className="text-2xl font-display font-bold">0.75</span>
        </div>
        <div>
          <h2 className="text-2xl font-display font-semibold mb-1">{fullName}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
          <span className="font-medium">Model Info:</span>
          <a 
            href={fullName === "ChatGPT 4.5" ? 
              "https://openai.com/research" : 
              "https://huggingface.co/deepseek-ai/deepseek-moe-16b-chat"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            {fullName === "ChatGPT 4.5" ? 
              "openai.com/research" : 
              "huggingface.co/deepseek-ai/deepseek-moe-16b-chat"}
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-secondary/30 rounded-md p-3">
          <span className="text-sm text-muted-foreground">Parameters</span>
          <div className="font-medium">{parameters.split(' ')[0]}</div>
        </div>
        <div className="bg-secondary/30 rounded-md p-3">
          <span className="text-sm text-muted-foreground">Creator</span>
          <div className="font-medium">{developer}</div>
        </div>
        <div className="bg-secondary/30 rounded-md p-3">
          <span className="text-sm text-muted-foreground">Type</span>
          <div className="font-medium">{modelType || (fullName === "ChatGPT 4.5" ? "API" : "Local")}</div>
        </div>
        <div className="bg-secondary/30 rounded-md p-3">
          <span className="text-sm text-muted-foreground">Released</span>
          <div className="font-medium">{publishDate}</div>
        </div>
        {trainingData && (
          <div className="bg-secondary/30 rounded-md p-3 col-span-2">
            <span className="text-sm text-muted-foreground">Training Data</span>
            <div className="font-medium">{trainingData}</div>
          </div>
        )}
        {license && (
          <div className="bg-secondary/30 rounded-md p-3 col-span-2">
            <span className="text-sm text-muted-foreground">License</span>
            <div className="font-medium">{license}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelInfoPanel;
