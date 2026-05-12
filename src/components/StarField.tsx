'use client';

import { useEffect, useRef } from 'react';

// Pure canvas star-field — mounts after hydration so no SSR mismatch.
// Runs as a fixed backdrop behind all page content.

interface Star {
  x: number; // 0-1 relative
  y: number; // 0-1 relative
  r: number; // radius px
  base: number; // base opacity
  phase: number; // twinkle phase offset
  speed: number; // twinkle speed
  orange: boolean; // occasional safety-orange tint
}

const STAR_COUNT = 220;

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.15,
      base: Math.random() * 0.65 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.15,
      orange: Math.random() < 0.04, // ~4% of stars carry an orange tint
    }));

    let t = 0;
    let raf: number;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      t += 0.008;

      for (const s of stars) {
        const alpha = s.base * (0.55 + 0.45 * Math.sin(s.phase + t * s.speed));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.orange ? '#FF7A30' : '#f0f0f0';
        ctx.beginPath();
        ctx.arc(s.x * width, s.y * height, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
