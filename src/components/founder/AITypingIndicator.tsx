
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export function AITypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white shadow-sm rounded-lg p-4 max-w-[80%]">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3">
            <AvatarFallback className="bg-brand-100 text-brand-700">
              <Bot className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: "200ms" }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-bounce" style={{ animationDelay: "400ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
