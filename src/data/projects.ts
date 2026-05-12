export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  url?: string;
  github?: string;
  featured: boolean;
  year: number;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'Personal portfolio and markdown blog built with Next.js static export, deployed to GitHub Pages. Dark industrial design with stellar aesthetics.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    github: 'https://github.com/yourusername/portfolio',
    featured: true,
    year: 2025,
  },
  {
    id: 'project-two',
    title: 'Project Alpha',
    description:
      'A high-performance data visualisation dashboard with real-time WebSocket updates and a canvas-based rendering pipeline.',
    tags: ['React', 'WebSocket', 'Canvas API', 'D3'],
    github: 'https://github.com/yourusername/project-alpha',
    url: 'https://project-alpha.vercel.app',
    featured: true,
    year: 2024,
  },
  {
    id: 'project-three',
    title: 'CLI Toolkit',
    description:
      'A developer CLI toolkit that automates repetitive scaffolding tasks. Published to npm with 500+ weekly downloads.',
    tags: ['Node.js', 'CLI', 'TypeScript', 'npm'],
    github: 'https://github.com/yourusername/cli-toolkit',
    featured: true,
    year: 2024,
  },
  {
    id: 'project-four',
    title: 'Open Source Lib',
    description:
      'Lightweight utility library for working with time-series data in the browser. Zero dependencies, 2 kB gzipped.',
    tags: ['TypeScript', 'Library', 'OSS'],
    github: 'https://github.com/yourusername/timeseries-utils',
    featured: false,
    year: 2023,
  },
];
