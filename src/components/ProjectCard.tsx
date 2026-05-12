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
        'group relative border border-[#c4c4c4] bg-[#e4e4e4] p-6 transition-all duration-300',
        'hover:border-safety/60 hover:bg-[#dadada]',
        className
      )}
    >
      {/* Corner brackets — visible on hover */}
      <span
        className="pointer-events-none absolute left-[-1px] top-[-1px] h-4 w-4 border-l-2 border-t-2 border-safety opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-4 w-4 border-b-2 border-r-2 border-safety opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />


      {/* Year and Month */}
      <p className="mb-4 font-mono text-[9px] uppercase tracking-widest text-neutral-500">
        {project.year} • {project.month}
      </p>

      {/* Title */}
      <h3 className="mb-2 text-base font-semibold leading-snug text-neutral-900 transition-colors duration-200 group-hover:text-safety">
        {project.title}
      </h3>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-neutral-600">
        {project.description}
      </p>

      {/* Tags — darker orange text for contrast on light background */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} className="border-safety/40 text-[#b84500]">{tag}</Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-5">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-neutral-500 transition-colors hover:text-neutral-900"
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
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#cc4d00] transition-colors hover:text-safety"
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
