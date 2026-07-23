<script lang="ts">
  import { Lock, Star } from 'lucide-svelte';
  import type { Project } from '$lib/data/projects';

  interface Props {
    preview: Project['preview'];
    languages?: Project['languages'];
    isPrivate?: boolean;
    slug: string;
    isHovered?: boolean;
  }

  let { preview, languages, isPrivate = false, slug, isHovered = false }: Props = $props();
</script>

<div class="terminal-wrap" class:card-hovered={isHovered}>
  <div class="terminal-backdrop" aria-hidden="true"></div>
  <div class="terminal-inner">
    <div class="preview-container">
      <div class="terminal-header">
        <div class="dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>

        {#if isPrivate}
          <div class="private-badge">
            <Lock size={11} />
            <span>Private</span>
          </div>
        {:else if slug === 'termus-melesu'}
          <div class="public-badge">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="os-icon-enhanced"
            >
              <path
                d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
              />
              <path d="m3.3 7 8.7 5 8.7-5" class="inner-path" />
              <path d="M12 22V12" class="inner-path" />
              <path d="m10 14-2 2 2 2" class="code-symbol" />
              <path d="m14 18 2-2-2-2" class="code-symbol" />
            </svg>
            <span>Open Source</span>
          </div>
        {:else if preview.stars}
          <div class="stars">
            <span>{preview.stars}</span>
            <Star size={12} fill="currentColor" />
          </div>
        {/if}
      </div>

      <div class="terminal-body">
        <div class="repo-info">
          <span class="owner">f9ine99</span>
          <span class="separator">/</span>
          <span class="name">{preview.repo}</span>
        </div>

        <p class="repo-desc">{preview.description}</p>

        {#if preview.contributors}
          <div class="contributors">
            <div class="avatar-stack">
              {#each preview.contributors as contributor (contributor.name)}
                <div class="avatar-wrapper">
                  <img
                    src={contributor.avatar}
                    alt={contributor.name}
                    class="mini-avatar"
                    loading="lazy"
                    decoding="async"
                    width="32"
                    height="32"
                  />
                  <div class="avatar-tooltip">{contributor.name}</div>
                </div>
              {/each}
            </div>
            <span class="ctb-count">
              {preview.contributors.length}
              {preview.contributors.length === 1 ? 'Contributor' : 'Contributors'}
            </span>
          </div>
        {/if}

        {#if languages && languages.length > 0}
          <div class="language-bar">
            <div class="bar-track">
              {#each languages as lang (lang.name)}
                <div
                  class="bar-segment"
                  style="width: {lang.percentage}%; background: {lang.color}"
                ></div>
              {/each}
            </div>
            <div class="bar-labels">
              {#each languages as lang (lang.name)}
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

<style>
  .terminal-wrap {
    position: relative;
    width: 100%;
    border-radius: 18px;
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
      0 10px 36px rgba(0, 0, 0, 0.08);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .terminal-wrap.card-hovered .terminal-backdrop {
    background: color-mix(in srgb, var(--terminal-frost-bg) 76%, transparent);
    border-color: var(--terminal-frost-border-hover);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.55) inset,
      0 12px 40px rgba(0, 0, 0, 0.1);
  }

  .terminal-inner {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  :global(.Latte) .terminal-backdrop {
    background: color-mix(in srgb, var(--terminal-frost-bg) 78%, transparent);
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.9) inset,
      0 8px 28px rgba(0, 0, 0, 0.04);
  }

  :global(.Latte) .terminal-wrap.card-hovered .terminal-backdrop {
    background: color-mix(in srgb, var(--terminal-frost-bg) 86%, transparent);
    border-color: rgba(0, 0, 0, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    .terminal-backdrop {
      transition: none;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
      background: var(--terminal-frost-bg);
    }

    :global(.Latte) .terminal-backdrop {
      background: var(--terminal-frost-bg);
    }

    .terminal-wrap.card-hovered .terminal-backdrop {
      background: var(--terminal-frost-bg-hover);
    }

    :global(.Latte) .terminal-wrap.card-hovered .terminal-backdrop {
      background: var(--terminal-frost-bg-hover);
    }
  }

  .preview-container {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: min(100%, 28.25rem);
    margin-inline: auto;
    min-height: var(--terminal-preview-min-h);
    background: var(--terminal-bg);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.2);
  }

  .terminal-header {
    background: var(--overlay-light);
    padding: 0.5rem 0.82rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-subtle);
  }

  .dots {
    display: flex;
    gap: 0.35rem;
  }

  .dot {
    width: 7px;
    height: 7px;
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

  .private-badge,
  .public-badge {
    display: flex;
    align-items: center;
    gap: 0.28rem;
    font-size: 0.58rem;
    font-family: var(--font-mono);
    padding: 0.14rem 0.4rem;
    border-radius: 6px;
    opacity: 0.8;
  }

  .private-badge {
    color: var(--text-muted);
    background: var(--overlay-medium);
    border: 1px solid var(--border-medium);
  }

  .public-badge {
    color: var(--accent-orange);
    background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--accent-orange) 22%, transparent);
    transition: all 0.3s ease;
  }

  .public-badge:hover {
    background: color-mix(in srgb, var(--accent-orange) 18%, transparent);
    border-color: color-mix(in srgb, var(--accent-orange) 42%, transparent);
    box-shadow: 0 0 8px color-mix(in srgb, var(--accent-orange) 22%, transparent);
    transform: translateY(-1px);
  }

  .os-icon-enhanced {
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 0 2px color-mix(in srgb, var(--accent-orange) 42%, transparent));
  }

  .inner-path {
    opacity: 0.4;
  }

  .code-symbol {
    animation: pulse 2s ease-in-out infinite;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.66rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
  }

  .terminal-body {
    flex: 1;
    padding: 0.92rem 0.94rem;
    display: flex;
    flex-direction: column;
    gap: 0.58rem;
    font-family: var(--font-mono);
  }

  .repo-info {
    font-size: 0.81rem;
    font-weight: 600;
  }

  .owner {
    color: var(--accent-orange);
    opacity: 0.8;
  }

  .separator {
    color: var(--text-muted);
    padding: 0 2px;
  }

  .name {
    color: var(--text-primary);
  }

  .repo-desc {
    font-size: 0.75rem;
    color: var(--text-muted);
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .contributors {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-top: 0.15rem;
  }

  .avatar-stack {
    display: flex;
    align-items: center;
    padding-left: 5px;
  }

  .avatar-wrapper {
    margin-left: -11px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 1;
  }

  .avatar-wrapper:hover {
    z-index: 10;
    transform: translateY(-8px) scale(1.15);
    margin-right: 8px;
    margin-left: 4px;
  }

  .avatar-wrapper:first-child {
    margin-left: 0;
  }

  .avatar-wrapper:hover .avatar-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-15px);
    pointer-events: auto;
  }

  .avatar-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: rgba(13, 13, 15, 0.95);
    backdrop-filter: blur(12px);
    border: 1px solid var(--accent-orange);
    color: var(--accent-orange);
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 500;
    font-family: var(--font-mono);
    letter-spacing: 0.04em;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 50;
    box-shadow:
      0 12px 32px rgba(0, 0, 0, 0.5),
      0 0 20px color-mix(in srgb, var(--accent-orange) 22%, transparent);
  }

  .avatar-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: var(--accent-orange) transparent transparent transparent;
  }

  .mini-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--terminal-bg);
    display: block;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .ctb-count {
    font-size: 0.64rem;
    color: var(--text-muted);
    opacity: 0.8;
    margin-left: 0.5rem;
  }

  .language-bar {
    margin-top: 0.5rem;
    padding-top: 0.48rem;
    border-top: 1px solid var(--border-subtle);
  }

  .bar-track {
    display: flex;
    height: 5px;
    border-radius: 3px;
    overflow: hidden;
    gap: 2px;
  }

  .bar-segment {
    border-radius: 3px;
    transition: opacity 0.2s ease;
  }

  .terminal-wrap.card-hovered .bar-segment {
    opacity: 0.85;
  }

  .bar-labels {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem 0.55rem;
    margin-top: 0.42rem;
  }

  .lang-label {
    display: flex;
    align-items: center;
    gap: 0.26rem;
    font-size: 0.6rem;
    color: var(--text-muted);
  }

  .lang-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .lang-name {
    font-weight: 500;
    color: var(--text-primary);
    opacity: 0.85;
  }

  .lang-pct {
    opacity: 0.6;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-2px);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.6;
    }

    50% {
      opacity: 1;
    }
  }
</style>
