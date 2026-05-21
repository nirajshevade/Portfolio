"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Terminal, Loader2 } from "lucide-react";
import { GlassCard } from "./GlassCard";

const SUGGESTED_QUESTIONS = [
  "Who is Niraj?",
  "What technologies does he know?",
  "Tell me about his projects",
  "How can I contact him?"
];

type Message = {
  role: "user" | "bot";
  content: string;
};

export function NeuroBotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I am Niru AI. Ask me anything about Niraj's skills, projects, or experience." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Placeholder for bot response
    setMessages((prev) => [...prev, { role: "bot", content: "" }]);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [userMessage] }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        if (chunkValue) {
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            if (lastMessage.role === "bot") {
              lastMessage.content += chunkValue;
            }
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.role === "bot" && lastMessage.content === "") {
            lastMessage.content = "Error: Could not connect to Niru backend. Ensure the backend is running.";
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[500px] flex flex-col mt-6">
      {/* Neon glowing border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-[2rem] opacity-30 blur-md animate-pulse"></div>
      
      <GlassCard className="relative w-full h-full rounded-[2rem] flex flex-col border border-[rgba(255,255,255,0.1)] bg-[rgba(10,10,15,0.8)] backdrop-blur-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-sm rounded-full opacity-50 animate-pulse"></div>
              <Bot className="relative text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="font-ui text-sm font-semibold tracking-wider text-white">NIRU AI</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] uppercase text-green-400 tracking-widest font-mono">Status: Online</span>
              </div>
            </div>
          </div>
          <Terminal className="text-[var(--color-text-muted)] w-5 h-5 opacity-50" />
        </div>

        {/* Chat Area */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.1)] scrollbar-track-transparent font-mono text-sm"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === "user" 
                      ? "bg-red-500/20 text-white rounded-tr-none border border-red-500/30" 
                      : "bg-[rgba(255,255,255,0.05)] text-gray-300 rounded-tl-none border border-[rgba(255,255,255,0.1)]"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.role === "bot" && idx === messages.length - 1 && isLoading && (
                    <span className="inline-block w-2 h-4 bg-blue-400 animate-pulse ml-1 align-middle"></span>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
                    <User className="w-4 h-4 text-red-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 hover:bg-blue-500/20 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)]">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="relative flex items-center"
          >
            <span className="absolute left-4 text-blue-500 font-mono text-lg">{'>'}</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Niraj..."
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors font-mono"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="absolute right-2 p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 disabled:opacity-50 disabled:hover:bg-blue-500/20 transition-colors"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </GlassCard>
    </div>
  );
}
