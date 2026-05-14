<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { ExternalLink, Github, Linkedin, Mail, X } from 'lucide-svelte';
  import NavbarThemeControls from '$lib/components/layout/navbar/NavbarThemeControls.svelte';

  interface Props {
    currentPathname: string;
    onCloseDrawer: () => void;
  }

  let { currentPathname, onCloseDrawer }: Props = $props();
</script>

<!-- Overlay -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="drawer-overlay" onclick={onCloseDrawer} transition:fade={{ duration: 200 }}></div>

<!-- Drawer -->
<div class="drawer" transition:fly={{ x: 240, duration: 260, opacity: 1 }}>
  <div class="drawer-header">
    <h2 class="drawer-title">Menu</h2>
    <button type="button" class="close-btn" onclick={onCloseDrawer} aria-label="Close menu">
      <X size={20} />
    </button>
  </div>

  <div class="drawer-content">
    <NavbarThemeControls />

    <div class="drawer-section links-section">
      <a href="/" class:active={currentPathname === '/'} onclick={onCloseDrawer}>Home</a>
      <a href="/about" class:active={currentPathname === '/about'} onclick={onCloseDrawer}>About</a>
      <a
        href="/projects"
        class:active={currentPathname === '/projects' || currentPathname.startsWith('/projects/')}
        onclick={onCloseDrawer}>Projects</a>
    </div>

    <div class="drawer-section more-links">
      <div class="more-label">Links</div>
      <a href="https://github.com/f9ine99" target="_blank" rel="noopener noreferrer">
        <Github size={16} />
        <span>GitHub</span>
        <span class="ext-icon">
          <ExternalLink size={12} />
        </span>
      </a>
      <a href="https://linkedin.com/in/k9ine95" target="_blank" rel="noopener noreferrer">
        <Linkedin size={16} />
        <span>LinkedIn</span>
        <span class="ext-icon">
          <ExternalLink size={12} />
        </span>
      </a>
      <a href="mailto:firaolgemedabuliye@gmail.com" title="firaolgemedabuliye@gmail.com" onclick={onCloseDrawer}>
        <Mail size={16} />
        <span>Email</span>
      </a>
    </div>
  </div>
</div>

<style>
  .drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(2px);
    z-index: 2000;
  }

  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(280px, 92vw);
    background: var(--bg-color);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-left: 1px solid var(--border-subtle);
    z-index: 2001;
    display: flex;
    flex-direction: column;
    box-shadow: -6px 0 24px rgba(0, 0, 0, 0.35);
  }

  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.1rem;
    border-bottom: 1px solid var(--border-subtle);
  }

  .drawer-title {
    margin: 0;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }

  .close-btn {
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.2s;
    -webkit-tap-highlight-color: transparent;
  }

  .close-btn:active {
    transform: scale(0.9);
  }

  .close-btn:hover {
    opacity: 1;
  }

  .drawer-content {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .drawer-section {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .links-section {
    border-top: 1px solid var(--border-subtle);
    padding-top: 1rem;
  }

  .drawer-section a {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    font-size: 0.95rem;
    color: var(--text-primary);
    text-decoration: none;
    padding: 0.4rem 0;
    transition: color 0.15s ease, padding-left 0.15s ease;
    font-family: var(--font-mono, monospace);
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
  }

  .drawer-section a::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 0;
    background: var(--accent-orange);
    transition: height 0.15s ease;
    border-radius: 1px;
  }

  .drawer-section a:hover::before,
  .drawer-section a.active::before {
    height: 60%;
  }

  .drawer-section a:hover,
  .drawer-section a.active {
    padding-left: 0.5rem;
    color: var(--accent-orange);
  }

  .drawer-section a.active {
    color: var(--accent-orange);
  }

  .more-links {
    border-top: 1px solid var(--border-subtle);
    padding-top: 1rem;
  }

  .more-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    font-family: var(--font-mono);
  }

  .more-links a {
    font-size: 0.875rem;
    opacity: 0.85;
  }

  .ext-icon {
    margin-left: auto;
    opacity: 0.5;
  }
</style>
