
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface AIMessageProps {
  message: MessageType;
}

export function AIMessage({ message }: AIMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
          message.role === "user" ? "bg-brand-700 text-white" : "bg-white"
        }`}
      >
        <div className="flex items-start">
          {message.role === "assistant" && (
            <Avatar className="h-8 w-8 mr-3 flex-shrink-0">
              <AvatarFallback className="bg-brand-100 text-brand-700">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          )}
          <div className="flex-1">
            <div
              className={`text-sm ${
                message.role === "user" ? "text-white" : "text-gray-800"
              }`}
            >
              {message.content.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < message.content.split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
            <div
              className={`text-xs mt-2 ${
                message.role === "user" ? "text-brand-100" : "text-gray-500"
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {message.role === "user" && (
            <Avatar className="h-8 w-8 ml-3 flex-shrink-0">
              <AvatarFallback className="bg-gray-200 text-gray-700">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </div>
  );
}
