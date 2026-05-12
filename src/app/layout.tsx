import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { NavBar } from '@/components/NavBar';
import { StarField } from '@/components/StarField';
// @ts-ignore: Cannot find module or type declarations for CSS imports.
import './globals.css';

// ── Site-wide metadata ────────────────────────────────────────────────────────
// Override per-page with `export const metadata` in each page.tsx.

// ── Build the icon URL with basePath prefix ────────────────────────────────
// This matches next.config.js logic: basePath is `/project-portfolio` in prod
const isProd = process.env.NODE_ENV === 'production';
const repoName = process.env.REPO_NAME || '';
const basePath = isProd && repoName ? `/${repoName}` : '';
const iconUrl = `${basePath}/icon.svg`;

export const metadata: Metadata = {
  title: {
    default: 'Ilhan Nurizzwan — Personal Space',
    template: '%s | Ilhan Nurizzwan',
  },
  description:
    'Meow Meow',
  // Update the URL once deployed:
  metadataBase: new URL('https://thatredcapboi.github.io'),
  icons: {
    icon: [
      { url: iconUrl, type: 'image/svg+xml' },
    ],
    shortcut: iconUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // GeistSans/Mono expose CSS custom properties; reference them in tailwind.config.ts
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      // Force dark colour-scheme so native browser UI (scrollbars, inputs) matches
      style={{ colorScheme: 'dark' }}
    >
      <body className="bg-background text-foreground antialiased overflow-x-hidden">

        {/* Fixed star-field canvas — sits at z-0, behind everything */}
        <StarField />

        {/* All page content lives above the star field */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <NavBar />

          {/* flex-1 so footer is always at the bottom */}
          <div className="flex-1">{children}</div>

          {/* ── Footer ─────────────────────────────────────────────────── */}
          <footer className="border-t border-border mt-24 py-8">
            <div className="container mx-auto flex flex-col items-center justify-between gap-3 md:flex-row">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                © {new Date().getFullYear()} ILHAN NURIZZWAN&nbsp;·&nbsp;Built with{' '}
                <span className="text-safety">Next.js</span> +{' '}
                <span className="text-safety">Tailwind</span>
              </p>
              <p
                className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/35"
                aria-hidden="true"
              >
                STELLAR GRID · v2026 · SYSTEM NOMINAL
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
