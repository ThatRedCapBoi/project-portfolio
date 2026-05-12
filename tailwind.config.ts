import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  // shadcn/ui uses class-based dark mode toggling
  darkMode: ['class'],

  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],

  theme: {
    // ── Container ────────────────────────────────────────────────────────────
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },

    extend: {
      // ── Colour palette ─────────────────────────────────────────────────────
      // Safety orange (#FF5F00) is the single accent hue — use it sparingly.
      // All other colours derive from near-black/near-white neutrals.
      colors: {
        // shadcn/ui semantic tokens (CSS-variable-backed)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Design-system accent — industrial safety orange
        safety: {
          DEFAULT: '#FF5F00',
          dim: 'rgba(255, 95, 0, 0.12)',
          glow: 'rgba(255, 95, 0, 0.35)',
        },
      },

      // ── Typography ──────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
      },

      // ── Border radius (industrial: sharp by default) ────────────────────────
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // ── Keyframe animations ─────────────────────────────────────────────────
      keyframes: {
        // Star twinkle
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        // Slow CRT scan line
        scan: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        // Status blink
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        // Fade up entrance
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        scan: 'scan 14s linear infinite',
        blink: 'blink 1.2s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
