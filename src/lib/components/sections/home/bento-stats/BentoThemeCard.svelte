<script lang="ts">
  import { Check, Moon, Palette, Sun } from 'lucide-svelte';
  import { fade } from 'svelte/transition';
  import {
    themeState,
    themePalettes,
    darkThemes,
    lightThemeList,
    colors,
    isLightTheme,
    applyTheme,
    setAccentColor
  } from '$lib/stores/theme.svelte';

  let mode = $state<'dark' | 'light'>(isLightTheme(themeState.currentTheme) ? 'light' : 'dark');

  const visibleThemes = $derived(mode === 'light' ? lightThemeList : darkThemes);

  function selectTheme(theme: string) {
    applyTheme(theme);
    mode = isLightTheme(theme) ? 'light' : 'dark';
  }

  function swatch(theme: string) {
    const palette = themePalettes[theme];
    return {
      bg: palette['--bg-color'],
      card: palette['--card-bg'],
      text: palette['--text-primary'],
      muted: palette['--text-muted'],
      accent: palette['--accent-orange']
    };
  }

  const active = $derived(swatch(themeState.currentTheme));
</script>

<div class="bento-card theme-card" in:fade={{ duration: 400, delay: 100 }}>
  <div class="card-header">
    <Palette size={17} class="header-icon" />
    <div class="header-text">
      <h3>Appearance</h3>
      <p class="current">{themeState.currentTheme}</p>
    </div>
  </div>

  <div
    class="live-preview"
    style="background: {active.bg}; border-color: color-mix(in srgb, {active.muted} 35%, transparent)"
    aria-hidden="true"
  >
    <div class="live-window" style="background: {active.card}">
      <div class="live-dots">
        <span style="background: #ff5f56"></span>
        <span style="background: #ffbd2e"></span>
        <span style="background: #27c93f"></span>
      </div>
      <div class="live-lines">
        <span style="background: {active.text}; width: 72%"></span>
        <span style="background: {active.muted}; width: 48%"></span>
        <span class="live-pill" style="background: {themeState.currentAccentColor}; width: 34%"
        ></span>
      </div>
    </div>
  </div>

  <div class="mode-toggle" role="tablist" aria-label="Color mode">
    <button
      type="button"
      role="tab"
      class="mode-btn"
      class:active={mode === 'dark'}
      aria-selected={mode === 'dark'}
      onclick={() => (mode = 'dark')}
    >
      <Moon size={13} />
      Dark
    </button>
    <button
      type="button"
      role="tab"
      class="mode-btn"
      class:active={mode === 'light'}
      aria-selected={mode === 'light'}
      onclick={() => (mode = 'light')}
    >
      <Sun size={13} />
      Light
    </button>
  </div>

  <div class="theme-options" class:light-mode={mode === 'light'}>
    {#each visibleThemes as theme (theme)}
      {@const s = swatch(theme)}
      <button
        type="button"
        class="theme-btn"
        class:active={themeState.currentTheme === theme}
        onclick={() => selectTheme(theme)}
        aria-pressed={themeState.currentTheme === theme}
        aria-label="{theme} theme"
      >
        <span class="preview" style="background: {s.bg}">
          <span class="preview-card" style="background: {s.card}"></span>
          <span class="preview-accent" style="background: {s.accent}"></span>
          {#if themeState.currentTheme === theme}
            <span class="check" style="color: {s.text}">
              <Check size={12} strokeWidth={3} />
            </span>
          {/if}
        </span>
        <span class="theme-name">{theme}</span>
      </button>
    {/each}
  </div>

  <div class="accent-block">
    <div class="accent-head">
      <span class="group-label">Accent</span>
      <span class="accent-hex" style="color: {themeState.currentAccentColor}">
        {themeState.currentAccentColor}
      </span>
    </div>
    <div class="color-grid">
      {#each colors as color (color)}
        <button
          type="button"
          class="color-circle"
          class:active={themeState.currentAccentColor === color}
          style="background: {color}; --glow-color: {color}"
          onclick={() => setAccentColor(color)}
          aria-label="Set accent color to {color}"
        >
          {#if themeState.currentAccentColor === color}
            <Check size={11} strokeWidth={3} />
          {/if}
        </button>
      {/each}
    </div>
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

  .header-text {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  h3 {
    font-size: 0.95rem;
    margin: 0;
    color: var(--text-primary);
    font-weight: 600;
  }

  .current {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.68rem;
    color: var(--text-muted);
  }

  .live-preview {
    border-radius: 12px;
    border: 1px solid var(--border-subtle);
    padding: 0.7rem;
    transition:
      background-color 0.25s ease,
      border-color 0.25s ease;
  }

  .live-window {
    border-radius: 8px;
    padding: 0.55rem 0.65rem 0.7rem;
    border: 1px solid color-mix(in srgb, var(--text-muted) 18%, transparent);
    transition: background-color 0.25s ease;
  }

  .live-dots {
    display: flex;
    gap: 0.28rem;
    margin-bottom: 0.55rem;
  }

  .live-dots span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .live-lines {
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
  }

  .live-lines span {
    display: block;
    height: 5px;
    border-radius: 999px;
    opacity: 0.9;
  }

  .live-pill {
    height: 6px !important;
    opacity: 1 !important;
  }

  .mode-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem;
    padding: 0.28rem;
    border-radius: 10px;
    background: var(--subtle-bg);
    border: 1px solid var(--border-subtle);
  }

  .mode-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0.45rem 0.5rem;
    border: none;
    border-radius: 7px;
    background: transparent;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color 0.18s ease,
      color 0.18s ease;
  }

  .mode-btn.active {
    background: var(--card-bg-elevated);
    color: var(--text-primary);
    box-shadow: 0 1px 4px var(--shadow-medium);
  }

  .theme-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.45rem;
  }

  .theme-options.light-mode {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .theme-btn {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 0.2rem;
    color: var(--text-muted);
    cursor: pointer;
    transition:
      border-color 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease;
  }

  .theme-btn:hover {
    color: var(--text-primary);
  }

  .theme-btn:hover .preview {
    border-color: var(--border-medium);
    transform: translateY(-1px);
  }

  .theme-btn.active {
    color: var(--text-primary);
  }

  .theme-btn.active .preview {
    border-color: var(--accent-orange);
    box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent-orange) 35%, transparent);
  }

  .preview {
    position: relative;
    height: 2.35rem;
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
    overflow: hidden;
    transition:
      border-color 0.18s ease,
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .preview-card {
    position: absolute;
    left: 0.35rem;
    right: 0.35rem;
    bottom: 0.3rem;
    height: 0.7rem;
    border-radius: 4px;
  }

  .preview-accent {
    position: absolute;
    top: 0.35rem;
    right: 0.35rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
  }

  .check {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: color-mix(in srgb, var(--bg-color) 18%, transparent);
  }

  .theme-name {
    font-family: var(--font-mono);
    font-size: 0.62rem;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 0.1rem;
  }

  .accent-block {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding-top: 0.15rem;
    border-top: 1px solid var(--border-subtle);
  }

  .accent-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .group-label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .accent-hex {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    font-weight: 600;
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.4rem;
  }

  .color-circle {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35));
    opacity: 0.88;
    border: 1px solid color-mix(in srgb, var(--text-muted) 22%, transparent);
    outline: 2px solid transparent;
    outline-offset: 2px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease,
      outline-color 0.2s ease;
  }

  .color-circle:hover {
    opacity: 1;
    transform: scale(1.08);
  }

  .color-circle.active {
    opacity: 1;
    outline-color: var(--glow-color, currentColor);
  }

  @media (max-width: 600px) {
    .theme-options {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
</style>
