
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AIFeedbackChat } from "@/components/founder/AIFeedbackChat";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, CheckCircle, ChevronRight, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const AIFeedbackPage = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChatComplete = () => {
    setIsProcessing(true);
    
    // Simulate profile generation
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      toast({
        title: "Profile Generated",
        description: "Your founder profile has been successfully created and is now visible to VCs.",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header userType="founder" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="shadow-sm hover:shadow transition-all">
            <a href="/founder-dashboard" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-xl mb-6 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-brand-700 to-brand-800 text-white pb-4">
                <CardTitle className="text-xl flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  AI Investor Feedback
                </CardTitle>
                <CardDescription className="text-white/80">
                  Have a conversation with our AI to refine your pitch and generate your founder profile
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[100vh]">
                  <AIFeedbackChat onComplete={handleChatComplete} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <ScrollArea className="h-[100vh] pr-4 shadow-lg">
              <Card className="border-0 shadow-lg rounded-xl mb-6">
                <CardHeader className="pb-2 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="text-lg">How This Works</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-5">
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mr-3 shadow-sm">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-800">Chat with Our AI Investor</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Answer questions about your startup just like you would in a real investor conversation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mr-3 shadow-sm">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-800">Get Real-Time Feedback</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Receive immediate insights on your pitch, with suggestions for improvement.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mr-3 shadow-sm">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-800">Generate Your Profile</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Your responses are analyzed to create an enhanced profile that VCs can discover.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mr-3 shadow-sm">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium text-brand-800">Connect with Investors</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Interested VCs can view your profile and reach out directly if they're interested.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`border-0 shadow-lg rounded-xl ${isCompleted ? "bg-green-50" : ""}`}>
                <CardHeader className="pb-2 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                  <CardTitle className="text-lg">Profile Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {isProcessing ? (
                    <div className="text-center py-6">
                      <div className="bg-brand-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <RefreshCw className="h-10 w-10 text-brand-600 animate-spin" />
                      </div>
                      <h3 className="font-medium text-lg text-brand-800">Generating Your Profile</h3>
                      <p className="text-gray-600 mt-2">
                        We're analyzing your responses and creating your founder profile...
                      </p>
                    </div>
                  ) : isCompleted ? (
                    <div className="text-center py-6">
                      <div className="bg-green-50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                      </div>
                      <h3 className="font-medium text-lg text-brand-800">Profile Generated!</h3>
                      <p className="text-gray-600 mt-2 mb-4">
                        Your founder profile has been created and is now visible to VCs in our marketplace.
                      </p>
                      <Button 
                        onClick={() => navigate("/profile")} 
                        className="bg-brand-700 hover:bg-brand-800 w-full shadow-md hover:shadow-lg transition-all"
                      >
                        View Your Profile
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="py-6">
                      <div className="flex items-center justify-center bg-amber-50 text-amber-800 rounded-lg p-4 mb-5 border border-amber-200">
                        <Bot className="h-5 w-5 mr-2" />
                        <span>Complete the AI conversation to generate your profile</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mr-3"></div>
                          <p className="text-gray-600">Basic information collected</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mr-3"></div>
                          <p className="text-gray-600">AI feedback received</p>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mr-3"></div>
                          <p className="text-gray-600">Profile generated for VCs</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIFeedbackPage;
