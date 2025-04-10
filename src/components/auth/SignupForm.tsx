
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<"vc" | "founder">("vc");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup (would be replaced with real authentication)
    setTimeout(() => {
      setIsLoading(false);

      if (userType === "vc") {
        navigate("/vc-dashboard");
      } else {
        navigate("/founder-dashboard");
      }

      toast({
        title: "Account created",
        description: "You are now signed up.",
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Doe" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Firm</Label>
            <Input id="company" placeholder="Acme Capital" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" required />
          </div>

          <Button type="submit" className="w-full bg-brand-700 hover:bg-brand-800" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-brand-600 hover:text-brand-800">
              Sign in
            </a>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="founder" className="mt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="founder-first-name">First name</Label>
              <Input id="founder-first-name" placeholder="Jane" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founder-last-name">Last name</Label>
              <Input id="founder-last-name" placeholder="Smith" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="founder-email">Email</Label>
            <Input id="founder-email" type="email" placeholder="name@example.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startup-name">Startup name</Label>
            <Input id="startup-name" placeholder="My Awesome Startup" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="founder-password">Password</Label>
            <Input id="founder-password" type="password" placeholder="••••••••" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="founder-confirm-password">Confirm password</Label>
            <Input id="founder-confirm-password" type="password" placeholder="••••••••" required />
          </div>

          <Button type="submit" className="w-full bg-brand-700 hover:bg-brand-800" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>


        </form>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-brand-600 hover:text-brand-800">
            Sign in
          </a>
        </div>
      </TabsContent>
    </Tabs>
  );
}
