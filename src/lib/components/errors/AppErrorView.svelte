<script lang="ts">
  import { page } from '$app/state';
  import { dev } from '$app/environment';
  import { fade, fly, scale } from 'svelte/transition';
  import {
    Home,
    AlertTriangle,
    ArrowLeft,
    ServerCrash,
    RefreshCcw,
    FileQuestion,
    ShieldAlert,
    Lock,
    CloudOff
  } from 'lucide-svelte';

  const status = $derived(page.status);
  const is404 = $derived(status === 404);
  const is401 = $derived(status === 401);
  const is403 = $derived(status === 403);
  const is500 = $derived(status >= 500);
  const is503 = $derived(status === 503);

  const message = $derived(
    is404
      ? "That page doesn't exist or was moved."
      : is401
        ? 'You need to sign in to view this.'
        : is403
          ? "You don't have permission to view this."
          : is503
            ? 'The site is temporarily unavailable. Try again in a moment.'
            : is500
              ? 'Something went wrong on our side. We are on it.'
              : 'Something unexpected happened.'
  );

  const heading = $derived(
    is404
      ? 'Page not found'
      : is401
        ? 'Unauthorized'
        : is403
          ? 'Forbidden'
          : is503
            ? 'Service unavailable'
            : is500
              ? 'Server error'
              : 'Something went wrong'
  );

  const clientDetail = $derived(
    dev && page.error && typeof page.error === 'object' && 'message' in page.error
      ? String((page.error as { message?: string }).message ?? '')
      : ''
  );
</script>

<div class="error-page {is500 ? 'error-500' : ''}">
  <div class="background-effects">
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
  </div>

  <div class="content-card" in:scale={{ duration: 600, delay: 200, start: 0.95 }}>
    <div class="status-code" in:fly={{ y: -20, duration: 800, delay: 400 }}>
      <span class="glitch" data-text={status}>{status}</span>
    </div>

    <div class="icon-wrapper" in:fade={{ duration: 600, delay: 600 }}>
      {#if is500}
        <ServerCrash size={48} class="error-icon" />
      {:else if is404}
        <FileQuestion size={48} class="error-icon" />
      {:else if is403}
        <ShieldAlert size={48} class="error-icon" />
      {:else if is401}
        <Lock size={48} class="error-icon" />
      {:else if is503}
        <CloudOff size={48} class="error-icon" />
      {:else}
        <AlertTriangle size={48} class="error-icon" />
      {/if}
    </div>

    <h1 in:fade={{ duration: 600, delay: 700 }}>{heading}</h1>
    <p class="message" in:fade={{ duration: 600, delay: 800 }}>{message}</p>

    {#if clientDetail}
      <p class="dev-detail" in:fade={{ duration: 400, delay: 850 }}>{clientDetail}</p>
    {/if}

    <div class="actions" in:fade={{ duration: 600, delay: 1000 }}>
      {#if is500 || is503}
        <button type="button" onclick={() => window.location.reload()} class="home-btn retry-btn">
          <RefreshCcw size={18} />
          <span>Try again</span>
        </button>
      {/if}
      <a href="/" class="home-btn">
        <Home size={18} />
        <span>Home</span>
      </a>
      <button type="button" onclick={() => history.back()} class="back-link">
        <ArrowLeft size={16} />
        <span>Go back</span>
      </button>
    </div>
  </div>
</div>

<style>
  .error-page {
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    padding: 2rem;
  }

  .background-effects {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .orb {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    animation: float 20s infinite alternate ease-in-out;
  }

  .orb-1 {
    background: var(--accent-orange);
    top: 10%;
    left: 20%;
  }
  .orb-2 {
    background: var(--accent-blue);
    bottom: 20%;
    right: 10%;
    animation-delay: -5s;
  }
  .orb-3 {
    background: var(--accent-purple);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -10s;
  }

  .error-500 .orb-1 {
    background: var(--accent-red);
  }
  .error-500 .orb-2 {
    background: var(--accent-orange);
  }
  .error-500 .orb-3 {
    background: var(--accent-red);
    opacity: 0.1;
  }
  .error-500 .glitch {
    text-shadow:
      2px 0 var(--accent-orange),
      -2px 0 var(--accent-purple);
  }
  .error-500 :global(.error-icon) {
    color: var(--accent-red);
  }

  @keyframes float {
    0% {
      transform: translate(0, 0) scale(1);
    }
    100% {
      transform: translate(40px, 40px) scale(1.1);
    }
  }

  .content-card {
    background: rgba(36, 39, 58, 0.4);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 4rem 3rem;
    text-align: center;
    width: 100%;
    max-width: 500px;
    position: relative;
    z-index: 10;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  .status-code {
    font-size: 8rem;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 1rem;
    font-family: var(--font-mono);
    color: #fff;
    position: relative;
  }

  .glitch {
    position: relative;
    display: inline-block;
    color: #fff;
    text-shadow:
      2px 0 var(--accent-red),
      -2px 0 var(--accent-blue);
  }

  .icon-wrapper {
    margin-bottom: 1.5rem;
    color: var(--accent-orange);
    display: flex;
    justify-content: center;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #fff;
  }

  .message {
    color: var(--text-muted);
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    max-width: 320px;
    margin-left: auto;
    margin-right: auto;
  }

  .dev-detail {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 2rem;
    word-break: break-word;
    max-width: 100%;
    opacity: 0.9;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .home-btn {
    background: var(--accent-orange);
    color: #1e2030;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    width: 100%;
    justify-content: center;
  }

  .home-btn:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 20px rgba(245, 169, 127, 0.3);
    color: #1e2030;
  }

  .retry-btn {
    background: var(--accent-blue);
  }

  .retry-btn:hover {
    box-shadow: 0 10px 20px rgba(138, 173, 244, 0.3);
  }

  .error-500 .retry-btn {
    background: var(--accent-red);
  }
  .error-500 .retry-btn:hover {
    box-shadow: 0 10px 20px rgba(237, 135, 150, 0.3);
  }

  .back-link {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--text-primary);
  }

  @media (max-width: 640px) {
    .status-code {
      font-size: 6rem;
    }
    .content-card {
      padding: 3rem 2rem;
    }
  }
</style>
