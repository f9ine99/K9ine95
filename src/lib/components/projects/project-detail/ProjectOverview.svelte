<script lang="ts">
  import type { Project } from '$lib/data/projects';
  import { Calendar, Github, Star, Globe, ExternalLink, Users } from 'lucide-svelte';
  import { fly, fade } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import ProjectTechTags from '$lib/components/projects/ProjectTechTags.svelte';

  interface Props {
    project: Project;
    safeLongDescription: string;
    safeStory: string;
  }

  let { project, safeLongDescription, safeStory }: Props = $props();
</script>

<div class="info-section" in:fly={{ y: 30, duration: 600, delay: 200, easing: backOut }}>
  <div class="title-row">
    <h1 class="project-title">{project.title}</h1>
  </div>

  <div class="meta-row">
    <div class="meta-item">
      <Calendar size={16} />
      <span>{project.date}</span>
    </div>

    {#if project.preview.contributors}
      <div class="meta-item">
        <Users size={16} />
        <span>
          {project.preview.contributors.length}
          {project.preview.contributors.length === 1 ? 'Contributor' : 'Contributors'}
        </span>
      </div>
    {/if}

    {#if project.preview.stars}
      <div class="meta-item">
        <Star size={16} />
        <span>{project.preview.stars} stars</span>
      </div>
    {/if}
  </div>

  <div class="tech-stack-section" in:fade={{ delay: 300, duration: 400 }}>
    <h2 class="tech-stack-heading">Tech stack</h2>
    <ProjectTechTags tags={project.tags} variant="panel" />
  </div>

  <div class="actions" in:fade={{ delay: 400, duration: 400 }}>
    {#if project.githubUrl && !project.isPrivate}
      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" class="action-btn github">
        <Github size={18} />
        <span>View Source</span>
        <ExternalLink size={14} class="ext-icon" />
      </a>
    {/if}

    {#if project.demoUrl}
      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" class="action-btn demo">
        <Globe size={18} />
        <span>Live Demo</span>
        <ExternalLink size={14} class="ext-icon" />
      </a>
    {/if}
  </div>

  <div class="divider"></div>

  <div class="content" in:fly={{ y: 20, duration: 500, delay: 500 }}>
    <h2 class="section-heading">About this project</h2>
    <p class="long-description">{@html safeLongDescription}</p>

    {#if project.story}
      <div class="details-section">
        <h3 class="subsection-heading">The Inspiration</h3>
        <p class="project-story">{@html safeStory}</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .info-section {
    margin-bottom: 4rem;
  }

  .project-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.03em;
    line-height: 1.1;
    color: var(--text-primary);
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.75rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    font-size: 0.95rem;
    font-family: var(--font-mono);
  }

  .tech-stack-section {
    margin-bottom: 2rem;
  }

  .tech-stack-section :global(.tech-tags.panel) {
    margin-top: 0.75rem;
  }

  .tech-stack-heading {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: var(--font-mono);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;
    -webkit-tap-highlight-color: transparent;
  }

  .action-btn:active {
    transform: scale(0.96);
    filter: brightness(0.9);
  }

  .action-btn.github {
    background: var(--overlay-medium);
    color: var(--text-primary);
    border-color: var(--border-medium);
  }

  .action-btn.github:hover {
    background: var(--overlay-heavy);
    border-color: var(--border-medium);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .action-btn.demo {
    background: var(--accent-orange);
    color: #000;
    border-color: var(--accent-orange);
  }

  .action-btn.demo:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent-orange) 38%, transparent);
    filter: brightness(1.1);
  }

  .action-btn :global(.ext-icon) {
    opacity: 0.5;
    transition: all 0.2s ease;
  }

  .action-btn:hover :global(.ext-icon) {
    opacity: 1;
    transform: translate(2px, -2px);
  }

  .divider {
    height: 1px;
    background: linear-gradient(
      to right,
      color-mix(in srgb, var(--accent-orange) 22%, transparent),
      var(--border-subtle),
      transparent
    );
    margin-bottom: 3rem;
  }

  .section-heading {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    opacity: 0.9;
  }

  .long-description {
    font-size: 1.1rem;
    line-height: 1.9;
    color: var(--text-muted);
    max-width: 800px;
    margin-bottom: 3rem;
  }

  .long-description :global(a),
  .project-story :global(a) {
    color: var(--accent-orange);
    text-decoration: none;
    border-bottom: 1px dotted color-mix(in srgb, var(--accent-orange) 42%, transparent);
    transition: all 0.2s ease;
  }

  .long-description :global(a:hover),
  .project-story :global(a:hover) {
    color: var(--text-primary);
    border-bottom-color: var(--accent-orange);
    background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
  }

  .details-section {
    margin-top: 3rem;
  }

  .subsection-heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .project-story {
    font-size: 1.05rem;
    line-height: 1.8;
    color: var(--text-muted);
    font-style: italic;
    border-left: 2px solid var(--accent-orange);
    padding-left: 1.5rem;
    margin-top: 0.5rem;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .project-title {
      font-size: 2.25rem;
    }

    .meta-row {
      gap: 1.25rem;
    }

    .meta-item {
      font-size: 0.85rem;
    }

    .actions {
      flex-direction: column;
    }

    .action-btn {
      justify-content: center;
    }

    .section-heading {
      font-size: 1.3rem;
    }

    .long-description {
      font-size: 1rem;
      line-height: 1.75;
    }
  }

  @media (max-width: 480px) {
    .project-title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .meta-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }

    .actions {
      margin-bottom: 2rem;
    }

    .action-btn {
      font-size: 0.85rem;
      padding: 0.75rem 1.25rem;
    }

    .divider {
      margin-bottom: 2rem;
    }

    .section-heading {
      font-size: 1.15rem;
      margin-bottom: 1rem;
    }

    .long-description {
      font-size: 0.95rem;
      line-height: 1.7;
    }
  }
</style>
