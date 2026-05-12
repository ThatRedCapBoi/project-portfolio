import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/**
 * Industrial card with corner-bracket hover effect.
 * The four corner brackets grow on hover — a nod to mechanical precision.
 */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group relative border border-border p-6 transition-all duration-300',
        'hover:border-safety/40 hover:bg-white/[0.02]',
        className
      )}
    >
      {/* Corner brackets — visible on hover */}
      <span
        className="pointer-events-none absolute left-[-1px] top-[-1px] h-3 w-3 border-l-2 border-t-2 border-safety opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-3 w-3 border-b-2 border-r-2 border-safety opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Year */}
      <p className="mb-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
        {project.year}
      </p>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold leading-snug text-foreground transition-colors duration-200 group-hover:text-safety">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      {/* Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`${project.title} on GitHub`}
          >
            <Github size={12} />
            GitHub
          </a>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-safety transition-colors hover:text-safety/75"
            aria-label={`${project.title} live site`}
          >
            <ExternalLink size={12} />
            Live
          </a>
        )}
      </div>
    </article>
  );
}
