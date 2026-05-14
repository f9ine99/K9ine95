<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import Lenis from 'lenis';
  import 'lenis/dist/lenis.css';
  import { loadSavedTheme } from '$lib/stores/theme.svelte';
  import '../../app.css';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  let { children } = $props();

  let lenis = $state<InstanceType<typeof Lenis> | null>(null);

  onMount(() => {
    loadSavedTheme();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true,
      allowNestedScroll: true
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  });

  const hashScrollOffset = 96;

  afterNavigate(async (navigation) => {
    await tick();

    const hash = page.url.hash;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      await tick();
      const el = id ? document.getElementById(id) : null;
      if (el) {
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(el, {
            offset: -hashScrollOffset,
            immediate: navigation.type === 'popstate'
          });
        } else {
          el.scrollIntoView({
            block: 'start',
            behavior: navigation.type === 'popstate' ? 'instant' : 'smooth'
          });
        }
      }
      return;
    }

    if (lenis) {
      lenis.resize();
      if (navigation.type !== 'popstate') {
        lenis.scrollTo(0, { immediate: true });
      }
    } else if (navigation.type !== 'popstate') {
      window.scrollTo(0, 0);
    }
  });
</script>

<Navbar />
<div class="app-container">
  {@render children()}
</div>
<Footer />

<style>
  .app-container {
    padding: 0;
    min-height: calc(100vh - 200px);
  }
</style>
