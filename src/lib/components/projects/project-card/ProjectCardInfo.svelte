<script lang="ts">
  interface Props {
    title: string;
    date: string;
    safeDescription: string;
  }

  let { title, date, safeDescription }: Props = $props();
</script>

<div class="project-info">
  <div class="title-row">
    <h3 class="title">{title}</h3>
    <span class="date">{date}</span>
  </div>

  <p class="description">{@html safeDescription}</p>
</div>

<style>
  .project-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    flex: 1;
  }

  .title-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
    font-family: var(--font-mono);
  }

  .date {
    font-size: 0.75rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
    white-space: nowrap;
  }

  .description {
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--text-muted);
    margin: 0;
    font-family: var(--font-mono);
    line-clamp: 3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .description :global(a) {
    color: color-mix(in srgb, var(--accent-orange) 55%, var(--text-primary));
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px dotted color-mix(in srgb, var(--accent-orange) 55%, transparent);
    padding-bottom: 1px;
    transition: all 0.2s ease;
  }

  :global(.Latte) .description :global(a) {
    color: color-mix(in srgb, var(--accent-orange) 70%, #111);
    border-bottom-color: color-mix(in srgb, var(--accent-orange) 70%, #111);
  }

  .description :global(a:hover) {
    color: var(--text-primary);
    border-bottom-color: var(--accent-orange);
    background: color-mix(in srgb, var(--accent-orange) 12%, transparent);
  }

  @media (max-width: 600px) {
    .title {
      font-size: 1.15rem;
    }
  }
</style>
