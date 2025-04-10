
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface AISuggestedResponsesProps {
  messageCount: number;
  onSelectSuggestion: (suggestion: string) => void;
}

export function AISuggestedResponses({ messageCount, onSelectSuggestion }: AISuggestedResponsesProps) {
  if (messageCount > 12) {
    return null;
  }
  
  const getSuggestion = (index: number) => {
    if (messageCount === 1) {
      return index === 0 
        ? "We're building an AI platform..." 
        : "Our startup helps founders...";
    } else if (messageCount === 3) {
      return index === 0 
        ? "Our solution uses AI to..." 
        : "We've developed a system...";
    } else {
      return index === 0 
        ? "Add suggested response" 
        : "Add another response";
    }
  };
  
  const getFullSuggestion = (index: number) => {
    if (messageCount === 1) {
      return index === 0 
        ? "We're building an AI-driven platform that matches VC investors with promising startups more efficiently through data-driven analysis."
        : "Our startup helps early-stage founders prepare better pitches by simulating investor conversations and providing feedback.";
    } else if (messageCount === 3) {
      return index === 0 
        ? "Our platform uses AI to analyze startup pitches and provide real-time feedback, while generating detailed profiles for investors to review."
        : "We've developed a conversational AI that asks founders questions just like real VCs would, helping them refine their pitch.";
    }
    return "";
  };
  
  return (
    <div className="mt-4">
      <p className="text-xs text-gray-500 mb-2">Suggested responses:</p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-gray-50 hover:bg-gray-100"
          onClick={() => onSelectSuggestion(getFullSuggestion(0))}
        >
          <ChevronRight className="h-3 w-3 mr-1" />
          {getSuggestion(0)}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs bg-gray-50 hover:bg-gray-100"
          onClick={() => onSelectSuggestion(getFullSuggestion(1))}
        >
          <ChevronRight className="h-3 w-3 mr-1" />
          {getSuggestion(1)}
        </Button>
      </div>
    </div>
  );
}
