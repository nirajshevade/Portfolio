import { SectionLabel } from "../ui/SectionLabel";
import { ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <footer id="contact" className="relative z-10 w-full max-w-4xl mx-auto px-6 py-32 pb-16" aria-label="Contact">
      <SectionLabel num="03" text="Get in Touch" />

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
          <a 
            href="/NirajMain.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group relative flex items-center gap-6 px-8 py-5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-[2rem] hover:bg-[var(--color-accent-dim)] hover:border-[var(--color-accent)] hover:shadow-[0_0_30px_var(--color-accent-dim)] transition-all duration-500 overflow-hidden backdrop-blur-md"
          >
            <div className="flex flex-col items-start md:items-end text-left md:text-right">
              <span className="font-ui text-[var(--text-xs)] text-[var(--color-text-muted)] uppercase tracking-widest mb-1 group-hover:text-[var(--color-text-primary)] transition-colors">
                Available for Hire
              </span>
              <span className="font-display text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                View My Resume
              </span>
            </div>
            <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-bg-primary)] group-hover:border-[var(--color-accent)] transition-all duration-300 transform group-hover:rotate-45">
              <ArrowUpRight size={20} />
            </div>
          </a>

          <div className="flex flex-col md:items-end gap-4 font-ui text-[var(--text-base)] text-[var(--color-text-secondary)]">
            <a href="https://www.linkedin.com/in/niraj-shevade-3113b8290/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">LinkedIn</a>
            <a href="https://github.com/nirajshevade" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] transition-colors">GitHub</a>
            <a href="tel:+917385668637" className="hover:text-[var(--color-accent)] transition-colors">+91 7385668637</a>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--color-text-muted)] font-body text-[var(--text-sm)]">
        <p>© {new Date().getFullYear()} Niraj Shevade. All rights reserved.</p>
        <p>Pune, India</p>
      </div>
    </footer>
  );
}
