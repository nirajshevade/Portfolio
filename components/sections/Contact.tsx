"use client";

import { SectionLabel } from "../ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ParticleBackground } from "../ui/ParticleBackground";

export function Contact() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <footer ref={ref} id="contact" className="relative z-10 w-full px-6 py-32 pb-16 overflow-hidden" aria-label="Contact">
      {inView && <ParticleBackground />}

      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionLabel num="04" text="Get in Touch" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-16">
          <div>
            <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[1.1] mb-6">
              Let&apos;s build<br />something <span className="text-[var(--color-accent)] italic">scalable.</span>
            </h2>
            <a
              href="mailto:nirajshevade5@gmail.com"
              className="inline-flex items-center gap-2 font-body text-[var(--text-lg)] text-[var(--color-accent)] border-b border-[var(--color-accent)] pb-1 hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-colors"
            >
              nirajshevade5@gmail.com
              <ArrowUpRight size={20} />
            </a>
          </div>

          <div className="flex flex-col md:items-end gap-10">
            <motion.a 
              href="https://drive.google.com/file/d/1NQsWh2iiZyVfBvzAaeB3c9GuIsRv97pq/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer" 
              whileHover="hover"
              initial="initial"
              className="group relative flex items-center gap-6 px-8 py-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[2rem] overflow-hidden backdrop-blur-md"
            >
              <motion.div 
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)] shadow-[inset_0_0_30px_var(--color-accent-dim)] rounded-[2rem]"
              />
              
              <div className="relative z-10 flex flex-col items-start md:items-end text-left md:text-right">
                <span className="font-ui text-[var(--text-xs)] text-[var(--color-text-muted)] uppercase tracking-widest mb-1 group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  Available for Hire
                </span>
                <span className="font-display text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  View My Resume
                </span>
              </div>
              
              <motion.div 
                variants={{
                  initial: { backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "var(--color-text-primary)", rotate: 0 },
                  hover: { backgroundColor: "var(--color-accent)", borderColor: "var(--color-accent)", color: "var(--color-bg-primary)", rotate: 45 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative z-10 w-12 h-12 rounded-full border flex items-center justify-center"
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </motion.a>

            <div className="flex flex-col md:items-end gap-4 font-ui text-[var(--text-base)] text-[var(--color-text-secondary)]">
              <a href="https://www.linkedin.com/in/niraj-shevade-3113b8290/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">LinkedIn</a>
              <a href="https://github.com/nirajshevade" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">GitHub</a>
              <a href="tel:+917385668637" className="hover:text-[var(--color-accent)] transition-colors">+91 7385668637</a>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--color-text-muted)] font-body text-[var(--text-sm)]">
          <p>Made & built with ❤️ by Niraj Shevade</p>
          <p>Pune, India</p>
        </div>
      </div>
    </footer>
  );
}
