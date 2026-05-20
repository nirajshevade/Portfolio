"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
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
          className="flex items-center gap-1 px-2 py-2 rounded-[var(--radius-pill)] border border-[var(--color-border)] shadow-[0_0_24px_rgba(0,0,0,0.5)]"
          style={{
            backgroundColor: "rgba(10, 10, 10, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.name;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                className={cn(
                  "px-4 py-2 rounded-[var(--radius-pill)] font-ui text-[var(--text-sm)] transition-all duration-300",
                  isActive
                    ? "bg-[var(--color-accent-dim)] text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-card)]"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </nav>
      </motion.header>
    </AnimatePresence>
  );
}
