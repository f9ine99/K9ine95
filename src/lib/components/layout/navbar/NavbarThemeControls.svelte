<script lang="ts">
  import { Palette } from 'lucide-svelte';
  import { themeState, applyTheme, setAccentColor, themes, colors } from '$lib/stores/theme.svelte';
</script>

<div class="drawer-section">
  <div class="section-title">
    <Palette size={14} />
    <span>Theme</span>
  </div>
  <div class="flavor-grid">
    {#each themes as theme}
      <button class="flavor-btn" class:active={themeState.currentTheme === theme} onclick={() => applyTheme(theme)}>
        {theme}
      </button>
    {/each}
  </div>
</div>

<div class="drawer-section">
  <div class="section-title">
    <div class="color-dot" style="background: var(--accent-orange)"></div>
    <span>Accent</span>
  </div>
  <div class="color-grid">
    {#each colors as color}
      <button
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
    gap: 0.65rem;
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

  .flavor-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.35rem;
    background: var(--subtle-bg);
    padding: 0.4rem;
    border-radius: 8px;
    border: 1px solid var(--border-subtle);
  }

  .flavor-btn {
    background: none;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 0.45rem 0.5rem;
    color: var(--text-muted);
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    -webkit-tap-highlight-color: transparent;
  }

  .flavor-btn:active {
    transform: scale(0.98);
  }

  .flavor-btn.active {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
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
    transition: transform 0.25s ease, opacity 0.25s ease, outline-color 0.25s ease, box-shadow 0.25s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .color-circle:active {
    transform: scale(0.9);
  }

  .color-circle.active {
    opacity: 1;
    outline: 2px solid var(--glow-color, currentColor);
    outline-offset: 2px;
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
