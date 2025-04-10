
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, LogOut, Menu, X } from "lucide-react";

interface HeaderProps {
  userType: "vc" | "founder";
}

export function Header({ userType }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Placeholder for logout logic
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to={userType === "vc" ? "/vc-dashboard" : "/founder-dashboard"} className="flex items-center">
              <img src="/public/logo.png" alt="Logo" className="h-10 w-50 mr-2" />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {userType === "vc" && (
              <>
                <Link
                  to="/vc-dashboard"
                  className="text-gray-700 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  className="text-gray-700 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Favorites
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-700 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Settings
                </Link>
              </>
            )}

            {userType === "founder" && (
              <>
                <Link
                  to="/founder-dashboard"
                  className="text-gray-700 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Profile
                </Link>
                <Link
                  to="/ai-feedback"
                  className="text-gray-700 hover:text-brand-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  AI Feedback
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>{userType === "vc" ? "VC" : "FD"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="space-y-1 px-4">
            {userType === "vc" && (
              <>
                <Link
                  to="/vc-dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/favorites"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Favorites
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </>
            )}

            {userType === "founder" && (
              <>
                <Link
                  to="/founder-dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/ai-feedback"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Feedback
                </Link>
              </>
            )}

            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt="User" />
                    <AvatarFallback>{userType === "vc" ? "VC" : "FD"}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {userType === "vc" ? "VC User" : "Founder User"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    user@example.com
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" aria-label="Notifications">
                  <Bell className="h-6 w-6" />
                </Button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/settings");
                  }}
                >
                  Settings
                </button>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
