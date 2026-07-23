<script lang="ts">
  import { ArrowRight, Star } from 'lucide-svelte';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';

  import { projects } from '$lib/data/projects';
  const featuredProjects = projects.filter((p) => ['hamerai', 'impactis'].includes(p.slug));
</script>

<section class="featured-projects" id="projects">
  <div class="header">
    <div class="title">
      <Star size={32} />
      <h2>Featured Projects</h2>
    </div>
    <a href="/projects" class="view-all desktop-only">
      View all
      <ArrowRight size={15} />
    </a>
  </div>

  <div class="projects-grid">
    {#each featuredProjects as project (project.slug)}
      <ProjectCard {...project} />
    {/each}
  </div>

  <div class="mobile-footer">
    <a href="/projects" class="view-all mobile-only">
      View all
      <ArrowRight size={15} />
    </a>
  </div>
</section>

<style>
  .featured-projects {
    width: 95%;
    max-width: 1140px;
    margin: 6rem auto;
    --terminal-preview-min-h: clamp(13.35rem, 37vw, 16rem);
  }

  /* Frost layer (2nd): slightly taller top/bottom, same sides as before */
  .featured-projects :global(.terminal-wrap) {
    padding: clamp(1.05rem, 3.65vw, 1.58rem) clamp(0.72rem, 2.8vw, 1.2rem);
  }

  .featured-projects :global(.project-card) {
    background: transparent;
    border: none;
    padding: 0.55rem 0.72rem;
    box-shadow: none;
  }

  .featured-projects :global(.card-link) {
    gap: 1.1rem;
  }

  /* Drop frost panel stroke so only the terminal chrome reads as an edge */
  .featured-projects :global(.terminal-backdrop) {
    border: none;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.5) inset,
      0 10px 36px rgba(0, 0, 0, 0.08);
  }

  .featured-projects :global(.terminal-wrap.card-hovered .terminal-backdrop) {
    border: none;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.42) inset,
      0 12px 40px rgba(0, 0, 0, 0.1);
  }

  :global(.Latte) .featured-projects :global(.terminal-backdrop),
  :global(.Latte) .featured-projects :global(.terminal-wrap.card-hovered .terminal-backdrop) {
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.85) inset,
      0 8px 28px rgba(0, 0, 0, 0.04);
  }

  .featured-projects :global(.project-card:hover) {
    background: color-mix(in srgb, var(--card-bg) 22%, transparent);
    border: none;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14);
  }

  :global(.Latte) .featured-projects :global(.project-card:hover) {
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.06);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
  }

  .title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--accent-orange);
  }

  .title h2 {
    font-family: var(--font-display);
    font-size: 2.25rem;
    color: var(--text-primary);
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .view-all {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.55rem 0.95rem 0.55rem 1.05rem;
    border-radius: 999px;
    border: 1px solid var(--border-medium);
    background: color-mix(in srgb, var(--card-bg) 80%, transparent);
    font-family: var(--font-display);
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-primary);
    text-decoration: none;
    transition:
      transform 0.18s ease,
      color 0.18s ease,
      border-color 0.18s ease,
      background-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  .view-all :global(svg) {
    transition: transform 0.18s ease;
  }

  .view-all:hover {
    color: var(--bg-color);
    background: var(--accent-orange);
    border-color: var(--accent-orange);
    transform: translateY(-1px);
    box-shadow: 0 8px 18px var(--shadow-medium);
  }

  .view-all:hover :global(svg) {
    transform: translateX(2px);
  }

  :global(.Latte) .view-all:hover {
    color: #111;
  }

  .mobile-footer {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 769px) {
    .mobile-only {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .desktop-only {
      display: none;
    }

    .featured-projects {
      margin: 2rem auto;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }

    .title h2 {
      font-size: 1.75rem;
    }

    .title :global(svg) {
      width: 28px !important;
      height: 28px !important;
    }
  }
</style>
