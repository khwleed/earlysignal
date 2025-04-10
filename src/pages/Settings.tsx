
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, RefreshCw, Save, Shield, User, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Mock form states
  const [accountForm, setAccountForm] = useState({
    name: "John Smith",
    email: "john@example.com",
    company: "VC Partners",
    bio: "Experienced investor focused on early-stage startups in AI and FinTech."
  });
  
  const [notificationsForm, setNotificationsForm] = useState({
    emailNotifications: true,
    newMatches: true,
    messages: true,
    updates: false,
    newsletter: true
  });
  
  const [preferencesForm, setPreferencesForm] = useState({
    theme: "light",
    investmentFocus: ["AI", "FinTech"],
    stagePreference: "Seed",
    dealSize: "$250K - $1M"
  });
  
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNotificationToggle = (name: string) => {
    setNotificationsForm(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };
  
  const handlePreferencesChange = (name: string, value: string) => {
    setPreferencesForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveSettings = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Settings Saved",
        description: "Your settings have been successfully updated.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="vc" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        
        <Card className="border-0 shadow-md overflow-hidden">
          <Tabs defaultValue="account" onValueChange={setActiveTab}>
            <div className="border-b">
              <div className="px-6 py-3">
                <TabsList className="w-full grid grid-cols-1 md:grid-cols-3">
                  <TabsTrigger value="account" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="flex items-center">
                    <Zap className="h-4 w-4 mr-2" />
                    Preferences
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="account" className="p-6 focus:outline-none">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={accountForm.name} 
                        onChange={handleAccountChange} 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={accountForm.email} 
                        onChange={handleAccountChange} 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="company">Company/Firm</Label>
                      <Input 
                        id="company" 
                        name="company" 
                        value={accountForm.company} 
                        onChange={handleAccountChange} 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={accountForm.bio} 
                    onChange={handleAccountChange} 
                    className="mt-1 min-h-[120px]" 
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input 
                        id="currentPassword" 
                        name="currentPassword" 
                        type="password" 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div></div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input 
                        id="newPassword" 
                        name="newPassword" 
                        type="password" 
                        className="mt-1" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        className="mt-1" 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Advanced Security</h3>
                  <div className="flex justify-between items-center py-2 mb-2">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h4 className="font-medium text-red-600 mb-2">Delete Your Account</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-6 focus:outline-none">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Email Notifications</h3>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="emailNotifications" className="cursor-pointer">
                        {notificationsForm.emailNotifications ? "On" : "Off"}
                      </Label>
                      <Switch
                        id="emailNotifications"
                        checked={notificationsForm.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                      />
                    </div>
                  </div>
                  
                  <Card className="border">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">New Matches</p>
                          <p className="text-sm text-gray-600">Notify me when new startups match my criteria</p>
                        </div>
                        <Switch
                          id="newMatches"
                          checked={notificationsForm.newMatches}
                          onCheckedChange={() => handleNotificationToggle("newMatches")}
                          disabled={!notificationsForm.emailNotifications}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-gray-600">Notify me when I receive a new message</p>
                        </div>
                        <Switch
                          id="messages"
                          checked={notificationsForm.messages}
                          onCheckedChange={() => handleNotificationToggle("messages")}
                          disabled={!notificationsForm.emailNotifications}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Platform Updates</p>
                          <p className="text-sm text-gray-600">Notify me about new features and updates</p>
                        </div>
                        <Switch
                          id="updates"
                          checked={notificationsForm.updates}
                          onCheckedChange={() => handleNotificationToggle("updates")}
                          disabled={!notificationsForm.emailNotifications}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-600">Receive our monthly newsletter with startup trends</p>
                        </div>
                        <Switch
                          id="newsletter"
                          checked={notificationsForm.newsletter}
                          onCheckedChange={() => handleNotificationToggle("newsletter")}
                          disabled={!notificationsForm.emailNotifications}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preferences" className="p-6 focus:outline-none">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Interface Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select
                        value={preferencesForm.theme}
                        onValueChange={(value) => handlePreferencesChange("theme", value)}
                      >
                        <SelectTrigger id="theme" className="mt-1">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Investment Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Investment Focus</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className="bg-brand-100 hover:bg-brand-200 text-brand-800">
                          AI
                        </Badge>
                        <Badge className="bg-brand-100 hover:bg-brand-200 text-brand-800">
                          FinTech
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
                          + Add Focus
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="stagePreference">Preferred Stage</Label>
                      <Select
                        value={preferencesForm.stagePreference}
                        onValueChange={(value) => handlePreferencesChange("stagePreference", value)}
                      >
                        <SelectTrigger id="stagePreference" className="mt-1">
                          <SelectValue placeholder="Select preferred stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                          <SelectItem value="Seed">Seed</SelectItem>
                          <SelectItem value="Series A">Series A</SelectItem>
                          <SelectItem value="Series B+">Series B+</SelectItem>
                          <SelectItem value="All">All Stages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="dealSize">Typical Deal Size</Label>
                      <Select
                        value={preferencesForm.dealSize}
                        onValueChange={(value) => handlePreferencesChange("dealSize", value)}
                      >
                        <SelectTrigger id="dealSize" className="mt-1">
                          <SelectValue placeholder="Select deal size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<$250K">Less than $250K</SelectItem>
                          <SelectItem value="$250K - $1M">$250K - $1M</SelectItem>
                          <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                          <SelectItem value=">$5M">More than $5M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Share Investment Data</p>
                        <p className="text-sm text-gray-600">Allow anonymized data to improve matching algorithm</p>
                      </div>
                      <Switch id="shareData" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-gray-600">Make your profile visible to founders</p>
                      </div>
                      <Switch id="profileVisibility" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <div className="px-6 py-4 border-t flex justify-end">
              <Button 
                onClick={handleSaveSettings}
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
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
