<script lang="ts">
  import { Moon, Palette, Sun } from 'lucide-svelte';
  import {
    themeState,
    themePalettes,
    darkThemes,
    lightThemeList,
    colors,
    applyTheme,
    setAccentColor
  } from '$lib/stores/theme.svelte';

  function swatch(theme: string) {
    const palette = themePalettes[theme];
    return {
      bg: palette['--bg-color'],
      accent: palette['--accent-orange']
    };
  }
</script>

<div class="drawer-section">
  <div class="section-title">
    <Palette size={14} />
    <span>Theme</span>
  </div>

  <div class="group">
    <div class="group-label">
      <Moon size={11} />
      Dark
    </div>
    <div class="flavor-grid">
      {#each darkThemes as theme (theme)}
        {@const s = swatch(theme)}
        <button
          type="button"
          class="flavor-btn"
          class:active={themeState.currentTheme === theme}
          onclick={() => applyTheme(theme)}
        >
          <span class="mini-swatch" style="background: {s.bg}">
            <span class="mini-accent" style="background: {s.accent}"></span>
          </span>
          {theme}
        </button>
      {/each}
    </div>
  </div>

  <div class="group">
    <div class="group-label">
      <Sun size={11} />
      Light
    </div>
    <div class="flavor-grid">
      {#each lightThemeList as theme (theme)}
        {@const s = swatch(theme)}
        <button
          type="button"
          class="flavor-btn"
          class:active={themeState.currentTheme === theme}
          onclick={() => applyTheme(theme)}
        >
          <span class="mini-swatch" style="background: {s.bg}">
            <span class="mini-accent" style="background: {s.accent}"></span>
          </span>
          {theme}
        </button>
      {/each}
    </div>
  </div>
</div>

<div class="drawer-section">
  <div class="section-title">
    <div class="color-dot" style="background: var(--accent-orange)"></div>
    <span>Accent</span>
  </div>
  <div class="color-grid">
    {#each colors as color (color)}
      <button
        type="button"
        class="color-circle"
        style="background: {color}; --glow-color: {color}"
        class:active={themeState.currentAccentColor === color}
        onclick={() => setAccentColor(color)}
        aria-label="Set accent color to {color}"
      ></button>
    {/each}
  </div>
</div>

<style>
  .drawer-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--text-muted);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .group-label {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--text-muted);
    opacity: 0.9;
  }

  .flavor-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.3rem;
    background: var(--subtle-bg);
    padding: 0.35rem;
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
  }

  .flavor-btn {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    background: none;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 0.42rem 0.5rem;
    color: var(--text-muted);
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    -webkit-tap-highlight-color: transparent;
  }

  .flavor-btn:active {
    transform: scale(0.98);
  }

  .flavor-btn.active {
    background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
    border-color: color-mix(in srgb, var(--accent-orange) 40%, transparent);
    color: var(--text-primary);
  }

  .mini-swatch {
    position: relative;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 4px;
    border: 1px solid var(--border-medium);
    flex-shrink: 0;
    overflow: hidden;
  }

  .mini-accent {
    position: absolute;
    right: 0.12rem;
    bottom: 0.12rem;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
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
    border: 1px solid color-mix(in srgb, var(--text-muted) 20%, transparent);
    outline: 2px solid transparent;
    outline-offset: 2px;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      opacity 0.25s ease,
      outline-color 0.25s ease,
      box-shadow 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .color-circle:active {
    transform: scale(0.9);
  }

  .color-circle.active {
    opacity: 1;
    outline-color: var(--glow-color, currentColor);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--glow-color, currentColor) 40%, transparent);
  }

  .section-title :global(svg) {
    flex-shrink: 0;
  }

  .color-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
</style>
