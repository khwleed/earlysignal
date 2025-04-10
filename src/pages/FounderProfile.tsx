
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, RefreshCw, Save, Upload, PlusCircle, X, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const FounderProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Mock form data
  const [formData, setFormData] = useState({
    name: "Alex Chen",
    email: "alex@example.com",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexchen",
    startupName: "TechSolve",
    tagline: "AI-powered solution for small businesses",
    website: "techsolve.example.com",
    industry: "AI",
    stage: "Seed",
    teamSize: "5",
    founded: "2023",
    description: "TechSolve provides an AI platform that helps small businesses automate routine tasks and improve operational efficiency.",
    problem: "Small businesses struggle with limited resources and operational inefficiencies.",
    solution: "Our AI platform automates routine tasks and provides insights for better decision-making.",
    market: "The global small business software market is projected to reach $50B by 2026.",
    businessModel: "SaaS subscription with tiered pricing based on features and user count.",
    traction: "500+ users, 20% MoM growth, $10k MRR",
    funding: "Pre-seed round of $200k from angel investors",
    competitors: ["Competitor A", "Competitor B", "Competitor C"],
    teamMembers: [
      { name: "Alex Chen", role: "CEO & Co-founder", background: "Ex-Google, Stanford MBA" },
      { name: "Sarah Johnson", role: "CTO & Co-founder", background: "Ex-Meta, MIT CS" }
    ]
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1500);
  };
  
  const addCompetitor = () => {
    setFormData(prev => ({
      ...prev,
      competitors: [...prev.competitors, ""]
    }));
  };
  
  const removeCompetitor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      competitors: prev.competitors.filter((_, i) => i !== index)
    }));
  };
  
  const updateCompetitor = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      competitors: prev.competitors.map((comp, i) => (i === index ? value : comp))
    }));
  };
  
  const addTeamMember = () => {
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { name: "", role: "", background: "" }]
    }));
  };
  
  const removeTeamMember = (index: number) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }));
  };
  
  const updateTeamMember = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => (
        i === index ? { ...member, [field]: value } : member
      ))
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="founder" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600">Manage your founder and startup information</p>
        </div>
        
        <Card className="border-0 shadow-md overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-brand-700 to-brand-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <Button variant="outline" size="sm" className="bg-white text-gray-700 hover:bg-gray-100">
                <Upload className="h-4 w-4 mr-2" />
                Upload Cover
              </Button>
            </div>
            <div className="flex items-center">
              <div className="w-20 h-20 bg-white rounded-lg shadow-md flex items-center justify-center mr-4">
                <span className="text-3xl font-bold text-brand-700">
                  {formData.startupName.charAt(0)}
                </span>
              </div>
              <div>
                <Badge className="bg-green-100 hover:bg-green-100 text-green-800 mb-2">
                  {formData.stage}
                </Badge>
                <h2 className="text-2xl font-bold text-white">{formData.startupName}</h2>
                <p className="text-brand-100">{formData.tagline}</p>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="basic" onValueChange={setActiveTab}>
            <div className="px-6 pt-6">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="startup">Startup Details</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="basic" className="p-6 focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input 
                    id="linkedin" 
                    name="linkedin" 
                    value={formData.linkedin} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="startupName">Startup Name</Label>
                  <Input 
                    id="startupName" 
                    name="startupName" 
                    value={formData.startupName} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input 
                    id="tagline" 
                    name="tagline" 
                    value={formData.tagline} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleSelectChange("industry", value)}
                  >
                    <SelectTrigger id="industry" className="mt-1">
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="FinTech">FinTech</SelectItem>
                      <SelectItem value="HealthTech">HealthTech</SelectItem>
                      <SelectItem value="EdTech">EdTech</SelectItem>
                      <SelectItem value="ClimateTech">ClimateTech</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="SaaS">SaaS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="stage">Stage</Label>
                  <Select
                    value={formData.stage}
                    onValueChange={(value) => handleSelectChange("stage", value)}
                  >
                    <SelectTrigger id="stage" className="mt-1">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idea">Idea</SelectItem>
                      <SelectItem value="MVP">MVP</SelectItem>
                      <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                      <SelectItem value="Seed">Seed</SelectItem>
                      <SelectItem value="Series A">Series A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input 
                    id="teamSize" 
                    name="teamSize" 
                    value={formData.teamSize} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="founded">Founded Year</Label>
                  <Input 
                    id="founded" 
                    name="founded" 
                    value={formData.founded} 
                    onChange={handleInputChange} 
                    className="mt-1" 
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="startup" className="p-6 focus:outline-none">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    className="mt-1 min-h-[100px]" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="problem">Problem</Label>
                    <Textarea 
                      id="problem" 
                      name="problem" 
                      value={formData.problem} 
                      onChange={handleInputChange} 
                      className="mt-1 min-h-[100px]" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="solution">Solution</Label>
                    <Textarea 
                      id="solution" 
                      name="solution" 
                      value={formData.solution} 
                      onChange={handleInputChange} 
                      className="mt-1 min-h-[100px]" 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="market">Market Opportunity</Label>
                  <Textarea 
                    id="market" 
                    name="market" 
                    value={formData.market} 
                    onChange={handleInputChange} 
                    className="mt-1 min-h-[100px]" 
                  />
                </div>
                
                <div>
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Textarea 
                    id="businessModel" 
                    name="businessModel" 
                    value={formData.businessModel} 
                    onChange={handleInputChange} 
                    className="mt-1 min-h-[100px]" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="traction">Traction & Milestones</Label>
                    <Textarea 
                      id="traction" 
                      name="traction" 
                      value={formData.traction} 
                      onChange={handleInputChange} 
                      className="mt-1 min-h-[100px]" 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="funding">Current Funding</Label>
                    <Textarea 
                      id="funding" 
                      name="funding" 
                      value={formData.funding} 
                      onChange={handleInputChange} 
                      className="mt-1 min-h-[100px]" 
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center">
                    <Label>Competitors</Label>
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline"
                      onClick={addCompetitor}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Competitor
                    </Button>
                  </div>
                  <div className="mt-3 space-y-3">
                    {formData.competitors.map((competitor, index) => (
                      <div key={index} className="flex items-center">
                        <Input 
                          value={competitor} 
                          onChange={(e) => updateCompetitor(index, e.target.value)}
                          placeholder="Competitor name" 
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeCompetitor(index)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="p-6 focus:outline-none">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Team Members</h3>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={addTeamMember}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {formData.teamMembers.map((member, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">Team Member #{index + 1}</h4>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeTeamMember(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`name-${index}`}>Name</Label>
                          <Input 
                            id={`name-${index}`}
                            value={member.name} 
                            onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                            className="mt-1" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`role-${index}`}>Role</Label>
                          <Input 
                            id={`role-${index}`}
                            value={member.role} 
                            onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                            className="mt-1" 
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label htmlFor={`background-${index}`}>Background</Label>
                          <Input 
                            id={`background-${index}`}
                            value={member.background} 
                            onChange={(e) => updateTeamMember(index, "background", e.target.value)}
                            className="mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <div className="px-6 py-4 border-t flex justify-end">
              <Button 
                onClick={handleSaveProfile}
                disabled={isSubmitting}
                className="bg-brand-700 hover:bg-brand-800"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </Card>
        
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">AI Profile Enhancement</CardTitle>
            <CardDescription>
              Improve your profile visibility and quality with AI-powered feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-brand-700" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-medium">AI Feedback Session</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Engage with our AI investor to refine your pitch and enhance your startup profile
                </p>
                <div className="flex items-center text-sm text-green-600 mb-4">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>Completed on May 10, 2025</span>
                </div>
                <Button 
                  asChild 
                  className="bg-brand-700 hover:bg-brand-800"
                >
                  <a href="/ai-feedback">
                    Start New Session
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FounderProfile;
