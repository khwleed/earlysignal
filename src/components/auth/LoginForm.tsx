
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"vc" | "founder">("vc");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login (would be replaced with real authentication)
    setTimeout(() => {
      setIsLoading(false);

      if (userType === "vc") {
        navigate("/vc-dashboard");
      } else {
        navigate("/founder-dashboard");
      }

      toast({
        title: "Success",
        description: "You are now logged in.",
      });
    }, 1500);
  };

  return (
    <Tabs defaultValue="vc" onValueChange={(v) => setUserType(v as "vc" | "founder")}>
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="vc">Investor</TabsTrigger>
        <TabsTrigger value="founder">Founder</TabsTrigger>
      </TabsList>

      <TabsContent value="vc" className="mt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-800">
                Forgot password?
              </a>
            </div>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>

          <Button type="submit" className="w-full bg-brand-700 hover:bg-brand-800" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-brand-600 hover:text-brand-800">
              Sign up
            </a>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="founder" className="mt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="founder-email">Email</Label>
            <Input id="founder-email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="founder-password">Password</Label>
              <a href="#" className="text-sm font-medium text-brand-600 hover:text-brand-800">
                Forgot password?
              </a>
            </div>
            <Input id="founder-password" type="password" placeholder="••••••••" required />
          </div>

          <Button type="submit" className="w-full bg-brand-700 hover:bg-brand-800" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="text-center text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="font-medium text-brand-600 hover:text-brand-800">
              Sign up
            </a>
          </div>
        </form>
      </TabsContent>
    </Tabs>
  );
}
