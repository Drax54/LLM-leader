
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FrameworkSource {
  name: string;
  score: string;
}

interface EthicalPrincipleRow {
  name: string;
  aggregateScore: string;
  completedRatio: string;
  icon: React.ReactNode;
}

interface FrameworkDescriptionProps {
  title: string;
  description: string;
  sources: FrameworkSource[];
  ethicalPrinciples: EthicalPrincipleRow[];
}

const FrameworkDescription = ({ 
  title, 
  description, 
  sources,
  ethicalPrinciples 
}: FrameworkDescriptionProps) => {
  return (
    <div className="glass-panel rounded-xl p-8 mb-8">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {sources.map((source, index) => (
            <span key={index} className="px-2 py-1 bg-secondary text-xs rounded-md">
              {source.name} <span className="text-primary">{source.score}</span>
            </span>
          ))}
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Ethical Principle</TableHead>
            <TableHead>Aggregate</TableHead>
            <TableHead>Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ethicalPrinciples.map((principle, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center gap-2">
                {principle.icon}
                {principle.name}
              </TableCell>
              <TableCell>{principle.aggregateScore}</TableCell>
              <TableCell>{principle.completedRatio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex gap-4 mt-6">
        <Button variant="outline" className="bg-slate-100 hover:bg-slate-200 text-slate-700">
          <BarChart className="mr-2 h-4 w-4" />
          N/A Results
        </Button>
        <Button>
          <BarChart className="mr-2 h-4 w-4" />
          Aggregate Scores
        </Button>
      </div>
    </div>
  );
};

export default FrameworkDescription;
