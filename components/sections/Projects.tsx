"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { SectionLabel } from "../ui/SectionLabel";
import { ArrowRight, X, Terminal, Cpu, Database, Code2, Server, Cloud, Smartphone, GitBranch, Monitor, Keyboard, Mouse, Network, HardDrive, Binary, Wifi, Bug } from "lucide-react";

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
    title: "DomusMind — Cognitive Building Intelligence",
    type: "AI / DevOps",
    metrics: ["Real EnergyPlus + LLM closed-loop control", "18-zone autonomous setpoint optimization", "-2.43 kW peak demand vs. baseline"],
    tags: ["EnergyPlus", "Ollama/Llama3", "MCP", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Qdrant", "Docker"],
    accent: "var(--color-accent)",
    link: "https://github.com/nirajshevade/DomusMind",
    liveDemo: "",
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

const ICONS_LIST = [Terminal, Cpu, Database, Code2, Server, Cloud, Smartphone, GitBranch, Monitor, Keyboard, Mouse, Network, HardDrive, Binary, Wifi, Bug];

const BouncingIcons = ({ count }: { count: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const iconsData = useRef(Array.from({ length: count }).map(() => {
     return {
       Icon: ICONS_LIST[Math.floor(Math.random() * ICONS_LIST.length)],
       size: Math.floor(Math.random() * 20) + 16,
     };
  }));
  const physicsState = useRef<{ x: number, y: number, vx: number, vy: number, radius: number, rotation: number, vr: number }[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let cleanup: (() => void) | undefined;
    
    const timeout = setTimeout(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      
      physicsState.current = iconsData.current.map((data) => {
        const radius = data.size / 2 + 5; 
        return {
          x: Math.random() * (width - radius * 2) + radius,
          y: Math.random() * (height - radius * 2) + radius,
          vx: (Math.random() - 0.5) * 0.5, 
          vy: (Math.random() - 0.5) * 0.5,
          radius,
          rotation: Math.random() * 360,
          vr: (Math.random() - 0.5) * 0.3
        };
      });

      let animationFrameId: number;

      const update = () => {
        const state = physicsState.current;
        const els = elementsRef.current;
        const w = container.clientWidth;
        const h = container.clientHeight;
        
        for (let i = 0; i < state.length; i++) {
          const p1 = state[i];
          p1.x += p1.vx;
          p1.y += p1.vy;
          p1.rotation += p1.vr;
          
          if (p1.x - p1.radius <= 0) { p1.x = p1.radius; p1.vx *= -1; }
          if (p1.x + p1.radius >= w) { p1.x = w - p1.radius; p1.vx *= -1; }
          if (p1.y - p1.radius <= 0) { p1.y = p1.radius; p1.vy *= -1; }
          if (p1.y + p1.radius >= h) { p1.y = h - p1.radius; p1.vy *= -1; }
          
          for (let j = i + 1; j < state.length; j++) {
            const p2 = state[j];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = p1.radius + p2.radius;
            
            if (distance < minDistance && distance > 0) {
               const overlap = minDistance - distance;
               const nx = dx / distance;
               const ny = dy / distance;
               
               p1.x -= nx * overlap / 2;
               p1.y -= ny * overlap / 2;
               p2.x += nx * overlap / 2;
               p2.y += ny * overlap / 2;
               
               const kx = (p1.vx - p2.vx);
               const ky = (p1.vy - p2.vy);
               const p = (nx * kx + ny * ky); 
               
               p1.vx = p1.vx - p * nx;
               p1.vy = p1.vy - p * ny;
               p2.vx = p2.vx + p * nx;
               p2.vy = p2.vy + p * ny;
            }
          }
          
          if (els[i]) {
            els[i]!.style.transform = `translate(${p1.x - p1.radius}px, ${p1.y - p1.radius}px) rotate(${p1.rotation}deg)`;
          }
        }
        animationFrameId = requestAnimationFrame(update);
      };

      update();
      cleanup = () => cancelAnimationFrame(animationFrameId);
    }, 50);
    
    return () => {
      clearTimeout(timeout);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      {iconsData.current.map((data, i) => (
        <div 
          key={i} 
          ref={(el) => { elementsRef.current[i] = el; }}
          className="absolute top-0 left-0 will-change-transform"
        >
          <data.Icon size={data.size} />
        </div>
      ))}
    </div>
  );
};

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  return (
    <section id="work" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32" aria-label="Projects">
      <SectionLabel num="02" text="Selected Works" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedProjects.map((project, index) => (
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
                  {project.liveDemo !== undefined && (
                    project.liveDemo.startsWith("http") ? (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="relative w-full group/btn flex items-center justify-between px-6 py-4 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] hover:shadow-[0_0_24px_var(--color-accent-dim)] transition-all duration-300">
                        <span className="font-ui text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] group-hover/btn:text-[var(--color-accent)] transition-colors">
                          Live Demo
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center group-hover/btn:bg-[var(--color-accent)] group-hover/btn:text-[var(--color-bg-primary)] transition-all duration-300 transform group-hover/btn:-rotate-45">
                          <ArrowRight size={14} />
                        </div>
                      </a>
                    ) : (
                      <button onClick={() => setShowModal(true)} className="relative w-full group/btn flex items-center justify-between px-6 py-4 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[rgba(10,10,10,0.5)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] hover:shadow-[0_0_24px_var(--color-accent-dim)] transition-all duration-300 text-left">
                        <span className="font-ui text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] group-hover/btn:text-[var(--color-accent)] transition-colors">
                          Live Demo
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[var(--color-surface)] flex items-center justify-center group-hover/btn:bg-[var(--color-accent)] group-hover/btn:text-[var(--color-bg-primary)] transition-all duration-300 transform group-hover/btn:-rotate-45">
                          <ArrowRight size={14} />
                        </div>
                      </button>
                    )
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

      {PROJECTS.length > 3 && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[rgba(10,10,10,0.5)] border border-[var(--color-border)] rounded-[var(--radius-pill)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] hover:shadow-[0_0_24px_var(--color-accent-dim)] transition-all duration-300"
          >
            <span className="font-ui text-[var(--text-sm)] font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
              {showAll ? "Show Less Projects" : "Show More Projects"}
            </span>
          </button>
        </div>
      )}

      {/* Work In Progress Modal */}
      <AnimatePresence>
        {showModal && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-7xl w-full h-[90vh] flex flex-col lg:flex-row items-center justify-center p-2 lg:p-8 gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(0,0,0,0.6)] text-white hover:bg-[var(--color-accent)] transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              
              {/* Left Side Floating Icons (Hidden on small screens) */}
              <div className="hidden lg:block flex-1 relative h-full opacity-30 text-[var(--color-accent)] pointer-events-none">
                 <BouncingIcons count={15} />
              </div>

              {/* Center Image */}
              <div className="shrink-0 w-full lg:w-auto h-full flex justify-center items-center z-10">
                <Image
                  src="/WorkInProgress.png"
                  alt="Work in Progress"
                  width={1200}
                  height={900}
                  className="w-full lg:w-auto h-full max-h-[85vh] object-contain rounded-xl shadow-[0_0_50px_rgba(255,0,0,0.15)]"
                />
              </div>

              {/* Right Side Floating Icons (Hidden on small screens) */}
              <div className="hidden lg:block flex-1 relative h-full opacity-30 text-[var(--color-accent)] pointer-events-none">
                 <BouncingIcons count={15} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
