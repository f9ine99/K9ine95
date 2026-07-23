<script lang="ts">
  import { Palette } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import { themeState, themes, colors, applyTheme, setAccentColor } from '$lib/stores/theme.svelte';
</script>

<div class="bento-card theme-card" in:fade={{ duration: 400, delay: 100 }}>
  <div class="card-header">
    <Palette size={17} class="header-icon" />
    <h3>Theme</h3>
  </div>

  <div class="theme-options">
    {#each themes as theme (theme)}
      <button
        class="theme-btn {themeState.currentTheme === theme ? 'active' : ''}"
        onclick={() => applyTheme(theme)}
      >
        {theme}
      </button>
    {/each}
  </div>

  <div class="color-grid">
    {#each colors as color (color)}
      <button
        class="color-circle {themeState.currentAccentColor === color ? 'active' : ''}"
        style="background: {color}; --glow-color: {color}"
        onclick={() => setAccentColor(color)}
        aria-label="Set accent color to {color}"
      ></button>
    {/each}
  </div>
</div>

<style>
  .card-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
  }

  :global(.header-icon) {
    color: var(--accent-orange);
  }

  h3 {
    font-size: 0.95rem;
    margin: 0;
    color: var(--text-primary);
    font-weight: 500;
  }

  .theme-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.35rem;
  }

  .theme-btn {
    background: var(--card-bg-elevated);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 7px;
    padding: 0.35rem 0.26rem;
    color: var(--text-muted);
    font-size: 0.58rem;
    line-height: 1.2;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
  }

  .theme-btn.active {
    background: var(--selection-bg);
    border-color: var(--accent-orange);
    color: var(--text-primary);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.35rem;
  }

  .color-circle {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    opacity: 0.7;
    border: 2px solid transparent;
    outline: 2px solid transparent;
    outline-offset: 3px;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      opacity 0.25s ease,
      outline-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .color-circle:hover {
    opacity: 1;
  }

  .color-circle.active {
    opacity: 1;
    outline: 2px solid var(--glow-color, currentColor);
    outline-offset: 3px;
    box-shadow:
      0 0 4px 1px var(--glow-color, currentColor),
      0 0 8px 2px var(--glow-color, currentColor);
    animation: color-glow-pulse 2s ease-in-out infinite;
  }

  @keyframes color-glow-pulse {
    0%,
    100% {
      box-shadow:
        0 0 4px 1px var(--glow-color, currentColor),
        0 0 8px 2px var(--glow-color, currentColor);
    }

    50% {
      box-shadow:
        0 0 6px 2px var(--glow-color, currentColor),
        0 0 12px 4px var(--glow-color, currentColor);
    }
  }

  @media (max-width: 600px) {
    .theme-options {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
