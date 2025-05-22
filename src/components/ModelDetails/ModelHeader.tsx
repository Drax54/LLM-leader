
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ModelHeaderProps {
  fullName: string;
  developer: string;
  publishDate: string;
  parameters: string;
  rank: number;
  license: string;
}

const ModelHeader = ({ 
  fullName, 
  developer, 
  publishDate, 
  parameters, 
  rank, 
  license 
}: ModelHeaderProps) => {
  return (
    <div className="mb-8 mt-8">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Models
      </Link>
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">{fullName}</h1>
      <div className="flex items-center text-muted-foreground mb-4">
        <span className="mr-4">Developer: {developer}</span>
        <span className="mr-4">Released: {publishDate}</span>
        <span>{parameters}</span>
      </div>
      <div className="flex items-center space-x-2 mb-8">
        <div className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
          Rank #{rank}
        </div>
        <div className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">
          {license}
        </div>
      </div>
    </div>
  );
};

export default ModelHeader;
