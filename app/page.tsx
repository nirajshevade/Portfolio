import { ScrollyCanvas } from "@/components/canvas/ScrollyCanvas";
import { Overlay } from "@/components/overlay/Overlay";
import { NavBar } from "@/components/ui/NavBar";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { SecondaryAnimation } from "@/components/canvas/SecondaryAnimation";


export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <ScrollProgress />
      <NavBar />
      <CursorGlow />

      <ScrollyCanvas>
        <Overlay />
      </ScrollyCanvas>

      <SecondaryAnimation />

      <div className="relative z-10 bg-[var(--color-bg-primary)] pt-12 rounded-t-[2.5rem] mt-[-2.5rem] md:rounded-t-[4rem] md:mt-[-4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  );
}
