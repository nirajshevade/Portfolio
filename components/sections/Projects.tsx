"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { SectionLabel } from "../ui/SectionLabel";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    title: "Container Health Monitoring System",
    type: "DevOps / Infrastructure",
    metrics: ["40% reliability ↑", "60% less manual deploy", "35% faster incident response"],
    tags: ["Prometheus", "Docker", "Kafka", "ELK Stack", "Grafana", "Jenkins", "CI/CD"],
    accent: "var(--color-accent)",
    link: "https://github.com/nirajshevade/Scalable-container-health-monitoring-system",
    liveDemo: "#",
  },
  {
    title: "NLP Resume Parser Platform",
    type: "AI / Backend",
    metrics: ["End-to-end PDF/DOCX parsing", "Structured candidate data extraction", "REST API + indexed search"],
    tags: ["FastAPI", "spaCy", "NER", "TF-IDF", "MongoDB Atlas", "Streamlit"],
    accent: "var(--color-accent)",
    link: "https://github.com/nirajshevade/Resume-Parser",
    liveDemo: "https://resume-parser-x.streamlit.app/",
  },
  {
    title: "Mobile App @ Armtech AI",
    type: "Full-Stack / Mobile",
    metrics: ["32% load time reduction", "First recruited intern", "End-to-end from scratch"],
    tags: ["React Native", "Expo", "AWS EC2", "S3", "MERN"],
    accent: "var(--color-accent)",
  }
];

export function Projects() {
  return (
    <section id="work" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32" aria-label="Projects">
      <SectionLabel num="02" text="Selected Works" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1], // snappy
            }}
            className="flex h-full"
          >
            <GlassCard className="flex flex-col justify-between w-full group">
              <div>
                <span className="font-body text-[var(--text-xs)] text-[var(--color-accent)] uppercase tracking-wider mb-4 block">
                  {project.type}
                </span>
                <h3 className="font-display text-[2rem] md:text-[2.5rem] leading-[1.1] text-[var(--color-text-primary)] mb-6">
                  {project.title}
                </h3>

                <hr className="border-[var(--color-border)] my-6 transition-colors duration-300 group-hover:border-[var(--color-border-hover)]" />

                <ul className="flex flex-col items-start gap-3 mb-8">
                  {project.metrics.map((metric, i) => (
                    <li
                      key={i}
                      className="inline-flex items-center text-left bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-body text-[var(--text-sm)] px-4 py-2 rounded-[var(--radius-pill)]"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-body text-[0.7rem] text-[var(--color-text-secondary)] border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 rounded-[var(--radius-pill)] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="relative w-full group/btn flex items-center justify-between px-6 py-4 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] hover:shadow-[0_0_24px_var(--color-accent-dim)] transition-all duration-300">
                      <span className="font-ui text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] group-hover/btn:text-[var(--color-accent)] transition-colors">
                        Live Demo
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center group-hover/btn:bg-[var(--color-accent)] group-hover/btn:text-[var(--color-bg-primary)] transition-all duration-300 transform group-hover/btn:-rotate-45">
                        <ArrowRight size={14} />
                      </div>
                    </a>
                  )}

                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="relative w-full group/btn flex items-center justify-between px-6 py-4 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] hover:shadow-[0_0_24px_var(--color-accent-dim)] transition-all duration-300">
                      <span className="font-ui text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] group-hover/btn:text-[var(--color-accent)] transition-colors">
                        View Repository
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center group-hover/btn:bg-[var(--color-accent)] group-hover/btn:text-[var(--color-bg-primary)] transition-all duration-300 transform group-hover/btn:-rotate-45">
                        <ArrowRight size={14} />
                      </div>
                    </a>
                  ) : (
                    <button className="relative w-full group/btn flex items-center justify-between px-6 py-4 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] hover:shadow-[0_0_24px_var(--color-accent-dim)] transition-all duration-300 cursor-default">
                      <span className="font-ui text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] transition-colors">
                        Internal Project
                      </span>
                      <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center transition-all duration-300">
                        {/* No icon for internal project without link */}
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
