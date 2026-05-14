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

  let { currentPath, currentPathname, isDrawerOpen, isScrolled, onToggleDrawer, onCloseDrawer }: Props =
    $props();
</script>

<div class="navbar-wrapper" class:scrolled={isScrolled}>
  <div class="navbar">
    <a href="/" class="brand" onclick={onCloseDrawer}>
      <span class="prompt">~/{currentPath}</span>
    </a>

    <ul class="nav-links">
      <li><a href="/" class:active={currentPathname === '/'}>Home</a></li>
      <li><a href="/about" class:active={currentPathname === '/about'}>About</a></li>
      <li>
        <a
          href="/projects"
          class:active={currentPathname === '/projects' || currentPathname.startsWith('/projects/')}
          >Projects</a
        >
      </li>
      <li>
        <button
          type="button"
          class="nav-more-trigger"
          class:active={isDrawerOpen}
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
        <X size={24} />
      {:else}
        <Menu size={24} />
      {/if}
    </button>
  </div>
</div>

<style>
  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: padding 0.22s ease;
    padding: 1.1rem 0;
    pointer-events: none;
  }

  .navbar-wrapper.scrolled {
    padding: 0.55rem 0;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1180px;
    margin: 0 auto;
    padding: 0.7rem 1.5rem;
    width: 94%;
    pointer-events: auto;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid transparent;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transition:
      padding 0.22s ease,
      background 0.22s ease,
      border-color 0.22s ease,
      box-shadow 0.22s ease;
  }

  .navbar-wrapper.scrolled .navbar {
    max-width: 820px;
    background: rgba(17, 17, 27, 0.28);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 0.58rem 1.35rem;
    box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.45);
  }

  :global(.Frappe) .navbar-wrapper.scrolled .navbar {
    background: rgba(48, 52, 70, 0.3);
  }

  :global(.Macchiato) .navbar-wrapper.scrolled .navbar {
    background: rgba(36, 39, 58, 0.3);
  }

  :global(.Latte) .navbar-wrapper.scrolled .navbar {
    background: rgba(230, 233, 239, 0.45);
    border-color: rgba(0, 0, 0, 0.06);
    box-shadow: 0 6px 20px -8px rgba(0, 0, 0, 0.08);
  }

  .brand {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: opacity 0.15s ease;
  }

  .brand:hover {
    opacity: 0.88;
  }

  .prompt {
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--accent-orange);
    white-space: nowrap;
    letter-spacing: -0.01em;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nav-links {
    display: flex;
    gap: 1.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-links a {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
    opacity: 0.55;
    padding: 0.4rem 0.15rem;
    transition: color 0.15s ease, opacity 0.15s ease;
    text-decoration: none;
    white-space: nowrap;
    font-family: var(--font-mono);
    -webkit-tap-highlight-color: transparent;
  }

  .nav-links a:active {
    opacity: 0.75;
  }

  .nav-more-trigger {
    display: inline-block;
    background: none;
    border: none;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-primary);
    opacity: 0.55;
    padding: 0.4rem 0.15rem;
    cursor: pointer;
    transition: color 0.15s ease, opacity 0.15s ease;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
  }

  .nav-more-trigger:active {
    opacity: 0.75;
  }

  .nav-more-trigger:hover,
  .nav-more-trigger.active {
    opacity: 1;
    color: var(--accent-orange);
  }

  .nav-more-trigger:focus {
    outline: none;
  }

  .nav-more-trigger:focus-visible {
    outline: 2px solid var(--accent-orange);
    outline-offset: 3px;
    border-radius: 4px;
  }

  .nav-links a:hover,
  .nav-links a.active {
    opacity: 1;
    color: var(--accent-orange);
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 0.45rem;
    z-index: 1001;
    -webkit-tap-highlight-color: transparent;
    transition: opacity 0.15s ease;
    opacity: 0.85;
  }

  .menu-toggle:hover {
    opacity: 1;
  }

  @media (max-width: 800px) {
    .nav-links {
      display: none;
    }

    .menu-toggle {
      display: block;
    }
  }

  @media (min-width: 801px) and (max-width: 980px) {
    .nav-links {
      gap: 0.85rem;
    }

    .nav-links a {
      font-size: 0.8rem;
    }

    .nav-more-trigger {
      font-size: 0.8rem;
    }
  }
</style>
