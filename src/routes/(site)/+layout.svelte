<script lang="ts">
  import { onMount } from 'svelte';
  import Lenis from 'lenis';
  import 'lenis/dist/lenis.css';
  import { themeState, loadSavedTheme } from '$lib/stores/theme.svelte';
  import '../../app.css';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  let { children } = $props();

  onMount(() => {
    loadSavedTheme();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      stopInertiaOnNavigate: true
    });

    return () => {
      lenis.destroy();
    };
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
