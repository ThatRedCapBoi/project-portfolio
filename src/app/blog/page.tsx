import type { Metadata } from 'next';
import { BlogCard } from '@/components/BlogCard';
import { SectionLabel } from '@/components/SectionLabel';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on engineering, design, and creative development.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="container mx-auto px-6 pt-28 pb-24">
      <div className="mx-auto max-w-3xl">

        {/* ── Page header ─────────────────────────────────────────────── */}
        <SectionLabel index="02" label="Blog" className="mb-4" />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Writing
        </h1>
        <p className="mt-3 mb-16 text-muted-foreground">
          Thoughts on engineering, design, and the spaces between.
        </p>

        {/* ── Post list ────────────────────────────────────────────────── */}
        {posts.length > 0 ? (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-24 text-center font-mono text-sm text-muted-foreground">
            // No posts yet. Drop a .md file into content/blog/ to get started.
          </p>
        )}
      </div>
    </main>
  );
}
