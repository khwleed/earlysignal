
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StartupCard } from "@/components/vc/StartupCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, List, Search, RefreshCw, Star } from "lucide-react";

// Mock data (same as in VCDashboard but marked as favorite)
const mockFavorites = [
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
];

const Favorites = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredStartups, setFilteredStartups] = useState(mockFavorites);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setFilteredStartups(mockFavorites);
      } else {
        const searchLower = searchQuery.toLowerCase();
        const results = mockFavorites.filter(
          startup => 
            startup.name.toLowerCase().includes(searchLower) || 
            startup.shortDescription.toLowerCase().includes(searchLower)
        );
        setFilteredStartups(results);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="vc" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Favorite Startups</h1>
            <p className="text-gray-600">Manage and track your favorite startups</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Tabs defaultValue="all" className="mr-4">
              <TabsList>
                <TabsTrigger value="all">All Favorites</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
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
        
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="bg-brand-700 hover:bg-brand-800">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="h-8 w-8 text-brand-600 animate-spin" />
          </div>
        ) : filteredStartups.length === 0 ? (
          <div className="text-center py-20">
            <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No favorites found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search or add more startups to your favorites</p>
          </div>
        ) : (
          <div className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"} gap-6`}>
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.id} {...startup} isFavorite={true} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
