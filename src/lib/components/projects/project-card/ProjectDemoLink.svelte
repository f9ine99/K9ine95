<script lang="ts">
  import { ExternalLink, Globe } from 'lucide-svelte';

  interface Props {
    demoUrl: string;
  }

  let { demoUrl }: Props = $props();
</script>

<a href={demoUrl} target="_blank" rel="noopener noreferrer" class="demo-link">
  <div class="demo-icon-wrapper">
    <Globe size={14} />
    <span>Live Demo</span>
  </div>
  <span class="external-icon">
    <ExternalLink size={14} />
  </span>
</a>

<style>
  .demo-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.6rem;
    margin-top: auto;
    padding: 1rem 1.25rem;
    background: color-mix(in srgb, var(--accent-orange) 22%, var(--card-bg-elevated));
    border: 1px solid color-mix(in srgb, var(--accent-orange) 55%, var(--border-medium));
    border-radius: 12px;
    color: var(--text-primary);
    font-size: 0.9rem;
    font-weight: 700;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: var(--font-mono);
    -webkit-tap-highlight-color: transparent;
  }

  .demo-link:active {
    transform: scale(0.96);
    filter: brightness(0.92);
  }

  .demo-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .demo-icon-wrapper :global(svg) {
    color: var(--accent-orange);
    flex-shrink: 0;
  }

  .external-icon {
    opacity: 0.75;
    color: var(--text-muted);
    transition: all 0.3s ease;
  }

  .demo-link:hover {
    background: var(--accent-orange);
    color: #111;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 20px color-mix(in srgb, var(--accent-orange) 42%, transparent);
    border-color: var(--accent-orange);
  }

  .demo-link:hover .demo-icon-wrapper :global(svg),
  .demo-link:hover .external-icon {
    color: #111;
    opacity: 1;
  }

  .demo-link:hover .external-icon {
    transform: translate(2px, -2px);
  }

  /* Stronger resting contrast on light themes when accent is pale. */
  :global(.Latte) .demo-link {
    background: color-mix(in srgb, var(--accent-orange) 18%, #fff);
    border-color: color-mix(in srgb, var(--accent-orange) 65%, #111);
    color: #111;
  }

  :global(.Latte) .demo-link .demo-icon-wrapper :global(svg),
  :global(.Latte) .demo-link .external-icon {
    color: color-mix(in srgb, var(--accent-orange) 75%, #111);
    opacity: 1;
  }
</style>
