<script lang="ts">
  import { page } from '$app/state';
  import AppErrorView from '$lib/components/errors/AppErrorView.svelte';

  const headTitle = $derived(page.status === 404 ? 'Page not found' : `Error ${page.status}`);
</script>

<svelte:head>
  <title>{headTitle} — Portfolio</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<AppErrorView />
