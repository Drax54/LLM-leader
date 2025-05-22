
import React from 'react';
import { InfoIcon, BookIcon, BookOpenIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface EuAiActArticleButtonProps {
  articleNumber: string;
  paragraphNumber: string;
  description: string;
  variant?: 'default' | 'reference';
}

const EuAiActArticleButton = ({
  articleNumber,
  paragraphNumber,
  description,
  variant = 'default'
}: EuAiActArticleButtonProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 h-auto py-1.5 px-3 gap-1.5 my-1"
        >
          <InfoIcon className="h-4 w-4 text-slate-500" />
          {variant === 'reference' ? (
            <span className="font-medium">References</span>
          ) : (
            <span className="font-medium">Act: Article {articleNumber} Para {paragraphNumber}</span>
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-4">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            {variant === 'reference' ? (
              <>
                <h4 className="text-sm font-semibold">References</h4>
                <div className="text-sm">
                  <p>{description}</p>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-sm font-semibold">Article {articleNumber}, Paragraph {paragraphNumber}</h4>
                <div className="text-sm">
                  <p>{description}</p>
                </div>
                <div className="pt-2">
                  <a 
                    href={`https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52021PC0206`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <BookOpenIcon className="h-3 w-3" />
                    View full text in EU AI Act
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EuAiActArticleButton;
