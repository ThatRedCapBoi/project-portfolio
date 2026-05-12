import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

interface BlogCardProps {
  post: PostMeta;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-6 transition-colors duration-150 hover:bg-white/[0.018]"
    >
      <div className="flex items-start gap-6">

        {/* Date column */}
        <time
          dateTime={post.date}
          className="min-w-[68px] font-mono text-[12px] uppercase tracking-wider text-foreground/55 pt-0.5"
        >
          {formatDate(post.date)}
        </time>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground transition-colors duration-150 group-hover:text-safety leading-snug mb-1.5">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-wider text-safety/55"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Reading time */}
        <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/40 pt-0.5 whitespace-nowrap">
          {post.readingTime}&nbsp;min
        </div>
      </div>
    </Link>
  );
}
