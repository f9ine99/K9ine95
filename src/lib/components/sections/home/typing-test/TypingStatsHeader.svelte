<script lang="ts">
  import { RefreshCw, Target, Zap } from 'lucide-svelte';

  interface Props {
    wpm: number;
    accuracy: number;
    onReset: () => void;
  }

  let { wpm, accuracy, onReset }: Props = $props();
</script>

<div class="stats-header">
  <div class="stat">
    <Zap size={13} class="icon-wpm" />
    <span>{wpm} WPM</span>
  </div>

  <div class="stat">
    <Target size={13} class="icon-acc" />
    <span>{accuracy}% ACC</span>
  </div>

  <button type="button" class="reset-btn" onclick={() => onReset()} title="New line (keyboard: Tab)">
    <RefreshCw size={13} />
    <span class="reset-hint">Reset</span>
  </button>
</div>

<style>
  .stats-header {
    display: flex;
    gap: 1.25rem;
    margin-bottom: 1rem;
    align-items: center;
    font-family: var(--font-mono);
  }

  .stat {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8125rem;
    color: var(--text-muted);
  }

  :global(.icon-wpm) {
    color: var(--accent-orange);
  }

  :global(.icon-acc) {
    color: var(--accent-blue);
  }

  .reset-btn {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem 0.45rem;
    border-radius: 6px;
    transition: color 0.15s ease, background-color 0.15s ease;
    margin-left: auto;
  }

  .reset-btn:hover {
    color: var(--accent-orange);
    background: var(--overlay-light);
  }

  .reset-hint {
    font-size: 0.75rem;
    font-weight: 500;
    margin-left: 0.35rem;
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    .stats-header {
      gap: 0.875rem;
      margin-bottom: 0.875rem;
      flex-wrap: wrap;
    }
  }
</style>
