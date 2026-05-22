"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "../ui/SectionLabel";
import { GlassCard } from "../ui/GlassCard";

const SKILL_DOMAINS = [
  {
    name: "DEVOPS",
    skills: ["AWS", "Azure", "Docker", "Kubernetes", "Jenkins", "Grafana", "Terraform", "Linux", "Git/GitHub"],
  },
  {
    name: "DATA ENGINEER",
    skills: ["Kafka", "Apache Spark", "Airflow", "ETL Pipelines"],
  },
  {
    name: "AI ML",
    skills: ["Machine Learning", "NLP", "Data Analysis", "Power BI", "TensorFlow", "PyTorch"],
  },
  {
    name: "BACKEND",
    skills: ["Python", "Node.js", "Express.js", "FastAPI", "Django", "MongoDB", "MySQL", "PostgreSQL"],
  },
  {
    name: "FRONTEND",
    skills: ["JavaScript", "TypeScript", "React", "React Native", "Next.js", "Tailwind CSS"],
  }
];

export function About() {
  const [activeDomain, setActiveDomain] = useState("DEVOPS");

  return (
    <section id="about" className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32" aria-label="About Me">
      <div className="mb-12 flex justify-start">
        <SectionLabel num="00" text="About Me" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px] gap-16 lg:gap-24 items-start">
        {/* Left Column: Text & Skills */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="font-body text-[var(--text-lg)] text-[var(--color-text-secondary)] leading-relaxed space-y-6">
            <p>
              Hello! I&apos;m <strong className="text-[var(--color-text-primary)] font-medium">Niraj Shevade</strong>, a B.Tech Information Technology student and aspiring software developer passionate about building scalable, data-driven, and cloud-integrated applications. My journey into technology began with a curiosity for solving real-world problems through code, which led me to explore full-stack development, AI/ML, DevOps, and cloud computing.
            </p>
            <p>
              Over time, I&apos;ve worked on projects ranging from NLP-based resume parsing systems to scalable container monitoring platforms using Docker, Jenkins, Kafka, and Grafana. I enjoy developing efficient backend systems, responsive user interfaces, and reliable cloud deployments while continuously improving performance and user experience.
            </p>
            <p>
              I specialize in full-stack development, data analysis, machine learning fundamentals, and DevOps practices. I&apos;m particularly interested in MERN stack development, cloud technologies like AWS & Azure, automation workflows, and building impactful software solutions that combine innovation with scalability.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="font-ui text-[var(--text-sm)] tracking-widest uppercase text-[var(--color-text-muted)] mb-6 font-semibold">
              Technologies & Skills
            </h3>
            
            {/* Domain Tabs */}
            <div className="flex flex-wrap gap-6 mb-8 border-b border-[rgba(255,255,255,0.08)] pb-4 relative">
              {SKILL_DOMAINS.map((domain) => {
                const isActive = activeDomain === domain.name;
                return (
                  <button
                    key={domain.name}
                    onClick={() => setActiveDomain(domain.name)}
                    className={`font-ui text-sm tracking-wider uppercase transition-all duration-300 relative px-1 py-2 ${
                      isActive 
                        ? "text-[var(--color-accent)] font-bold drop-shadow-[0_0_8px_var(--color-accent-dim)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] font-medium"
                    }`}
                  >
                    {domain.name}
                    {isActive && (
                      <motion.div 
                        layoutId="activeDomainTab"
                        className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Skills Gallery */}
            <div className="min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomain}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-wrap gap-4"
                >
                  {SKILL_DOMAINS.find(d => d.name === activeDomain)?.skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="font-body text-sm font-medium text-[var(--color-text-primary)] bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent)] hover:shadow-[0_0_20px_var(--color-accent-dim)] px-5 py-2.5 rounded-xl transition-all duration-300 cursor-default backdrop-blur-md flex items-center justify-center"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square mt-8 lg:mt-0"
        >
          {/* Decorative back border / glow similar to screenshot */}
          <div className="absolute inset-4 translate-x-4 translate-y-4 border border-[var(--color-accent)] rounded-[2rem] opacity-50 shadow-[0_0_40px_var(--color-accent-dim)]" />
          
          <GlassCard className="absolute inset-0 w-full h-full rounded-[2rem] flex items-center justify-center border-[rgba(255,255,255,0.1)] bg-[rgba(20,20,20,0.8)] backdrop-blur-xl overflow-hidden group">
            {/* Ambient background glow inside the card */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-dim)] to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-10" />
            
            <Image 
              src="/profile.png" 
              alt="Niraj Shevade" 
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
