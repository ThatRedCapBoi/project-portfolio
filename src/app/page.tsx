import Link from 'next/link';
import { HeroSection } from '@/components/HeroSection';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { SectionLabel } from '@/components/SectionLabel';
import { getAllPosts } from '@/lib/blog';
import { projects } from '@/data/projects';

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Featured Projects ────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-24">
        <div className="mb-12 flex items-center justify-between">
          <SectionLabel index="01" label="Selected Projects" />
          <Link
            href="/projects"
            className="font-mono text-[10px] uppercase tracking-widest text-safety transition-colors hover:text-safety/70"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── Latest Posts ─────────────────────────────────────────────────── */}
      <section className="container mx-auto border-t border-border px-6 py-24">
        <div className="mb-12 flex items-center justify-between">
          <SectionLabel index="02" label="Latest Posts" />
          <Link
            href="/blog"
            className="font-mono text-[10px] uppercase tracking-widest text-safety transition-colors hover:text-safety/70"
          >
            View All →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="divide-y divide-border">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="font-mono text-sm text-muted-foreground">
            // No posts yet. Drop a .md file into content/blog/ to get started.
          </p>
        )}
      </section>
    </main>
  );
}
