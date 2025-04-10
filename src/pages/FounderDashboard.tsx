
import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Bot, LineChart, MessageSquare, RefreshCw, Users } from "lucide-react";

const FounderDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock profile completion percentage
  const profileCompletion = 65;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="founder" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Founder Dashboard</h1>
          <p className="text-gray-600">Manage your startup profile and investor connections</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Welcome to EarlySignal</CardTitle>
                <CardDescription>
                  Complete your profile to get discovered by investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm font-medium">{profileCompletion}%</span>
                  </div>
                  <Progress value={profileCompletion} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                            <Bot className="h-5 w-5 text-brand-700" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Get AI Feedback</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Refine your pitch and receive insights from our AI investor
                          </p>
                          <Button 
                            asChild 
                            size="sm" 
                            className="bg-brand-700 hover:bg-brand-800"
                          >
                            <Link to="/ai-feedback">
                              Start Conversation
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-brand-700" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">Complete Your Profile</h3>
                          <p className="text-sm text-gray-500 mb-3">
                            Update your founder and startup information
                          </p>
                          <Button 
                            asChild 
                            size="sm" 
                            className="bg-brand-700 hover:bg-brand-800"
                          >
                            <Link to="/profile">
                              Edit Profile
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        <span className="text-blue-600">TechVC Partners</span> viewed your profile
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        You completed the AI feedback session
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">
                        <span className="text-purple-600">InnovateFund</span> requested to connect
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border-0 shadow-md mb-6">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Profile Views</span>
                      <span className="font-medium">24</span>
                    </div>
                    <Progress value={60} className="h-1 mt-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Investor Interest</span>
                      <span className="font-medium">3</span>
                    </div>
                    <Progress value={30} className="h-1 mt-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">AI Score</span>
                      <span className="font-medium">78/100</span>
                    </div>
                    <Progress value={78} className="h-1 mt-2" />
                  </div>
                  
                  <div className="pt-2">
                    <Link 
                      to="/profile"
                      className="text-sm text-brand-700 hover:text-brand-800 font-medium flex items-center"
                    >
                      View detailed analytics
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2 border-b">
                <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center py-6">
                  <LineChart className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-gray-500 font-medium">No upcoming meetings</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    You'll see your scheduled meetings with investors here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FounderDashboard;
