<script lang="ts">
  import type { Project } from '$lib/data/projects';
  import { Lock, Star } from 'lucide-svelte';
  import { fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';

  interface Props {
    project: Project;
    safePreviewDescription: string;
  }

  let { project, safePreviewDescription }: Props = $props();
</script>

<div class="hero" in:fly={{ y: 30, duration: 600, easing: backOut }}>
  <div class="terminal-card">
    <div class="terminal-hero-wrap">
      <div class="terminal-backdrop" aria-hidden="true"></div>
      <div class="terminal-inner">
        <div class="terminal-preview">
        <div class="terminal-header">
          <div class="dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          {#if project.isPrivate}
            <div class="private-badge">
              <Lock size={11} />
              <span>Private</span>
            </div>
          {:else if project.preview.stars}
            <div class="stars-badge">
              <span>{project.preview.stars}</span>
              <Star size={11} fill="currentColor" />
            </div>
          {/if}
        </div>

        <div class="terminal-body">
          <div class="repo-info">
            <span class="owner">f9ine99</span>
            <span class="separator">/</span>
            <span class="repo-name">{project.preview.repo}</span>
          </div>

          <p class="repo-desc">{@html safePreviewDescription}</p>

          {#if project.preview.contributors}
            <div class="contributors">
              <div class="avatar-stack">
                {#each project.preview.contributors as contributor}
                  <div class="avatar-wrapper">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      class="avatar"
                      loading="lazy"
                      decoding="async"
                      width="42"
                      height="42"
                    />
                    <div class="avatar-tooltip">{contributor.name}</div>
                  </div>
                {/each}
              </div>
              <span class="ctb-text">
                {project.preview.contributors.length}
                {project.preview.contributors.length === 1 ? 'Contributor' : 'Contributors'}
              </span>
            </div>
          {/if}

          {#if project.languages && project.languages.length > 0}
            <div class="language-bar">
              <div class="bar-track">
                {#each project.languages as lang}
                  <div class="bar-segment" style="width: {lang.percentage}%; background: {lang.color}"></div>
                {/each}
              </div>
              <div class="bar-labels">
                {#each project.languages as lang}
                  <div class="lang-label">
                    <span class="lang-dot" style="background: {lang.color}"></span>
                    <span class="lang-name">{lang.name}</span>
                    <span class="lang-pct">{lang.percentage}%</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .terminal-card {
    background: var(--card-bg);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 16px 48px var(--shadow-medium);
  }

  .terminal-hero-wrap {
    position: relative;
    border-radius: 20px;
    padding: var(--terminal-frost-padding);
  }

  .terminal-backdrop {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    z-index: 0;
    pointer-events: none;
    background: color-mix(in srgb, var(--terminal-frost-bg) 66%, transparent);
    border: 1px solid var(--terminal-frost-border);
    backdrop-filter: blur(var(--terminal-frost-blur)) saturate(155%);
    -webkit-backdrop-filter: blur(var(--terminal-frost-blur)) saturate(155%);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.65) inset,
      0 12px 40px rgba(0, 0, 0, 0.08);
  }

  :global(.Latte) .terminal-backdrop {
    background: color-mix(in srgb, var(--terminal-frost-bg) 78%, transparent);
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.9) inset,
      0 8px 32px rgba(0, 0, 0, 0.04);
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-backdrop {
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--terminal-frost-bg);
    }

    :global(.Latte) .terminal-backdrop {
      background: var(--terminal-frost-bg);
    }
  }

  .terminal-inner {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .terminal-preview {
    position: relative;
    width: 100%;
    max-width: min(100%, 45.5rem);
    margin-inline: auto;
    background: var(--terminal-bg);
    border: 1px solid var(--border-medium);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.22);
  }

  .terminal-header {
    background: var(--overlay-light);
    padding: 0.6rem 1.08rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dots {
    display: flex;
    gap: 5px;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .red {
    background: #ff5f56;
  }

  .yellow {
    background: #ffbd2e;
  }

  .green {
    background: #27c93f;
  }

  .private-badge {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.68rem;
    color: var(--text-muted);
    background: var(--overlay-medium);
    border: 1px solid var(--border-medium);
    padding: 0.2rem 0.52rem;
    border-radius: 6px;
    font-family: var(--font-mono);
  }

  .stars-badge {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    font-size: 0.72rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .terminal-body {
    padding: 1.52rem 1.68rem;
  }

  .repo-info {
    font-family: var(--font-mono);
    font-size: 1.22rem;
    margin-bottom: 0.58rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .owner {
    color: var(--accent-orange);
    opacity: 0.85;
  }

  .repo-name {
    color: #5cb3fa;
    font-weight: 600;
  }

  .separator {
    opacity: 0.3;
    color: var(--text-muted);
  }

  .repo-desc {
    color: var(--text-muted);
    font-size: 0.96rem;
    line-height: 1.57;
    margin-bottom: 1.1rem;
  }

  .contributors {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .avatar-stack {
    display: flex;
    padding-left: 4px;
  }

  .avatar-wrapper {
    margin-left: -14px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
  }

  .avatar-wrapper:first-child {
    margin-left: 0;
  }

  .avatar-wrapper:hover {
    z-index: 10;
    transform: translateY(-10px) scale(1.1);
    margin-right: 12px;
    margin-left: 6px;
  }

  .avatar-wrapper:hover .avatar-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-18px);
    pointer-events: auto;
  }

  .avatar-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: rgba(13, 13, 15, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid var(--accent-orange);
    color: var(--accent-orange);
    padding: 0.6rem 1.25rem;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: var(--font-mono);
    letter-spacing: 0.05em;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    box-shadow:
      0 16px 40px rgba(0, 0, 0, 0.6),
      0 0 25px color-mix(in srgb, var(--accent-orange) 28%, transparent);
  }

  .avatar-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px;
    border-style: solid;
    border-color: var(--accent-orange) transparent transparent transparent;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--terminal-bg);
    display: block;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }

  .ctb-text {
    font-size: 0.78rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    opacity: 0.8;
    margin-left: 0.5rem;
  }

  .language-bar {
    margin-top: 1rem;
    padding-top: 0.72rem;
    border-top: 1px solid var(--border-subtle);
  }

  .bar-track {
    display: flex;
    height: 7px;
    border-radius: 4px;
    overflow: hidden;
    gap: 2px;
  }

  .bar-segment {
    border-radius: 4px;
    min-width: 4px;
  }

  .bar-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem 0.85rem;
    margin-top: 0.55rem;
  }

  .lang-label {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    font-size: 0.72rem;
    font-family: var(--font-mono);
  }

  .lang-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .lang-name {
    color: var(--text-primary);
    font-weight: 500;
    opacity: 0.85;
  }

  .lang-pct {
    color: var(--text-muted);
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    .terminal-card {
      padding: 1.25rem;
      border-radius: 16px;
      margin-bottom: 2.5rem;
    }

    .terminal-body {
      padding: 1.22rem 1.32rem;
    }

    .repo-info {
      font-size: 1.06rem;
    }

    .repo-desc {
      font-size: 0.88rem;
      margin-bottom: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .terminal-card {
      padding: 0.75rem;
      border-radius: 12px;
      margin-bottom: 2rem;
    }

    .terminal-header {
      padding: 0.6rem 1rem;
    }

    .terminal-body {
      padding: 0.9rem 1rem;
    }

    .repo-info {
      font-size: 0.88rem;
      flex-wrap: wrap;
    }

    .repo-desc {
      font-size: 0.8rem;
    }

    .avatar {
      width: 28px;
      height: 28px;
    }

    .bar-track {
      height: 5px;
    }

    .bar-labels {
      gap: 0.6rem;
    }

    .lang-label {
      font-size: 0.7rem;
    }

    .lang-dot {
      width: 8px;
      height: 8px;
    }
  }
</style>
