"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, X, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chatbot({ open }: { open: boolean }) {
  const [isOpen, setIsOpen] = useState(() => {
    // Check sessionStorage on initial load
    if (typeof window !== 'undefined') {
      const sessionClosed = sessionStorage.getItem('chatbot-closed');
      if (sessionClosed === 'true') {
        return false;
      }
    }
    return true;
  });
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm your portfolio assistant. How can I help you with information about this portfolio?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update isOpen when open prop changes (e.g., from URL parameter)
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open);
    }
  }, [open]);

  // Handle closing the chatbot
  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('chatbot-closed', 'true');
    }
  };

  // Handle opening the chatbot
  const handleOpen = () => {
    setIsOpen(true);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('chatbot-closed');
    }
  };

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Prevent body scroll on mobile when chatbot is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640; // sm breakpoint
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the API route instead of direct function
      const response = await fetch("https://chat.metacard.me/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // Add assistant message to the chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      console.error("Error querying chatbot:", error);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <Button
            onClick={handleOpen}
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center shadow-lg"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-0 right-0 left-0 sm:bottom-4 sm:right-4 sm:left-auto w-full sm:w-96 h-[100dvh] sm:h-96 z-50 shadow-lg flex flex-col sm:rounded-lg rounded-none">
          <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0 border-b">
            <CardTitle className="text-md font-medium">
              Portfolio Assistant
            </CardTitle>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 rounded-full"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <ScrollArea className="flex-1 px-3">
            <CardContent className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
          </ScrollArea>

          <CardFooter className="p-3 pt-0">
            <div className="flex w-full space-x-2">
              <Input
                placeholder="Ask me anything about this portfolio..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
