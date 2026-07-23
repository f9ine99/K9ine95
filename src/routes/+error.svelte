<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import '../app.css';
  import { loadSavedTheme } from '$lib/stores/theme.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import AppErrorView from '$lib/components/errors/AppErrorView.svelte';

  onMount(() => {
    loadSavedTheme();
  });

  const headTitle = $derived(page.status === 404 ? 'Page not found' : `Error ${page.status}`);
</script>

<svelte:head>
  <title>{headTitle} — Portfolio</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<Navbar />
<div class="app-container">
  <AppErrorView />
</div>
<Footer />

<style>
  .app-container {
    padding: 0;
    min-height: calc(100vh - 200px);
  }
</style>
