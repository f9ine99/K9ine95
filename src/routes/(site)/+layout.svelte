<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import Lenis from 'lenis';
  import 'lenis/dist/lenis.css';
  import { themeState, loadSavedTheme } from '$lib/stores/theme.svelte';
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
      stopInertiaOnNavigate: true
    });

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  });

  afterNavigate(async (navigation) => {
    await tick();
    if (!lenis) return;
    lenis.resize();
    if (navigation.type !== 'popstate') {
      lenis.scrollTo(0, { immediate: true });
    }
  });

  // Apply background effect class to body
  $effect(() => {
    if (themeState.bgEffect) {
      document.body.classList.add('bg-effect-on');
    } else {
      document.body.classList.remove('bg-effect-on');
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
