import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { Badge } from '@/components/ui/badge';

// ── Static generation ─────────────────────────────────────────────────────────
// generateStaticParams tells Next.js which slugs to pre-render at build time.
// Required for dynamic routes in `output: 'export'` mode.

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Prevents Next.js from trying to render unknown slugs at runtime
// (irrelevant for static export, but good practice).
export const dynamicParams = false;

// ── Per-page metadata ─────────────────────────────────────────────────────────

interface Props {
  // In Next.js 15, route params are a Promise — always await them.
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.title,
    description: post.description,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <main className="container mx-auto px-6 pt-28 pb-24">
      <div className="mx-auto max-w-3xl">

        {/* ── Back link ──────────────────────────────────────────────────── */}
        <Link
          href="/blog"
          className="mb-12 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All Posts
        </Link>

        {/* ── Post header ─────────────────────────────────────────────────── */}
        <header className="mb-12">
          {/* Meta row */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <time
              dateTime={post.date}
              className="font-mono text-[12px] uppercase tracking-widest text-safety/70"
            >
              {formatDate(post.date)}
            </time>
            <span className="h-px w-4 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/55">
              {post.readingTime}&nbsp;min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2 foreground/70">
              {post.tags.map((tag) => (
                <Badge key={tag}>#{tag}</Badge>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="mt-10 h-px bg-border" />
        </header>

        {/* ── Post body ────────────────────────────────────────────────────── */}
        {/*
          MDXRemote (from next-mdx-remote/rsc) is a Server Component — it
          renders markdown/MDX at build time with zero client JS overhead.
          remarkGfm adds GitHub-Flavoured Markdown (tables, strikethrough, etc.)
          rehypeSlug  adds id attributes to headings for anchor links.
          rehypeAutolinkHeadings wraps headings in anchor tags.
        */}
        <article className="prose-portfolio">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
              },
            }}
          />
        </article>

        {/* ── Post footer ────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-border pt-8 flex items-center justify-between">
          <Link
            href="/blog"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-safety"
          >
            ← Back to Blog
          </Link>
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/35">
            STELLAR GRID · {post.date.slice(0, 4)}
          </span>
        </div>
      </div>
    </main>
  );
}
