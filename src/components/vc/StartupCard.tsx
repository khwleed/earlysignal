import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  ExternalLink, 
  Users, 
  Briefcase,
  MapPin,
  BookOpen,
  Star
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StartupCardProps {
  id: string;
  name: string;
  industry: string;
  stage: "Idea" | "MVP" | "Pre-Seed" | "Seed";
  location: string;
  aiScore: number;
  teamSize: number;
  shortDescription: string;
  logoUrl?: string;
  isFavorite?: boolean;
}

export function StartupCard({ 
  id, 
  name, 
  industry, 
  stage, 
  location, 
  aiScore, 
  teamSize, 
  shortDescription,
  logoUrl,
  isFavorite: initialIsFavorite = false
}: StartupCardProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case "Idea": return "bg-blue-100 hover:bg-blue-100 text-blue-800";
      case "MVP": return "bg-purple-100 hover:bg-purple-100 text-purple-800";
      case "Pre-Seed": return "bg-amber-100 hover:bg-amber-100 text-amber-800";
      case "Seed": return "bg-green-100 hover:bg-green-100 text-green-800";
      default: return "bg-gray-100 hover:bg-gray-100 text-gray-800";
    }
  };

  const getAiScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
              {logoUrl ? (
                <img src={logoUrl} alt={`${name} logo`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-lg font-bold text-gray-500">
                  {name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {location}
              </div>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "text-amber-500" : "text-gray-400 hover:text-amber-500"}
                >
                  <Bookmark className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className={getStageBadgeColor(stage)}>
            {stage}
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 hover:bg-gray-100 text-gray-800">
            {industry}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {shortDescription}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>{teamSize} team members</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 font-medium">AI Score:</span>
            <span className={`font-bold ${getAiScoreColor(aiScore)}`}>
              {aiScore}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 border-t flex justify-between">
        <Button variant="outline" size="sm" className="text-gray-700">
          <BookOpen className="h-4 w-4 mr-2" />
          Quick View
        </Button>
        
        <Link to={`/startup/${id}`}>
          <Button size="sm" className="bg-brand-700 hover:bg-brand-800">
            View Profile
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
