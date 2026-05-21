import { ScrollyCanvas } from "@/components/canvas/ScrollyCanvas";
import { Overlay } from "@/components/overlay/Overlay";
import { NavBar } from "@/components/ui/NavBar";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { About } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { NeuroBotWidget } from "@/components/ui/NeuroBotWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <ScrollProgress />
      <NavBar />
      <CursorGlow />

      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>

      <div className="relative z-10 bg-[var(--color-bg-primary)] pt-12 rounded-t-[2.5rem] mt-[-2.5rem] md:rounded-t-[4rem] md:mt-[-4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <About />
        
        <div className="w-full max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-6">
            <h2 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] leading-[1.1] mb-3">
              Meet <span className="text-blue-500">NIRU AI.</span>
            </h2>
            <p className="font-body text-[var(--text-lg)] text-[var(--color-text-secondary)]">
              My personal digital twin. Ask it anything about my skills, projects, and experience.
            </p>
          </div>
          <NeuroBotWidget />
        </div>

        <Education />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
