
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  PlayCircle,
  Share2,
  Star,
  Users
} from "lucide-react";

// Mock data
const mockStartupData = {
  "1": {
    id: "1",
    name: "EcoCharge",
    tagline: "Sustainable EV charging infrastructure",
    industry: "ClimateTech",
    stage: "Seed",
    location: "San Francisco, CA",
    founded: "2023",
    website: "https://ecocharge.example.com",
    contactEmail: "founders@ecocharge.example.com",
    aiScore: 92,
    teamSize: 5,
    description: "EcoCharge is developing revolutionary EV charging infrastructure using 100% renewable energy sources. Our proprietary technology reduces charging time by 70% compared to conventional chargers while being completely carbon-neutral.",
    problem: "Electric vehicle adoption is hindered by slow charging times and the carbon footprint of electricity generation for charging stations.",
    solution: "Our patented charging technology harnesses solar and kinetic energy to provide ultra-fast charging while being completely off-grid and carbon-neutral.",
    market: "The global EV charging infrastructure market is projected to reach $140 billion by 2030, growing at a CAGR of 31.8%.",
    traction: "We have completed a successful pilot with two major auto manufacturers and have letters of intent from three major charging network operators.",
    businessModel: "Hardware sales and SaaS subscription model for charging station management software.",
    competitors: ["ChargePoint", "EVgo", "Tesla Supercharger"],
    teamMembers: [
      { name: "Alex Rivera", role: "CEO & Co-founder", background: "Former Tesla Energy, Stanford MS in Electrical Engineering" },
      { name: "Priya Sharma", role: "CTO & Co-founder", background: "MIT PhD in Material Science, 3 patents in energy storage" },
      { name: "Marcus Chen", role: "Head of Engineering", background: "Former Apple, 10+ years in hardware development" },
      { name: "Sophia Rodriguez", role: "Head of Operations", background: "Former Operations Director at ChargePoint" },
      { name: "David Kim", role: "Lead Software Engineer", background: "Former Google, expertise in IoT systems" }
    ],
    aiInsights: {
      strengths: ["Strong technical team with relevant industry experience", "Innovative technology with clear IP potential", "Large and growing addressable market"],
      weaknesses: ["Capital intensive business model", "Long sales cycles with utility companies", "Requires navigating complex regulations"],
      opportunities: ["Government incentives for green infrastructure", "Rapid EV adoption creating demand", "Potential partnerships with auto manufacturers"],
      threats: ["Established competitors with market share", "Changing standards in EV charging", "Supply chain dependencies"]
    },
    aiConversationSnippets: [
      { 
        question: "How do you plan to overcome the high capital costs of infrastructure deployment?", 
        answer: "We've developed a partner-first deployment model where site hosts cover installation costs in exchange for revenue sharing. This allows us to focus capital on R&D and manufacturing while scaling deployment through partnerships." 
      },
      { 
        question: "What regulatory challenges do you anticipate, and how are you addressing them?", 
        answer: "The primary challenges are in grid connection permits and safety certifications. We've brought on a regulatory affairs advisor who previously worked at the Department of Energy to help navigate these complexities and are designing our systems to exceed current safety requirements." 
      },
      { 
        question: "How does your technology compare to Tesla's Supercharger network?", 
        answer: "Unlike Tesla's grid-dependent model, our stations are self-sustaining through integrated renewable generation and storage. While current charging speeds are comparable (150kW), our next generation will reach 300kW without requiring grid infrastructure upgrades, which is our key differentiator." 
      }
    ]
  }
};

const StartupProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // In a real app, fetch data based on ID
  const startup = mockStartupData[id as keyof typeof mockStartupData];
  
  if (!startup) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header userType="vc" />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h3 className="text-lg font-medium text-gray-900">Startup not found</h3>
            <p className="text-gray-600 mt-2">The startup you're looking for doesn't exist or has been removed</p>
            <Button asChild className="mt-6 bg-brand-700 hover:bg-brand-800">
              <Link to="/vc-dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="vc" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/vc-dashboard" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-brand-700 to-brand-800 h-32 relative">
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-6">
              <div className="flex items-end">
                <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-3xl font-bold text-brand-700">
                    {startup.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4 pb-4">
                  <h1 className="text-3xl font-bold text-white">{startup.name}</h1>
                  <p className="text-brand-500">{startup.tagline}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 pb-6 px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800">
                  {startup.industry}
                </Badge>
                <Badge className="bg-green-100 hover:bg-green-100 text-green-800">
                  {startup.stage}
                </Badge>
                <div className="flex items-center text-gray-600 text-sm ml-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {startup.location}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-brand-700 hover:bg-brand-800">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Founders
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                <div className="px-6 pt-6">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="team">Team</TabsTrigger>
                    <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="conversation">Conversation</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="overview" className="p-6 focus:outline-none">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Description</h3>
                      <p className="text-gray-700">
                        {startup.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Problem</h3>
                        <p className="text-gray-700">
                          {startup.problem}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Solution</h3>
                        <p className="text-gray-700">
                          {startup.solution}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Market Opportunity</h3>
                      <p className="text-gray-700">
                        {startup.market}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Traction & Milestones</h3>
                      <p className="text-gray-700">
                        {startup.traction}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Business Model</h3>
                      <p className="text-gray-700">
                        {startup.businessModel}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Competitors</h3>
                      <div className="flex flex-wrap gap-2">
                        {startup.competitors.map((competitor, index) => (
                          <Badge key={index} variant="outline">
                            {competitor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="team" className="p-6 focus:outline-none">
                  <h3 className="text-lg font-semibold mb-4">Team Members</h3>
                  <div className="space-y-6">
                    {startup.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                          <span className="text-lg font-medium text-gray-700">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-gray-600 text-sm">{member.role}</p>
                          <p className="text-gray-500 text-sm mt-1">{member.background}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="ai-insights" className="p-6 focus:outline-none">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">AI Analysis Summary</h3>
                      <p className="text-gray-700 mb-4">
                        Our AI has analyzed this startup based on their pitch, answers to investor questions, market data, and team profiles.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Strengths</h4>
                          <ul className="space-y-2">
                            {startup.aiInsights.strengths.map((strength, index) => (
                              <li key={index} className="flex items-start">
                                <div className="text-green-600 mt-0.5 mr-2">•</div>
                                <span className="text-gray-700">{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Weaknesses</h4>
                          <ul className="space-y-2">
                            {startup.aiInsights.weaknesses.map((weakness, index) => (
                              <li key={index} className="flex items-start">
                                <div className="text-red-600 mt-0.5 mr-2">•</div>
                                <span className="text-gray-700">{weakness}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Opportunities</h4>
                          <ul className="space-y-2">
                            {startup.aiInsights.opportunities.map((opportunity, index) => (
                              <li key={index} className="flex items-start">
                                <div className="text-blue-600 mt-0.5 mr-2">•</div>
                                <span className="text-gray-700">{opportunity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Threats</h4>
                          <ul className="space-y-2">
                            {startup.aiInsights.threats.map((threat, index) => (
                              <li key={index} className="flex items-start">
                                <div className="text-amber-600 mt-0.5 mr-2">•</div>
                                <span className="text-gray-700">{threat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="conversation" className="p-6 focus:outline-none">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">AI-Founder Conversation</h3>
                        <p className="text-gray-600 text-sm">Key excerpts from the interactive Q&A session</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Play Recording
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      {startup.aiConversationSnippets.map((item, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start mb-3">
                            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mr-3 flex-shrink-0">
                              <MessageCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Question:</p>
                              <p className="text-gray-700">{item.question}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start pl-11">
                            <p className="text-gray-700">{item.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">AI Score</h3>
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full border-8 border-green-100 flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-green-600">{startup.aiScore}</span>
                  </div>
                  <p className="text-gray-700 text-center mb-4">
                    Based on our AI analysis, this startup scores in the <span className="font-medium text-green-600">top 10%</span> of companies in this sector.
                  </p>
                  
                  <div className="w-full space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Team Strength</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Market Potential</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Product Innovation</span>
                        <span className="font-medium">88%</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Business Model</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Company Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Founded</p>
                      <p className="font-medium">{startup.founded}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{startup.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Team Size</p>
                      <p className="font-medium">{startup.teamSize} employees</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Stage</p>
                      <p className="font-medium">{startup.stage}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-600">Website</p>
                      <a 
                        href={startup.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-medium text-brand-700 hover:text-brand-800 flex items-center truncate"
                      >
                        {startup.website.replace(/^https?:\/\//, '')}
                        <ExternalLink className="h-3.5 w-3.5 ml-1 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-600">Contact</p>
                      <a 
                        href={`mailto:${startup.contactEmail}`} 
                        className="font-medium text-brand-700 hover:text-brand-800 truncate"
                      >
                        {startup.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StartupProfile;
