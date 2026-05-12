/** @type {import('next').NextConfig} */

// When deploying to github.io/REPO_NAME, pass REPO_NAME as an env var in CI.
// For a user/org root site (username.github.io) leave REPO_NAME unset.
const repoName = process.env.REPO_NAME || '';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // ── Static export ────────────────────────────────────────────────────────
  // Emits a fully static `out/` directory; required for GitHub Pages.
  // No server runtime, no ISR, no API routes with side-effects.
  output: 'export',

  // ── Base path & asset prefix ─────────────────────────────────────────────
  // GitHub Pages serves project sites under /REPO_NAME, so Next.js must
  // prepend that path to every internal link and <script>/<link> tag.
  // Leave both empty for a root user/org site.
  basePath: isProd && repoName ? `/${repoName}` : '',
  assetPrefix: isProd && repoName ? `/${repoName}/` : '',

  // ── Images ───────────────────────────────────────────────────────────────
  // next/image's server-side optimisation is unavailable in static exports.
  // Set unoptimized:true to emit plain <img> tags instead.
  images: {
    unoptimized: true,
  },

  // ── Trailing slash ───────────────────────────────────────────────────────
  // GitHub Pages expects /blog/hello-world/ (with trailing slash) so that
  // directory-based index.html files resolve correctly.
  trailingSlash: true,
};

module.exports = nextConfig;
