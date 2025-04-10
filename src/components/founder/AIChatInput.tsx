
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, RefreshCw, Send } from "lucide-react";

interface AIChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function AIChatInput({ onSendMessage, isLoading }: AIChatInputProps) {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate speech recognition
    if (!isRecording) {
      setTimeout(() => {
        setInput("Our startup is developing an AI-powered financial advisor for millennials...");
        setIsRecording(false);
      }, 3000);
    }
  };
  
  return (
    <div className="flex items-center">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="flex-1 min-h-[80px] resize-none bg-gray-100 rounded-lg border-gray-200 focus:border-brand-400 focus:ring focus:ring-brand-100"
        disabled={isLoading}
      />
      <div className="ml-3 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleRecording}
          className={`rounded-full h-10 w-10 ${isRecording ? "bg-red-50 text-red-500 border-red-200" : "bg-gray-50"}`}
          disabled={isLoading}
        >
          {isRecording ? (
            <MicOff className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </Button>
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
          className="bg-brand-700 hover:bg-brand-800 rounded-full h-10 w-10"
          size="icon"
        >
          {isLoading ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
