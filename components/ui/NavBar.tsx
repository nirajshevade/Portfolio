"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function NavBar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide on scroll down, show on scroll up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <AnimatePresence>
      <motion.header
        variants={{
          visible: { y: 0, x: "-50%", opacity: 1 },
          hidden: { y: "-150%", x: "-50%", opacity: 0 },
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 z-50 w-auto"
      >
        <nav
          className="flex items-center gap-1 px-1 sm:px-2 py-1 sm:py-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] shadow-[0_0_24px_rgba(0,0,0,0.5)] max-w-[95vw] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.name;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                whileHover={{ scale: 1.15, backgroundColor: "var(--color-bg-card)", color: "var(--color-text-primary)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={cn(
                  "px-3 sm:px-4 py-1.5 sm:py-2 rounded-[var(--radius-pill)] font-ui text-[12px] sm:text-[var(--text-sm)] whitespace-nowrap transition-colors duration-300 origin-center inline-block",
                  isActive
                    ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)]"
                )}
              >
                {item.name}
              </motion.a>
            );
          })}
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
