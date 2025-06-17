'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageList } from "@/components/chat/MessageList";
import type { Message } from '@/types';
import { routeInquiry } from '@/ai/flows/inquiry-router-flow';
import type { RouteInquiryInput, RouteInquiryOutput } from '@/ai/flows/inquiry-router-flow';
import { useToast } from "@/hooks/use-toast";

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  // For demonstration, let's assume we have user details.
  // In a real app, this would come from auth.
  const [userDetails, setUserDetails] = useState({ email: "user@example.com", name: "Demo User" });

  useEffect(() => {
    const initialMessage: Message = {
      id: `initial-${Date.now()}`,
      text: `Hello! I'm ButeoBot. How can I assist you today? I can help with company information, general conversation, or booking appointments.`,
      sender: 'bot',
      timestamp: new Date(),
      mode: 'system',
    };
    if (messages.length === 0) {
        setMessages([initialMessage]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ensure this runs only once

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
      mode: 'chat', // Mode is determined by AI now, so default to 'chat' for user message
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const input: RouteInquiryInput = {
        userInput: text,
        userEmail: userDetails.email,
        userName: userDetails.name,
      };
      const output: RouteInquiryOutput = await routeInquiry(input);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: output.responseText,
        sender: 'bot',
        timestamp: new Date(),
        mode: output.determinedMode,
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error calling AI router flow:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Apologies, I encountered an issue. Please try again.",
        sender: 'bot',
        timestamp: new Date(),
        mode: 'system',
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full shadow-none border-none flex flex-col bg-card">
      <CardContent className="flex-grow overflow-hidden p-0">
        <MessageList messages={messages} isLoading={isLoading} />
      </CardContent>
      <CardFooter className="p-0 border-t border-border bg-card">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
}
