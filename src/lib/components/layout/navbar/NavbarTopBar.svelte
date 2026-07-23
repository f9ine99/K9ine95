<script lang="ts">
  import { Menu, X } from 'lucide-svelte';

  interface Props {
    currentPath: string;
    currentPathname: string;
    isDrawerOpen: boolean;
    isScrolled: boolean;
    onToggleDrawer: () => void;
    onCloseDrawer: () => void;
  }

  let {
    currentPath,
    currentPathname,
    isDrawerOpen,
    isScrolled,
    onToggleDrawer,
    onCloseDrawer
  }: Props = $props();
</script>

<div class="navbar-wrapper" class:scrolled={isScrolled}>
  <nav class="navbar" aria-label="Primary">
    <a href="/" class="brand" onclick={onCloseDrawer}>
      <span class="prompt">~/{currentPath}</span>
    </a>

    <ul class="nav-links">
      <li>
        <a href="/" class:active={currentPathname === '/'}>Home</a>
      </li>
      <li>
        <a href="/about" class:active={currentPathname === '/about'}>About</a>
      </li>
      <li>
        <a
          href="/projects"
          class:active={currentPathname === '/projects' || currentPathname.startsWith('/projects/')}
        >
          Projects
        </a>
      </li>
      <li>
        <button
          type="button"
          class="nav-more-trigger"
          class:active={isDrawerOpen || currentPathname === '/more'}
          aria-expanded={isDrawerOpen}
          aria-haspopup="dialog"
          onclick={onToggleDrawer}
        >
          More
        </button>
      </li>
    </ul>

    <button
      type="button"
      class="menu-toggle"
      onclick={onToggleDrawer}
      aria-label="Menu"
      aria-expanded={isDrawerOpen}
    >
      {#if isDrawerOpen}
        <X size={22} />
      {:else}
        <Menu size={22} />
      {/if}
    </button>
  </nav>
</div>

<style>
  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 1.15rem 0;
    pointer-events: none;
    transition: padding 0.22s ease;
  }

  .navbar-wrapper.scrolled {
    padding: 0.7rem 0;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    width: min(92%, 720px);
    margin: 0 auto;
    padding: 0.72rem 1.35rem;
    pointer-events: auto;
    border-radius: 16px;
    border: 1px solid var(--border-medium);
    background: color-mix(in srgb, var(--card-bg) 82%, transparent);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    box-shadow: 0 10px 28px -12px var(--shadow-medium);
    transition:
      width 0.22s ease,
      padding 0.22s ease,
      box-shadow 0.22s ease,
      background-color 0.22s ease;
  }

  .navbar-wrapper.scrolled .navbar {
    width: min(92%, 640px);
    padding: 0.62rem 1.2rem;
    box-shadow: 0 12px 32px -10px rgba(0, 0, 0, 0.45);
  }

  :global(.Latte) .navbar {
    background: color-mix(in srgb, var(--card-bg) 88%, transparent);
    box-shadow: 0 10px 28px -12px rgba(0, 0, 0, 0.08);
  }

  .brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    min-width: 0;
    transition: opacity 0.15s ease;
  }

  .brand:hover {
    opacity: 0.85;
  }

  .prompt {
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: 0.88rem;
    color: var(--text-primary);
    white-space: nowrap;
    letter-spacing: -0.02em;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 1.35rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a,
  .nav-more-trigger {
    font-family: var(--font-mono);
    font-size: 0.84rem;
    font-weight: 500;
    color: var(--text-muted);
    opacity: 1;
    padding: 0.25rem 0;
    text-decoration: none;
    white-space: nowrap;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .nav-links a:hover,
  .nav-more-trigger:hover {
    color: var(--text-primary);
  }

  .nav-links a.active,
  .nav-more-trigger.active {
    color: var(--text-primary);
  }

  .nav-more-trigger:focus {
    outline: none;
  }

  .nav-more-trigger:focus-visible,
  .nav-links a:focus-visible {
    outline: 2px solid var(--accent-orange);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.35rem;
    opacity: 0.85;
    transition: opacity 0.15s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .menu-toggle:hover {
    opacity: 1;
  }

  @media (max-width: 800px) {
    .navbar {
      width: min(94%, 520px);
      padding: 0.65rem 1rem;
    }

    .nav-links {
      display: none;
    }

    .menu-toggle {
      display: block;
    }

    .prompt {
      max-width: 200px;
      font-size: 0.82rem;
    }
  }
</style>
