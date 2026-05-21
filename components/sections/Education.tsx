"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";

const EDUCATION = [
  {
    institution: "AISSMS Institute of Information Technology, Pune, India",
    degree: "Bachelor of Technology in Information Technology",
    period: "2023 – Present",
    cgpa: "CGPA: 8.6/10",
  }
];

export function Education() {
  return (
    <section id="education" className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32" aria-label="Education">
      <SectionLabel num="01" text="Education" />

      <div className="relative border-l border-[var(--color-border)] ml-3 md:ml-4 mt-16">
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-8 ml-10 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[45px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)] ring-4 ring-[var(--color-bg-primary)]"></div>

            <time dateTime={edu.period} className="font-body text-[var(--text-sm)] text-[var(--color-accent)] mb-2 block tracking-wider uppercase">
              {edu.period}
            </time>
            <h3 className="font-display text-[1.5rem] text-[var(--color-text-primary)] mb-1">
              {edu.degree}
            </h3>
            <div className="font-body text-[var(--text-base)] text-[var(--color-text-muted)] mb-3">
              {edu.institution}
            </div>
            
            <div className="flex items-start text-[var(--color-text-secondary)] font-body text-[var(--text-base)] leading-relaxed">
              <span className="text-[var(--color-border-hover)] mr-3 mt-1">▹</span>
              <span>{edu.cgpa}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
