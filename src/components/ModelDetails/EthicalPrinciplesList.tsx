
import React from 'react';

interface Requirement {
  name: string;
  benchmark: string;
}

interface EthicalPrinciple {
  name: string;
  description: string;
  requirements: Requirement[];
}

interface EthicalPrinciplesListProps {
  principles: EthicalPrinciple[];
}

const EthicalPrinciplesList = ({ principles }: EthicalPrinciplesListProps) => {
  return (
    <div className="space-y-6">
      {principles.map((principle) => (
        <div key={principle.name} className="glass-panel rounded-xl p-6">
          <h3 className="text-lg font-medium mb-2">{principle.name}</h3>
          <p className="text-muted-foreground mb-4">{principle.description}</p>
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Technical Requirements:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-secondary/50 p-4 rounded-lg">
              {principle.requirements.map((req) => (
                <div key={req.name} className="flex flex-col">
                  <span className="text-sm font-medium">{req.name}</span>
                  <span className="text-xs text-muted-foreground">Benchmark: {req.benchmark}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EthicalPrinciplesList;
