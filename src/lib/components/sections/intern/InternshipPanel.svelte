<script lang="ts">
  import { Activity, Container, GitBranch, Globe, Network, Server } from 'lucide-svelte';
  import type { Internship, InternshipIcon } from '$lib/data/internships';

  let { internship }: { internship: Internship } = $props();

  const icons = {
    server: Server,
    globe: Globe,
    git: GitBranch,
    container: Container,
    activity: Activity,
    network: Network
  } satisfies Record<InternshipIcon, typeof Server>;

  const companyLabel = $derived(new URL(internship.companyUrl).host.replace(/^www\./, ''));
</script>

<section class="internship" id={internship.slug} aria-labelledby="{internship.slug}-heading">
  <div class="panel">
    <div class="meta">
      <img
        src={internship.image}
        alt=""
        class="logo"
        width="44"
        height="44"
        loading="lazy"
        decoding="async"
      />
      <div class="identity">
        <h2 id="{internship.slug}-heading">{internship.org}</h2>
        <p class="role">{internship.role}</p>
      </div>
      <p class="when">{internship.when}</p>
    </div>

    <p class="lead">{internship.lead}</p>

    <ul class="areas">
      {#each internship.areas as area (area.title)}
        {@const Icon = icons[area.icon]}
        <li>
          <span class="area-icon" aria-hidden="true">
            <Icon size={16} />
          </span>
          <div>
            <h3>{area.title}</h3>
            <p>{area.detail}</p>
          </div>
        </li>
      {/each}
    </ul>

    <a class="company" href={internship.companyUrl} target="_blank" rel="noopener noreferrer">
      {companyLabel}
    </a>
  </div>
</section>

<style>
  .internship {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto 1.25rem;
    scroll-margin-top: 6rem;
  }

  .panel {
    padding: 1.15rem 1.15rem 1rem;
    border: 1px solid var(--border-subtle);
    border-radius: 16px;
    background: var(--subtle-bg);
  }

  .meta {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'logo identity'
      'when when';
    gap: 0.15rem 0.85rem;
    align-items: center;
  }

  .logo {
    grid-area: logo;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    object-fit: cover;
    border: 1px solid var(--border-subtle);
    background: var(--card-bg);
  }

  .identity {
    grid-area: identity;
    min-width: 0;
  }

  h2 {
    margin: 0;
    font-weight: 600;
    font-size: 0.98rem;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .role,
  .when,
  .lead,
  .areas p {
    margin: 0;
    color: var(--text-muted);
  }

  .role {
    font-size: 0.82rem;
  }

  .when {
    grid-area: when;
    margin-top: 0.65rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
  }

  .lead {
    margin-top: 1rem;
    font-size: 0.86rem;
    line-height: 1.65;
    color: var(--text-primary);
  }

  .areas {
    display: grid;
    gap: 0.85rem;
    margin: 1.15rem 0 0;
    padding: 0;
  }

  .areas li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.7rem;
    align-items: start;
  }

  .area-icon {
    display: inline-flex;
    margin-top: 0.15rem;
    color: var(--accent-orange);
  }

  .areas h3 {
    margin: 0 0 0.15rem;
    font-size: 0.86rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  .areas p {
    font-size: 0.78rem;
    line-height: 1.55;
  }

  .company {
    display: inline-block;
    margin-top: 1.1rem;
    font-family: var(--font-mono);
    font-size: 0.72rem;
  }

  @media (min-width: 720px) {
    .meta {
      grid-template-columns: auto 1fr auto;
      grid-template-areas: 'logo identity when';
      gap: 0.85rem;
    }

    .when {
      margin-top: 0;
    }

    .areas {
      grid-template-columns: 1fr 1fr;
      gap: 1rem 1.15rem;
    }
  }
</style>
