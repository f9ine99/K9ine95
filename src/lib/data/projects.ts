import type { Component } from 'svelte';

export interface Tag {
  name: string;
  icon?: Component;
  color?: string;
}

export interface Language {
  name: string;
  color: string;
  percentage: number;
}

export interface Contributor {
  name: string;
  avatar: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  longDescription: string;
  story?: string;
  features?: string[];
  technicalHighlights?: string[];
  tags: Tag[];
  preview: {
    repo: string;
    description: string;
    stars?: number;
    contributors?: Contributor[];
  };
  languages?: Language[];
  isPrivate?: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'impactis',
    title: 'Impactis',
    date: 'Testing — 2026',
    description:
      'A collaborative project with <a href="https://github.com/RasAbrish" target="_blank" rel="noopener noreferrer">Abrham</a>, <a href="https://github.com/amegi123" target="_blank" rel="noopener noreferrer">Amanuel</a>, <a href="https://github.com/BirukW-23" target="_blank" rel="noopener noreferrer">Biruk</a>, and <strong>Yonas</strong> under HamerAI—<strong>Impactis</strong> (<a href="https://skiwai.com" target="_blank" rel="noopener noreferrer">skiwai.com</a>) connects startups with investors and advisors, and vice versa, in an AI-assisted marketplace. Currently in testing.',
    longDescription:
      '<strong>Impactis</strong>, served at <a href="https://skiwai.com" target="_blank" rel="noopener noreferrer">skiwai.com</a>, is the evolved HamerAI platform that links startups, investors, and advisors in one place so each side can discover and work with the others. The team is shipping an AI-powered core on top of a TypeScript stack. I contributed the initial system architecture and built the admin module: identity and access management, routing operational traffic through admin-facing APIs, loading and aggregating data for dashboards, and the surrounding admin workflows that keep the product observable and manageable while we harden it in testing.',
    features: [
      'Three-sided marketplace connecting startups, investors, and advisors',
      'AI-assisted flows powered by OpenAI and pgvector-backed retrieval on Postgres',
      'Admin console with IAM and centralized access to platform APIs',
      'Data fetching, aggregation, and reporting for operational and product insights',
      'End-to-end TypeScript with NestJS APIs and a Next.js frontend',
      'Testing and iteration phase ahead of broader rollout'
    ],
    technicalHighlights: [
      'PostgreSQL with pgvector for embeddings and semantic search workloads',
      'OpenAI API integrated into product and admin intelligence paths',
      'NestJS backend and Next.js frontend with Better Auth for secure access',
      'Cloudflare at the edge, Vercel for the web app, Railway for services, Docker for portability'
    ],
    tags: [
      { name: 'NestJS', color: '#E0234E' },
      { name: 'Next.js', color: '#000000' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'pgvector', color: '#6366f1' },
      { name: 'OpenAI', color: '#10a37f' },
      { name: 'Better Auth', color: '#5A0FC8' },
      { name: 'HamerAI', color: '#3178c6' }
    ],
    preview: {
      repo: 'impactis',
      description:
        'Three-sided marketplace linking startups, investors, and advisors—AI-assisted matching.',
      stars: 0,
      contributors: [
        { name: 'Firaol', avatar: '/images/firaol.jpg' },
        { name: 'Abrham', avatar: 'https://github.com/RasAbrish.png' },
        { name: 'Amanuel', avatar: 'https://github.com/amegi123.png' },
        { name: 'Biruk', avatar: 'https://github.com/BirukW-23.png' }
      ]
    },
    languages: [
      { name: 'TypeScript', color: '#3178c6', percentage: 95.4 },
      { name: 'JavaScript', color: '#f1e05a', percentage: 3.6 },
      { name: 'PLpgSQL', color: '#336791', percentage: 0.7 },
      { name: 'Dockerfile', color: '#384d54', percentage: 0.1 },
      { name: 'Other', color: '#8b949e', percentage: 0.2 }
    ],
    isPrivate: true,
    demoUrl: 'https://skiwai.com'
  },
  {
    slug: 'hamerai',
    title: 'HamerAI',
    date: 'Ongoing — May 2026',
    description:
      'An ongoing HamerAI initiative in the waitlist and landing-page phase: a business audit experience that surfaces problems clearly and guides teams toward fixes—with a FastAPI and Next.js stack.',
    longDescription:
      'The platform extends the HamerAI vision with a dedicated audit surface for businesses. The product is currently focused on waitlist capture and a polished landing experience while the core engine takes shape behind the scenes. My work centers on the audit system itself—structuring how businesses are evaluated, how findings are framed in a constructive tone, and how a prompt pipeline turns raw inputs into consistent, actionable guidance rather than generic AI output.',
    features: [
      'Business audit flow designed to uncover operational and strategic gaps',
      'Clear, constructive reporting so teams understand what to fix and why',
      'Prompt pipeline architecture for reliable, repeatable audit outputs',
      'Waitlist and landing experience (in progress) ahead of full product launch'
    ],
    technicalHighlights: [
      'FastAPI backend for audit APIs and orchestration',
      'Next.js frontend with Tailwind CSS for the marketing and app shell',
      'Dockerized services for consistent local and deployment workflows',
      'Backend on Render, frontend on Vercel, transactional email via Resend'
    ],
    tags: [
      { name: 'FastAPI', color: '#05998b' },
      { name: 'Next.js', color: '#000000' },
      { name: 'Tailwind CSS', color: '#38bdf8' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Render', color: '#46e3b4' },
      { name: 'Vercel', color: '#000000' },
      { name: 'Resend', color: '#1F2937' },
      { name: 'HamerAI', color: '#3178c6' }
    ],
    preview: {
      repo: 'ethiohamerai',
      description: 'Business audit platform with structured findings and prompt pipeline',
      stars: 0,
      contributors: [{ name: 'Firaol', avatar: '/images/firaol.jpg' }]
    },
    languages: [
      { name: 'TypeScript', color: '#3178c6', percentage: 51.2 },
      { name: 'Python', color: '#3572A5', percentage: 36.4 },
      { name: 'CSS', color: '#563d7c', percentage: 8.9 },
      { name: 'HTML', color: '#e34c26', percentage: 3.5 }
    ],
    demoUrl: 'https://ethiohamerai.com',
    isPrivate: true
  },
  {
    slug: 'furi-cadaster',
    title: 'Furi-Cadaster',
    date: '2025',
    description:
      'An office management and land identification (kart) system built to modernize legacy Excel-based workflows into a database-driven, user-friendly web application with real-time updates.',
    longDescription:
      'Furi-Cadaster is a full-stack web application developed to digitize and streamline office management and land identification kart systems. Previously reliant on cumbersome Excel spreadsheets, the organization needed a modern, scalable solution. This system provides a clean, intuitive interface for managing land records, office operations, and user accounts. It features real-time updates via WebSockets, secure authentication with JWT, and a robust SQLite database managed through SQLAlchemy. The project represents a significant leap from manual, error-prone processes to a reliable, centralized digital platform.',
    features: [
      'Digitized land identification (kart) and record system',
      'Real-time layout updates via WebSockets connectivity',
      'Secure user authentication and session management',
      'Intuitive administrative dashboard for record verification'
    ],
    technicalHighlights: [
      'Python Flask backend with SQLAlchemy ORM integration',
      'Multi-client synchronization using Flask-SocketIO',
      'Robust SQLite database for centralized data management',
      'JWT-based security layer for protected endpoints'
    ],
    tags: [
      { name: 'Flask', color: '#000000' },
      { name: 'SQLAlchemy', color: '#d26d1a' },
      { name: 'JWT', color: '#bb9af7' },
      { name: 'WebSocket', color: '#27c93f' },
      { name: 'SQLite', color: '#003B57' },
      { name: 'HTML/CSS', color: '#e34c26' }
    ],
    preview: {
      repo: 'Furi-Cadaster',
      description: 'Office management and land identification kart system',
      stars: 0,
      contributors: [{ name: 'Firaol', avatar: '/images/firaol.jpg' }]
    },
    isPrivate: true,
    languages: [
      { name: 'Python', color: '#3572A5', percentage: 48.2 },
      { name: 'HTML', color: '#e34c26', percentage: 32.5 },
      { name: 'CSS', color: '#563d7c', percentage: 12.8 },
      { name: 'JavaScript', color: '#f1e05a', percentage: 6.5 }
    ]
  },
  {
    slug: 'termus-melesu',
    title: 'Termus Melesu (Retra)',
    date: 'January 04, 2026',
    description:
      'A digital notebook for small shops to track glass bottle circulation and credit. Features PWA support, offline sync, and AI-powered business analytics via Groq.',
    longDescription:
      'Termus Melesu (ጠርሙስ መልሱ) is a sophisticated digital solution tailored for small Ethiopian retailers. It addresses the unique challenge of tracking glass bottle circulation, which represents a significant asset for these businesses. The platform offers a Progressive Web App (PWA) experience, ensuring it works seamlessly on mobile devices with offline capabilities for areas with intermittent connectivity. Beyond simple tracking, it provides actionable insights through AI-powered analytics, helping shop owners optimize their inventory and financial health.',
    story:
      'The Termus Melesu project was inspired by my mother’s retail shop. Previously, bottles were given to customers based on trust, without a proper tracking system. As a result, many borrowed bottles were not returned, and some records were forgotten, which caused financial loss and operational difficulties for the business.',
    features: [
      'Installable PWA with offline-ready capabilities',
      'AI-Powered Business Summaries via Groq AI',
      'Real-time bottle circulation and credit tracking',
      'Premium Glassmorphism UI with fluid animations',
      'Secure PIN-protected transaction management'
    ],
    technicalHighlights: [
      'Next.js 15 (App Router) for high-performance rendering',
      'Supabase for real-time data sync and secure authentication',
      'Groq AI (gpt-oss-120b) integration for business intelligence',
      'Framer Motion for spring-based, natural UI interactions'
    ],
    tags: [
      { name: 'Next.js', color: '#000000' },
      { name: 'Supabase', color: '#3ECF8E' },
      { name: 'Groq AI', color: '#F55036' },
      { name: 'PWA', color: '#5A0FC8' }
    ],
    preview: {
      repo: 'termus-melesu',
      description: 'Digital notebook for retailers to track glass bottle circulation',
      stars: 1,
      contributors: [{ name: 'Firaol', avatar: '/images/firaol.jpg' }]
    },
    languages: [
      { name: 'TypeScript', color: '#3178c6', percentage: 68.5 },
      { name: 'CSS', color: '#563d7c', percentage: 19.2 },
      { name: 'JavaScript', color: '#f1e05a', percentage: 12.3 }
    ],
    demoUrl: 'https://termus-melesu.vercel.app',
    githubUrl: 'https://github.com/f9ine99/termus-melesu'
  },
  {
    slug: 'mufti-dawud-charity',
    title: 'Mufti Dawud Charity',
    date: 'November 13, 2025',
    description:
      'A collaborative project with <a href="https://github.com/khadijahm12k-creator" target="_blank" rel="noopener noreferrer">Khadija</a>—a robust charity platform where donors can securely contribute and admins can manage donations, track proofs, and coordinate organization activities.',
    longDescription:
      'Mufti Dawud Charity is a comprehensive platform designed to bring transparency and accountability to charitable giving. In collaboration with Khadija, we built a system that allows donors to track their contributions in real-time, submit payment proofs, and see the tangible impact of their donations. For administrators, the platform provides a powerful dashboard to manage donor relations, verify proofs, and oversee all charitable activities, ensuring that every penny reaches its intended destination. The backend is powered by FastAPI and SQLAlchemy, providing a secure and scalable foundation.',
    features: [
      'Transparent donation tracking system for contributors',
      'Secure payment proof submission and verification',
      'Advanced admin dashboard for organizational coordination',
      'Real-time donation counters and impact visualization'
    ],
    technicalHighlights: [
      'FastAPI backed by SQLAlchemy for a secure RESTful API',
      'React frontend utilizing Shadcn UI for a professional interface',
      'Supabase for scalable cloud database and secure storage',
      'JWT validation and Scoped access control for admin security'
    ],
    tags: [
      { name: 'FastAPI', color: '#05998b' },
      { name: 'React', color: '#61dafb' },
      { name: 'Supabase', color: '#3ECF8E' },
      { name: 'Shadcn UI', color: '#000000' },
      { name: 'JWT', color: '#bb9af7' },
      { name: 'SQLAlchemy', color: '#d26d1a' }
    ],
    preview: {
      repo: 'mufti-dawud-charity',
      description: 'A transparent and accountable donation system for charity',
      stars: 1,
      contributors: [
        { name: 'Firaol', avatar: '/images/firaol.jpg' },
        { name: 'Khadija', avatar: 'https://github.com/khadijahm12k-creator.png' }
      ]
    },
    languages: [
      { name: 'TypeScript', color: '#3178c6', percentage: 45.3 },
      { name: 'Python', color: '#3572A5', percentage: 38.8 },
      { name: 'CSS', color: '#563d7c', percentage: 10.1 },
      { name: 'HTML', color: '#e34c26', percentage: 5.8 }
    ],
    isPrivate: true,
    demoUrl: 'https://mufti-dawud.vercel.app/'
  },
  {
    slug: 'fira-portfolio',
    title: 'Fira-portfolio',
    date: 'March 19, 2026',
    description:
      "The website you're currently browsing! A premium, terminal-inspired portfolio built with SvelteKit and glassmorphism UI.",
    longDescription:
      'Fira-portfolio is the latest iteration of my personal portfolio, born from a desire to combine the raw, powerful aesthetic of a terminal with the sleek, modern feel of glassmorphism. Built with SvelteKit and TypeScript, it prioritizes performance and user experience while offering a unique visual identity. The project explores advanced UI concepts like custom cursor effects, dynamic bento grids, and intricate glassmorphic layers, all while maintaining a clean and professional standard.',
    features: [
      'Terminal-inspired design system with glassmorphic depth',
      'Dynamic Bento-grid layouts for performance and visual density',
      'Custom micro-interactions and smooth page transitions',
      'Responsive and optimized for high-end user experiences'
    ],
    technicalHighlights: [
      'SvelteKit 5 (Runes) for reactive and lightweight components',
      'TypeScript for type-safe development and robust architecture',
      'Lucide Icons integration and custom SVG animations',
      'Vite-powered development environment for instant feedback'
    ],
    tags: [
      { name: 'SvelteKit', color: '#ff3e00' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Vite', color: '#646cff' }
    ],
    preview: {
      repo: 'K9ine95',
      description: 'Premium, terminal-inspired portfolio website',
      stars: 0,
      contributors: [{ name: 'Firaol', avatar: '/images/firaol.jpg' }]
    },
    languages: [
      { name: 'Svelte', color: '#ff3e00', percentage: 52.4 },
      { name: 'TypeScript', color: '#3178c6', percentage: 33.1 },
      { name: 'CSS', color: '#563d7c', percentage: 14.5 }
    ],
    demoUrl: 'https://firaol.xyz',
    githubUrl: 'https://github.com/f9ine99/K9ine95'
  },
  {
    slug: 'detectify',
    title: 'Detectify',
    date: 'April 19, 2024',
    description:
      'A collaborative security project with <strong>Eyosiyas</strong> at INSA—a robust website defacement monitoring system designed to safeguard online integrity.',
    longDescription:
      'Detectify was developed at INSA in collaboration with Eyosiyas as a specialized website defacement monitoring system. It leverages advanced scanning engines to detect unauthorized changes to web content in real-time, providing an essential layer of security for critical digital assets. The project integrates an automated uptime checker and a comprehensive alerting system, ensuring that any compromise or downtime is identified and addressed immediately.',
    features: [
      'Advanced website defacement detection engine',
      'Real-time integrity monitoring for critical assets',
      'Institutional-grade security audit logging (INSA)',
      'Automated uptime and availability alerts'
    ],
    technicalHighlights: [
      'Python-based integrity scanning algorithms',
      'Asynchronous monitoring for high-performance checks',
      'Collaborative development with security experts at INSA',
      'Containerized deployment for scalable monitoring'
    ],
    tags: [
      { name: 'Security', color: '#f7768e' },
      { name: 'Monitoring', color: '#7aa2f7' },
      { name: 'INSA', color: '#3178c6' },
      { name: 'Python', color: '#3776ab' }
    ],
    preview: {
      repo: 'Detectify',
      description: 'Website defacement monitoring system (INSA Colab)',
      stars: 0,
      contributors: [{ name: 'Firaol', avatar: '/images/firaol.jpg' }]
    },
    languages: [
      { name: 'Python', color: '#3572A5', percentage: 82.6 },
      { name: 'Shell', color: '#89e051', percentage: 11.4 },
      { name: 'Dockerfile', color: '#384d54', percentage: 6.0 }
    ],
    githubUrl: 'https://github.com/f9ine99/Detectify'
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
