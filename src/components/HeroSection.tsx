import Link from 'next/link';
import { HalftoneOverlay } from './HalftoneOverlay';
import { Button } from './ui/button';

/**
 * Full-viewport hero.
 * Layout layers (back → front):
 *   1. StarField canvas — rendered in layout (fixed, z-0)
 *   2. Nebula gradient blobs (absolute, z-[2])
 *   3. Halftone dot overlay (absolute, z-[1])
 *   4. Technical grid lines (absolute, z-[2])
 *   5. Content (relative, z-10)
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-14">

      {/* ── Halftone pattern ─────────────────────────────────────────────── */}
      <HalftoneOverlay opacity={0.07} spacing={22} />

      {/* ── Nebula glow blobs ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
        <div className="absolute left-[10%] top-[20%] h-[380px] w-[380px] rounded-full bg-safety/5 blur-[120px]" />
        <div className="absolute bottom-[15%] right-[8%] h-[280px] w-[280px] rounded-full bg-purple-900/15 blur-[100px]" />
        <div className="absolute right-[30%] top-[10%] h-[180px] w-[180px] rounded-full bg-blue-950/20 blur-[80px]" />
      </div>

      {/* ── Subtle technical grid ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl">

        {/* System status label */}
        <div className="mb-10 flex items-center gap-2">
          <span className="inline-block h-[7px] w-[7px] animate-blink bg-safety" />
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-safety/80">
            System Online — Portfolio v2026
          </p>
        </div>

        {/* Name — clamp scales from 4rem (mobile) to 10rem (wide) */}
        <h1
          className="font-bold leading-[0.88] tracking-tighter text-foreground"
          style={{ fontSize: 'clamp(3.8rem, 11vw, 9.5rem)' }}
        >
          ILHAN
          <br />
          {/* Gradient: white → safety orange */}
          <span
            style={{
              backgroundImage:
                'linear-gradient(110deg, #f0f0f0 0%, #FF5F00 55%, #FF8C42 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            NURIZZWAN
          </span>
        </h1>

        {/* Role line */}
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px w-14 bg-safety/50" />
          <p className="font-bold-mono text-[11px] uppercase tracking-[0.30em] text-foreground">
           Final Year Software Engineer Student @ UniKL MIIT 
          </p>
        </div>

        {/* Bio */}
        <p className="mt-8 max-w-[44ch] leading-relaxed text-muted-foreground">
          Working on improving myself by exploring new ideas and designing new creative design or anything content creation. 
          Interested in visualisation and minimal w/ industrial design concept
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/projects" className="inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest h-10 px-6 bg-safety text-background hover:bg-safety/85 transition-all duration-200">
            View Projects
          </Link>
          <Link href="/blog" className="inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest h-10 px-6 border border-safety text-safety hover:bg-safety hover:text-background transition-all duration-200">
            Read Blog
          </Link>
        </div>

        {/* Stats row */}
        <div className="relative mt-20 grid max-w-sm grid-cols-3 gap-8 border-t border-border pt-8">
          {[
            { value: '01', label: 'Projects' },
            { value: '01', label: 'Posts' },
            { value: '2+', label: 'Yrs Exp.' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-mono text-2xl font-bold text-safety">{value}</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Coordinate watermark (bottom-right) ──────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-8 right-8 z-10 text-right font-mono text-[8px] uppercase tracking-wider text-muted-foreground/30"
        aria-hidden="true"
      >
        <p>35.6762°&nbsp;N&nbsp;·&nbsp;139.6503°&nbsp;E</p>
        <p>STELLAR REF: SG-2026·FOLIO</p>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
        <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/50">
          Scroll
        </p>
      </div>

      {/* ── Micrographic binary strip (bottom) ──────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-8 overflow-hidden font-mono leading-tight text-safety/10"
        style={{ fontSize: '7px', wordBreak: 'break-all', letterSpacing: '0.08em' }}
        aria-hidden="true"
      >
        01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111
        01110010 01101100 01100100 00100001 00100000 01000011 01101111 01100100
        01100101 00100000 01101001 01110011 00100000 01110000 01101111 01100101
        01110100 01110010 01111001 00101110 00100000 01000011 01101111 01100100
        01100101 00100000 01101001 01110011 00100000 01100001 01110010 01110100
        00101110 00100000 01000010 01110101 01101001 01101100 01100100 00100000
        01110111 01101001 01110100 01101000 00100000 01110000 01110010 01100101
        01100011 01101001 01110011 01101001 01101111 01101110 00101110 00100000
      </div>
    </section>
  );
}
