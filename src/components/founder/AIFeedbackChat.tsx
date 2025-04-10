
import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIMessage, MessageType } from "./AIMessage";
import { AITypingIndicator } from "./AITypingIndicator";
import { AIChatInput } from "./AIChatInput";
import { AISuggestedResponses } from "./AISuggestedResponses";
import { AIChatHeader } from "./AIChatHeader";

interface AIFeedbackChatProps {
  onComplete?: (conversation: MessageType[]) => void;
}

export function AIFeedbackChat({ onComplete }: AIFeedbackChatProps) {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your investor AI assistant. I'll ask you questions about your startup to help you refine your pitch and prepare for investor conversations. Let's start - could you tell me briefly about your startup idea?",
      timestamp: new Date(),
    },
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (input: string) => {
    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse;
      
      // Different responses based on conversation state
      if (messages.length === 1) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Thanks for sharing! What problem are you solving with this startup? Who experiences this problem most acutely?",
          timestamp: new Date(),
        };
      } else if (messages.length === 3) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Great problem statement. Now tell me about your solution - how does it work and what makes it different from existing alternatives?",
          timestamp: new Date(),
        };
      } else if (messages.length === 5) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Interesting solution! What's your target market size, and how do you plan to monetize this solution?",
          timestamp: new Date(),
        };
      } else if (messages.length === 7) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Tell me about your team. What relevant experience do you have that makes you uniquely qualified to execute on this idea?",
          timestamp: new Date(),
        };
      } else if (messages.length === 9) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Last question - what are your key milestones for the next 12-18 months, and how much capital are you raising?",
          timestamp: new Date(),
        };
      } else if (messages.length === 11) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Thanks for sharing all this information! I've analyzed your responses and have some feedback on your pitch. Would you like to see my assessment?",
          timestamp: new Date(),
        };
      } else if (messages.length === 13) {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Here's my analysis:\n\n**Strengths**\n• Clear problem identification\n• Innovative solution approach\n• Strong team background\n\n**Areas for Improvement**\n• Market size could be more precisely defined\n• Competitive differentiation needs more emphasis\n• Monetization strategy should be more detailed\n\n**Investor Ready Score: 78/100**\n\nI've saved this conversation and generated your founder profile. VCs can now view this assessment along with your startup details.",
          timestamp: new Date(),
        };
        
        // Notify parent that conversation is complete
        if (onComplete) {
          setTimeout(() => {
            onComplete([...messages, userMessage, aiResponse]);
          }, 1000);
        }
      } else {
        aiResponse = {
          id: Date.now().toString(),
          role: "assistant" as const,
          content: "Thanks for the additional information. This helps paint a clearer picture of your startup. Do you have any questions for me?",
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSuggestedResponse = (suggestion: string) => {
    handleSendMessage(suggestion);
  };
  
  return (
    <div className="flex flex-col h-full">
      <AIChatHeader />
      
      <ScrollArea className="flex-1 p-6 bg-gray-200">
        <div className="space-y-6">
          {messages.map((message) => (
            <AIMessage key={message.id} message={message} />
          ))}
          
          {isLoading && <AITypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-white">
        <AIChatInput 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
        
        <AISuggestedResponses 
          messageCount={messages.length}
          onSelectSuggestion={handleSuggestedResponse}
        />
      </div>
    </div>
  );
}
