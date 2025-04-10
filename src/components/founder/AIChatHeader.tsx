
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Info } from "lucide-react";

export function AIChatHeader() {
  return (
    <div className="p-4 border-b bg-white flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="h-9 w-9 mr-2 bg-brand-100">
          <AvatarFallback className="bg-brand-100 text-brand-700">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">Investor AI Assistant</h3>
          <p className="text-xs text-gray-500">Powered by EarlySignal</p>
        </div>
      </div>
      <div className="flex items-center">
        <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></div>
          <span className="text-xs">Live</span>
        </Badge>
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Help
        </Button>
      </div>
    </div>
  );
}
