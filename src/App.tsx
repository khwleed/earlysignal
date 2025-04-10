
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import VCDashboard from "./pages/VCDashboard";
import StartupProfile from "./pages/StartupProfile";
import AIFeedbackPage from "./pages/AIFeedbackPage";
import FounderDashboard from "./pages/FounderDashboard";
import FounderProfile from "./pages/FounderProfile";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/vc-dashboard" element={<VCDashboard />} />
          <Route path="/founder-dashboard" element={<FounderDashboard />} />
          <Route path="/startup/:id" element={<StartupProfile />} />
          <Route path="/ai-feedback" element={<AIFeedbackPage />} />
          <Route path="/profile" element={<FounderProfile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
