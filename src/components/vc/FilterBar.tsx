
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    industry: "",
    stage: "",
    location: "",
    minAiScore: "",
    search: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      industry: "",
      stage: "",
      location: "",
      minAiScore: "",
      search: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm mb-6">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search startups..."
              className="pl-9"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          
          <Select 
            value={filters.industry} 
            onValueChange={(value) => handleFilterChange("industry", value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="AI">AI & Machine Learning</SelectItem>
                <SelectItem value="Fintech">Fintech</SelectItem>
                <SelectItem value="HealthTech">HealthTech</SelectItem>
                <SelectItem value="ClimateTech">ClimateTech</SelectItem>
                <SelectItem value="EdTech">EdTech</SelectItem>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.stage} 
            onValueChange={(value) => handleFilterChange("stage", value)}
          >
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Idea">Idea</SelectItem>
                <SelectItem value="MVP">MVP</SelectItem>
                <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                <SelectItem value="Seed">Seed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Advanced
            {isOpen ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleContent className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Select 
                  value={filters.location} 
                  onValueChange={(value) => handleFilterChange("location", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="EU">Europe</SelectItem>
                      <SelectItem value="Asia">Asia</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum AI Score
                </label>
                <Select 
                  value={filters.minAiScore} 
                  onValueChange={(value) => handleFilterChange("minAiScore", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="90">90+</SelectItem>
                      <SelectItem value="80">80+</SelectItem>
                      <SelectItem value="70">70+</SelectItem>
                      <SelectItem value="60">60+</SelectItem>
                      <SelectItem value="50">50+</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={handleResetFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
              <Button className="bg-brand-700 hover:bg-brand-800">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
