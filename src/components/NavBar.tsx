'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
] as const;

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/75 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between">

        {/* Logo — monospaced with safety-orange brackets */}
        <Link href="/" className="group flex items-center gap-1 font-mono text-sm">
          <span className="text-safety group-hover:opacity-70 transition-opacity">[</span>
          <span className="text-foreground">ILHAN.NURIZZWAN</span>
          <span className="text-safety group-hover:opacity-70 transition-opacity">]</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-mono text-[11px] uppercase tracking-widest transition-colors',
                isActive(href)
                  ? 'text-safety'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
              {isActive(href) && (
                <span className="ml-1 inline-block h-1 w-1 rounded-full bg-safety align-middle" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'block border-b border-border px-6 py-4 font-mono text-[11px] uppercase tracking-widest transition-colors',
                isActive(href)
                  ? 'text-safety'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
