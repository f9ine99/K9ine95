<script lang="ts">
  import { RefreshCw, Target, Zap } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  interface Props {
    wpm: number;
    accuracy: number;
    onRetry: () => void;
  }

  let { wpm, accuracy, onRetry }: Props = $props();
</script>

<div class="victory-screen" in:fade={{ duration: 250 }}>
  <div class="done-stats">
    <span class="done-stat"><Zap size={13} /> <strong>{wpm}</strong> WPM</span>
    <span class="done-divider">·</span>
    <span class="done-stat"><Target size={13} /> <strong>{accuracy}%</strong> ACC</span>
  </div>

  <button type="button" class="retry-btn" onclick={() => onRetry()}>
    <RefreshCw size={12} />
    again
  </button>
</div>

<style>
  .victory-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.25rem 0;
    font-family: var(--font-mono);
  }

  .done-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-muted);
  }

  .done-stat {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .done-stat strong {
    color: var(--text-primary);
    font-size: 0.9375rem;
  }

  .done-divider {
    opacity: 0.3;
  }

  .retry-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    background: none;
    border: 1px solid var(--border-subtle);
    color: var(--text-muted);
    padding: 0.35rem 0.65rem;
    border-radius: 6px;
    font-size: 0.72rem;
    font-family: var(--font-mono);
    cursor: pointer;
    transition:
      color 0.2s,
      border-color 0.2s;
  }

  .retry-btn:hover {
    color: var(--accent-orange);
    border-color: var(--accent-orange);
  }

  @media (max-width: 768px) {
    .victory-screen {
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem 0;
    }

    .done-stats {
      font-size: 0.8125rem;
    }
  }
</style>
