import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-16 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-[0.2em] mb-6">
          Our Story
        </div>
        <h1 className="text-5xl font-black tracking-tight text-foreground mb-6">
          Fueling the future of <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-4">tech creators</span>.
        </h1>
        <p className="text-xl text-muted leading-relaxed max-w-2xl">
          Antigravity is a space designed for developers, designers, and creators to share knowledge, challenge the status quo, and inspire the next generation of builders.
        </p>
      </header>

      <div className="space-y-20">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative group overflow-hidden rounded-[2.5rem] border border-border bg-surface p-10 transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5">
            <div className="mb-6 h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted leading-relaxed">
              We believe the best way to learn is by sharing. Our platform provides a seamless, distraction-free environment for authors to publish their deep dives and tutorials.
            </p>
          </div>

          <div className="relative group overflow-hidden rounded-[2.5rem] border border-border bg-surface p-10 transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5">
            <div className="mb-6 h-12 w-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Community First</h2>
            <p className="text-muted leading-relaxed">
              Every post is an opportunity to connect. We are powered by contributions from writers across the globe sharing their unique journeys and breakthroughs.
            </p>
          </div>
        </section>

        <section className="bg-foreground text-background rounded-[3rem] p-12 md:p-16 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-6 tracking-tight">The Modern Tech Stack</h2>
            <p className="text-lg opacity-80 leading-relaxed max-w-2xl mb-10">
              Antigravity isn&apos;t just a blog; it&apos;s a technical showcase. Built with the latest Next.js App Router capabilities, React Server Components, and a focus on atomic design principles.
            </p>
            <div className="flex flex-wrap gap-4">
              {["Next.js 15", "React 19", "Tailwind CSS v4", "TypeScript", "Glassmorphism"].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-full border border-background/20 bg-background/5 text-sm font-bold tracking-tight">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </section>
      </div>
    </div>
  );
}
