import type { Metadata } from 'next';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionLabel } from '@/components/SectionLabel';
import { HalftoneOverlay } from '@/components/HalftoneOverlay';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected projects and engineering work.',
};

export default function ProjectsPage() {
  // Group projects by year, newest first
  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);

  return (
    <main className="container mx-auto px-6 pt-28 pb-24">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="relative mb-20 overflow-hidden border border-border p-10">
        <HalftoneOverlay opacity={0.06} spacing={18} />
        <div className="relative z-10">
          <SectionLabel index="01" label="Work" className="mb-4" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Selected Projects
          </h1>
          <p className="mt-3 max-w-[50ch] text-muted-foreground">
            A collection of projects spanning web development, tooling, and open-source.
          </p>
        </div>
      </div>

      {/* ── Projects grouped by year ─────────────────────────────────────── */}
      {years.map((year) => (
        <div key={year} className="mb-16">
          {/* Year divider */}
          <div className="mb-8 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {year}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects
              .filter((p) => p.year === year)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </div>
      ))}
    </main>
  );
}
