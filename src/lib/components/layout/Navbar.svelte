<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { projects } from '$lib/data/projects';
  import NavbarTopBar from '$lib/components/layout/navbar/NavbarTopBar.svelte';
  import NavbarDrawer from '$lib/components/layout/navbar/NavbarDrawer.svelte';

  let isScrolled = $state(false);
  let isDrawerOpen = $state(false);
  let scrollRaf = 0;
  /** Preserve window scroll when the drawer uses body { position: fixed } lock */
  let drawerScrollLockY = 0;

  function applyDrawerScrollLock(locked: boolean) {
    if (typeof document === 'undefined') return;

    if (locked) {
      drawerScrollLockY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${drawerScrollLockY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, drawerScrollLockY);
    }
  }

  function toggleDrawer() {
    isDrawerOpen = !isDrawerOpen;
    applyDrawerScrollLock(isDrawerOpen);
  }

  function closeDrawer() {
    if (!isDrawerOpen) return;
    isDrawerOpen = false;
    applyDrawerScrollLock(false);
  }

  let currentPath = $derived.by(() => {
    const path = page.url.pathname;
    if (path === '/') return 'Home/Firaol';

    return path
      .split('/')
      .filter(Boolean)
      .map((part) => {
        const project = projects.find((p) => p.slug === part);
        const name = project
          ? project.title
          : part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
        return name.length > 12 ? name.slice(0, 10) + '..' : name;
      })
      .join('/');
  });

  onMount(() => {
    const updateScrollState = () => {
      isScrolled = window.scrollY > 20;
      scrollRaf = 0;
    };

    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
      }
      window.removeEventListener('scroll', handleScroll);
      if (typeof document !== 'undefined' && document.body.style.position === 'fixed') {
        isDrawerOpen = false;
        applyDrawerScrollLock(false);
      }
    };
  });
</script>

<NavbarTopBar
  {currentPath}
  currentPathname={page.url.pathname}
  {isDrawerOpen}
  {isScrolled}
  onToggleDrawer={toggleDrawer}
  onCloseDrawer={closeDrawer}
/>

{#if isDrawerOpen}
  <NavbarDrawer currentPathname={page.url.pathname} onCloseDrawer={closeDrawer} />
{/if}
