"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_MESSAGES = [
  "booting system...",
  "loading kernel modules... OK",
  "mounting filesystem... OK",
  "initializing data pipelines... OK",
  "connecting to databases... OK",
  "initializing AI pipelines... OK",
  "securing API gateways... OK",
  "deploying ML models... OK",
  "connecting to cloud infrastructure... OK"
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TerminalLoader({ progress: _progress }: { progress?: number }) {
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  
  useEffect(() => {
    // Lock scrolling and force scroll to top on mount
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Reveal messages with a fixed delay rather than mapping to raw progress
    const interval = setInterval(() => {
      setVisibleMessages(prev => {
        if (prev.length < BOOT_MESSAGES.length) {
          return BOOT_MESSAGES.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 250); // 250ms tiny delay per line
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      key="terminal-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070707] overflow-hidden font-body text-[var(--color-accent)] select-none pointer-events-auto"
    >
      
      {/* Scanline overlay */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.15]"
        style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
          backgroundSize: "100% 4px, 3px 100%"
        }}
      />
      
      {/* CRT Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-20" />

      {/* Screen Glitch Overlay */}
      <motion.div 
        animate={{ opacity: [0, 0.03, 0, 0.05, 0, 0.02, 0] }}
        transition={{ repeat: Infinity, duration: 4, times: [0, 0.1, 0.2, 0.4, 0.5, 0.8, 1] }}
        className="absolute inset-0 bg-[var(--color-accent)] z-20 mix-blend-overlay"
      />

      <div className="relative z-10 w-full max-w-2xl px-8 flex flex-col items-start">
        {/* ASCII Logo */}
        <div className="mb-12 opacity-90 drop-shadow-[0_0_12px_var(--color-accent)]">
          <pre className="text-sm sm:text-base md:text-lg leading-tight font-bold tracking-widest text-[var(--color-accent)]">
{`███╗   ██╗███████╗
████╗  ██║██╔════╝
██╔██╗ ██║███████╗
██║╚██╗██║╚════██║
██║ ╚████║███████║
╚═╝  ╚═══╝╚══════╝`}
          </pre>
        </div>

        {/* Terminal Logs */}
        <div className="flex flex-col gap-3 min-h-[350px] w-full">
          {visibleMessages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-sm md:text-base opacity-90 drop-shadow-[0_0_8px_var(--color-accent)]"
            >
              <span className="text-[var(--color-accent)] opacity-50 font-bold">{">"}</span>
              <span className="tracking-wider">
                {msg.includes("OK") ? (
                  <>
                    {msg.split("OK")[0]}
                    <span className="text-white ml-2 font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">OK</span>
                  </>
                ) : (
                  msg
                )}
              </span>
            </motion.div>
          ))}
          
          {/* Blinking Cursor */}
          <motion.div 
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.49, 0.5, 0.99, 1] }}
            className="w-3.5 h-6 bg-[var(--color-accent)] mt-2 drop-shadow-[0_0_10px_var(--color-accent)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
