<script lang="ts">
  import type { Project } from '$lib/data/projects';
  import {
    Shield,
    Cpu,
    Globe,
    Zap,
    Boxes,
    Database,
    Key,
    Server,
    Smartphone,
    Layout,
    Terminal as TerminalIcon,
    FileCode,
    Activity,
    CircuitBoard,
    Hash,
    Cable,
    Flame,
    Cloud,
    Triangle,
    Hexagon
  } from 'lucide-svelte';

  interface Props {
    tags: Project['tags'];
    variant?: 'card' | 'panel';
    class?: string;
  }

  let { tags, variant = 'card', class: className = '' }: Props = $props();

  const getIcon = (tagName: string) => {
    const lower = tagName.toLowerCase();

    if (lower.includes('next')) return Triangle;
    if (lower.includes('svelte')) return Flame;
    if (lower.includes('react')) return Zap;
    if (lower.includes('vite')) return Zap;

    if (lower.includes('typescript') || lower.includes('javascript')) return FileCode;
    if (lower.includes('python')) return TerminalIcon;
    if (lower.includes('assembly') || lower.includes('x86')) return CircuitBoard;
    if (lower.includes('html') || lower.includes('css')) return Layout;

    if (lower.includes('nest')) return Hexagon;
    if (lower.includes('flask') || lower.includes('fastapi')) return Server;
    if (lower.includes('cloudflare')) return Cloud;
    if (lower.includes('docker')) return Boxes;

    if (lower.includes('better') || lower.includes('auth') || lower.includes('jwt')) return Key;
    if (lower.includes('security') || lower.includes('shield')) return Shield;

    if (
      lower.includes('supabase') ||
      lower.includes('sql') ||
      lower.includes('postgre') ||
      lower.includes('pgvector')
    )
      return Database;
    if (lower.includes('websocket') || lower.includes('cable')) return Cable;

    if (lower.includes('pwa')) return Smartphone;
    if (lower.includes('ai') || lower.includes('groq')) return Cpu;
    if (lower.includes('monitoring')) return Activity;
    if (lower.includes('low-level')) return CircuitBoard;
    if (lower.includes('web') || lower.includes('site')) return Globe;

    return Hash;
  };

  const iconSize = $derived(variant === 'card' ? 14 : 12);
</script>

<div class="tech-tags {variant} {className}">
  {#each tags as tag (tag.name)}
    {@const TagIcon = tag.icon || getIcon(tag.name)}
    <div class="tag" style="--tag-color: {tag.color || 'var(--accent-orange)'}">
      <TagIcon size={iconSize} />
      <span>{tag.name}</span>
    </div>
  {/each}
</div>

<style>
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .tech-tags.card {
    margin-top: 0.75rem;
  }

  .tech-tags.panel {
    margin-top: 1rem;
  }

  .tech-tags.card .tag {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.7rem;
    background: var(--tag-bg);
    border-radius: 6px;
    font-size: 0.75rem;
    font-family: var(--font-mono);
    color: var(--text-primary);
    border: 1px solid var(--border-subtle);
    transition: all 0.2s;
  }

  .tech-tags.card .tag:hover {
    border-color: var(--tag-color);
    background: color-mix(in srgb, var(--tag-color) 14%, var(--tag-bg));
  }

  .tech-tags.panel .tag {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--overlay-light);
    border: 1px solid var(--border-medium);
    padding: 0.4rem 0.85rem;
    border-radius: 8px;
    font-size: 0.8rem;
    color: var(--text-primary);
    font-family: var(--font-mono);
    transition: all 0.2s ease;
  }

  .tech-tags.panel .tag:hover {
    border-color: var(--tag-color);
    background: var(--overlay-medium);
  }

  @media (max-width: 480px) {
    .tech-tags.card {
      gap: 0.45rem;
    }

    .tech-tags.panel {
      gap: 0.4rem;
    }

    .tech-tags.panel .tag {
      font-size: 0.7rem;
      padding: 0.3rem 0.65rem;
    }
  }
</style>
