"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";

const EXPERIENCES = [
  {
    company: "Armtech AI Pvt. Ltd.",
    role: "Software Developer Intern",
    period: "June 2025 – August 2025",
    bullets: [
      "Engineered a mobile application architecture from scratch using React Native and Expo.",
      "Optimized AWS EC2 and S3 infrastructure, achieving a 32% reduction in load times.",
      "Spearheaded the recruitment and onboarding of the engineering team's first intern.",
      "Architected robust full-stack features utilizing the MERN stack.",
    ],
  },
  {
    company: "EduSkills × Google",
    role: "AI/ML Virtual Intern",
    period: "Jan 2026 – March 2026",
    bullets: [
      "Designed and trained predictive machine learning models using Google Cloud AI infrastructure.",
      "Processed and structured large-scale datasets for deep learning applications.",
      "Deployed highly available models leveraging containerized microservices.",
    ],
  },
  {
    company: "Microsoft Learn Student Ambassador Club IOIT",
    role: "President",
    period: "2025 – Present",
    bullets: [
      "Microsoft Learn Student Ambassador — Evangelizing cloud technologies and hosting technical workshops.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32" aria-label="Experience & Education">
      <SectionLabel num="02" text="Experience" />

      <div className="relative border-l border-[var(--color-border)] ml-3 md:ml-4 mt-16">
        {EXPERIENCES.map((exp, index) => (
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
            className="mb-16 ml-10 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[45px] top-1.5 w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)] ring-4 ring-[var(--color-bg-primary)]"></div>

            <time dateTime={exp.period} className="font-body text-[var(--text-sm)] text-[var(--color-accent)] mb-2 block tracking-wider uppercase">
              {exp.period}
            </time>
            <h3 className="font-display text-[1.5rem] text-[var(--color-text-primary)] mb-1">
              {exp.role}
            </h3>
            <div className="font-body text-[var(--text-base)] text-[var(--color-text-muted)] mb-6">
              {exp.company}
            </div>

            <ul className="flex flex-col gap-3">
              {exp.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start text-[var(--color-text-secondary)] font-body text-[var(--text-base)] leading-relaxed">
                  <span className="text-[var(--color-border-hover)] mr-3 mt-1">▹</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
