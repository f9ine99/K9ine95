<script lang="ts">
  import { Folder } from 'lucide-svelte';
  import ProjectCard from '$lib/components/projects/ProjectCard.svelte';
  import { fade } from 'svelte/transition';
  import { projects } from '$lib/data/projects';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';

  const description =
    'Selected software projects by Firaol Gemeda — marketplaces, charity platforms, security tooling, and full-stack web applications.';
</script>

<SeoHead title="Projects" {description} path="/projects" />

<div class="projects-page" in:fade={{ duration: 600 }}>
  <header class="page-header">
    <div class="header-content">
      <Folder size={32} class="header-icon" />
      <h1 class="page-title">Projects</h1>
    </div>
    <p class="subtitle">A collection of things I've built, mostly in the open.</p>
  </header>

  <div class="projects-grid">
    {#each projects as project (project.slug)}
      <ProjectCard {...project} />
    {/each}
  </div>
</div>

<style>
  .projects-page {
    max-width: 1200px;
    margin: 0 auto 4rem;
    padding: 10rem 2rem 0;
  }

  .page-header {
    margin-bottom: 4rem;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  :global(.header-icon) {
    color: var(--accent-orange);
  }

  .page-title {
    font-size: 3rem;
    font-weight: 800;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    opacity: 0.8;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    /* Smaller cards on this page only (detail views keep global sizing). */
    --terminal-frost-padding: clamp(1.05rem, 4vw, 1.85rem);
    --terminal-preview-min-h: clamp(10.25rem, 30vw, 12.75rem);
  }

  .projects-grid :global(.project-card) {
    padding: 1.1rem;
    gap: 1.1rem;
    border-radius: 14px;
  }

  .projects-grid :global(.card-link) {
    gap: 1.1rem;
  }

  .projects-grid :global(.preview-container) {
    max-width: min(100%, 23.5rem);
  }

  .projects-grid :global(.project-card .title) {
    font-size: 1.12rem;
  }

  .projects-grid :global(.project-card .date) {
    font-size: 0.68rem;
  }

  .projects-grid :global(.project-card .description) {
    font-size: 0.86rem;
    line-height: 1.55;
  }

  .projects-grid :global(.demo-link) {
    padding: 0.75rem 1rem;
    font-size: 0.82rem;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    .projects-page {
      padding-top: 7rem;
    }

    .page-title {
      font-size: 2.2rem;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
