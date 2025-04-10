
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { FilterBar } from "@/components/vc/FilterBar";
import { StartupCard } from "@/components/vc/StartupCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, RefreshCw } from "lucide-react";

// Mock data
const mockStartups = [
  {
    id: "1",
    name: "EcoCharge",
    industry: "ClimateTech",
    stage: "Seed" as const,
    location: "San Francisco, CA",
    aiScore: 92,
    teamSize: 5,
    shortDescription: "Revolutionary EV charging infrastructure using renewable energy sources, reducing charging time by 70%.",
  },
  {
    id: "2",
    name: "MindfulAI",
    industry: "AI",
    stage: "Pre-Seed" as const,
    location: "Boston, MA",
    aiScore: 87,
    teamSize: 3,
    shortDescription: "AI-powered mental health platform that predicts and prevents burnout before it happens.",
  },
  {
    id: "3",
    name: "FarmSense",
    industry: "AgTech",
    stage: "MVP" as const,
    location: "Austin, TX",
    aiScore: 79,
    teamSize: 4,
    shortDescription: "IoT sensors and predictive analytics for small-scale farmers to optimize crop yields and reduce water usage.",
  },
  {
    id: "4",
    name: "QuantumLeap",
    industry: "Fintech",
    stage: "Seed" as const,
    location: "New York, NY",
    aiScore: 94,
    teamSize: 6,
    shortDescription: "Quantum computing solutions for financial risk modeling, offering 100x speed improvements over traditional methods.",
  },
  {
    id: "5",
    name: "HealthPulse",
    industry: "HealthTech",
    stage: "Pre-Seed" as const,
    location: "Seattle, WA",
    aiScore: 85,
    teamSize: 4,
    shortDescription: "Remote patient monitoring platform that uses AI to predict health deterioration 48 hours before clinical signs appear.",
  },
  {
    id: "6",
    name: "LearnLoop",
    industry: "EdTech",
    stage: "MVP" as const,
    location: "Chicago, IL",
    aiScore: 76,
    teamSize: 3,
    shortDescription: "Adaptive learning platform that personalizes educational content based on individual learning patterns.",
  },
];

const VCDashboard = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredStartups, setFilteredStartups] = useState(mockStartups);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (filters: any) => {
    // In a real app, this would likely be an API call with the filters
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      let filtered = [...mockStartups];
      
      if (filters.industry) {
        filtered = filtered.filter(startup => startup.industry === filters.industry);
      }
      
      if (filters.stage) {
        filtered = filtered.filter(startup => startup.stage === filters.stage);
      }
      
      if (filters.location) {
        filtered = filtered.filter(startup => startup.location.includes(filters.location));
      }
      
      if (filters.minAiScore) {
        filtered = filtered.filter(startup => startup.aiScore >= parseInt(filters.minAiScore));
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
          startup => 
            startup.name.toLowerCase().includes(searchLower) || 
            startup.shortDescription.toLowerCase().includes(searchLower)
        );
      }
      
      setFilteredStartups(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="vc" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Startup Marketplace</h1>
            <p className="text-gray-600">Discover promising startups curated by our AI</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Tabs defaultValue="all" className="mr-4">
              <TabsList>
                <TabsTrigger value="all">All Startups</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className={viewMode === "grid" ? "bg-brand-700 hover:bg-brand-800" : ""}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className={viewMode === "list" ? "bg-brand-700 hover:bg-brand-800" : ""}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <FilterBar onFilterChange={handleFilterChange} />
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        ) : filteredStartups.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">No startups found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters to find more results</p>
          </div>
        ) : (
          <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.id} {...startup} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default VCDashboard;
