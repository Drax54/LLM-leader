
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';

interface ModelCardProps {
  name: string;
  description: string;
  parameters: string;
  scores: {
    category: string;
    score: number;
    maxScore: number;
  }[];
  rank: number;
  id: string;
  developer?: string;
  developerLogo?: string;
  onClick?: () => void;
  className?: string;
}

const ModelCard = ({ 
  name, 
  description, 
  parameters, 
  scores, 
  rank, 
  id,
  developer,
  developerLogo,
  onClick, 
  className 
}: ModelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const totalScore = scores.reduce((sum, item) => sum + item.score, 0);
  const maxPossibleScore = scores.reduce((sum, item) => sum + item.maxScore, 0);
  const overallPercentage = (totalScore / maxPossibleScore) * 100;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Use navigate instead of directly changing location
      navigate(`/model/${id}`, { replace: false });
    }
  };
  
  return (
    <div 
      className={cn(
        "glass-panel rounded-xl p-6 transition-all duration-300 ease-apple cursor-pointer",
        isHovered ? "shadow-lg translate-y-[-4px]" : "hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          {developer && (
            <div className="flex items-center gap-2 mb-2">
              {developerLogo && (
                <div className="h-5 w-5 rounded-full overflow-hidden bg-transparent flex items-center justify-center">
                  <img 
                    src={developerLogo} 
                    alt={`${developer} logo`} 
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=32&h=32&fit=crop';
                    }}
                  />
                </div>
              )}
              <span className="text-xs font-medium text-muted-foreground">{developer}</span>
            </div>
          )}
          <h3 className="text-xl font-display font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{parameters}</p>
        </div>
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
          <span className="text-sm font-medium">#{rank}</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      
      <div className="space-y-3">
        {scores.map((score) => (
          <div key={score.category} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{score.category}</span>
              <span className="font-medium">{score.score}/{score.maxScore}</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(score.score / score.maxScore) * 100}%`,
                  transitionDelay: isHovered ? '0.1s' : '0s'
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Overall Score</span>
          <span className="text-lg font-display font-semibold">
            {totalScore}/{maxPossibleScore}
          </span>
        </div>
        <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${overallPercentage}%`,
              transitionDelay: isHovered ? '0.2s' : '0s'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
