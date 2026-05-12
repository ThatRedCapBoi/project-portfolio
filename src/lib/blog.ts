import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function wordsPerMinute(text: string): number {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.(md|mdx)$/, '');
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns all post metadata sorted newest-first.
 * Called at build time from page.tsx / generateStaticParams.
 */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: slugFromFilename(filename),
        title: data.title ?? 'Untitled',
        date: data.date ?? '1970-01-01',
        description: data.description ?? '',
        tags: (data.tags as string[]) ?? [],
        readingTime: wordsPerMinute(content),
        coverImage: data.coverImage,
      } satisfies PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Returns a single post (meta + raw MDX/markdown content) by slug.
 * Throws if the file does not exist — Next.js will render a 404.
 */
export function getPostBySlug(slug: string): Post {
  const candidates = ['.md', '.mdx'].map((ext) =>
    path.join(CONTENT_DIR, `${slug}${ext}`)
  );
  const filepath = candidates.find((p) => fs.existsSync(p));
  if (!filepath) throw new Error(`Post not found: ${slug}`);

  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? 'Untitled',
    date: data.date ?? '1970-01-01',
    description: data.description ?? '',
    tags: (data.tags as string[]) ?? [],
    readingTime: wordsPerMinute(content),
    coverImage: data.coverImage,
    content,
  };
}
