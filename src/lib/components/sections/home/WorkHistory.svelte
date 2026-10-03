<script lang="ts">
  import { ArrowRight, ArrowUpRight } from 'lucide-svelte';
  import { internships } from '$lib/data/internships';

  type WorkItem = {
    name: string;
    role: string;
    image: string;
    link: string;
    external?: boolean;
    current: boolean;
    period: string;
    invert?: boolean;
  };

  const history: WorkItem[] = [
    {
      name: 'HamerAI',
      role: 'Co-Founder · Software Engineer',
      image: '/images/hamerAI.jpg',
      current: true,
      period: 'Present',
      link: 'https://ethiohamerai.vercel.app'
    },
    {
      name: 'Atlas Computer Technology',
      role: 'System Engineering Intern',
      image: '/images/atlas.png',
      current: false,
      period: 'Jun–Sep 2026',
      link: '/intern#atlas',
      external: false
    },
    {
      name: 'INSA',
      role: 'Cybersecurity Analyst',
      image: '/images/insa-icon.png',
      current: false,
      period: 'Past',
      link: 'https://www.insa.gov.et/'
    },
    {
      name: 'Alx Ethiopia',
      role: 'Software Engineering',
      image: '/images/alx-pic.webp',
      current: false,
      period: 'Past',
      invert: true,
      link: 'https://www.alxafrica.com/'
    }
  ];
</script>

<section class="work" id="work" aria-labelledby="work-heading">
  <div class="work-head">
    <h2 id="work-heading">Experience</h2>
    <p class="work-sub">A short trail of where I’ve built and learned.</p>
  </div>

  <ol class="timeline">
    {#each history as item, i (item.name)}
      <li class="timeline-item" class:current={item.current}>
        <div class="rail" aria-hidden="true">
          <span class="node"></span>
          {#if i < history.length - 1}
            <span class="line"></span>
          {/if}
        </div>

        <a
          href={item.link}
          class="row"
          class:internal={item.external === false}
          target={item.external === false ? undefined : '_blank'}
          rel={item.external === false ? undefined : 'noopener noreferrer'}
        >
          <span class="logo-wrap">
            <img
              src={item.image}
              alt=""
              class="logo"
              class:dark-invert={item.invert}
              loading="lazy"
              decoding="async"
              width="40"
              height="40"
            />
          </span>

          <span class="info">
            <span class="org-line">
              <span class="org">{item.name}</span>
              {#if item.current}
                <span class="badge">Now</span>
              {/if}
            </span>
            <span class="role">{item.role}</span>
          </span>

          <span class="period">{item.period}</span>
          <span class="arrow" class:internal={item.external === false} aria-hidden="true">
            {#if item.external === false}
              <ArrowRight size={15} />
            {:else}
              <ArrowUpRight size={15} />
            {/if}
          </span>
        </a>
      </li>
    {/each}
  </ol>

  {#if internships.length}
    <div class="intern-cards">
      {#each internships as item (item.slug)}
        <a class="intern-card" href="/intern#{item.slug}">
          <span class="intern-glow" aria-hidden="true"></span>
          <img
            src={item.image}
            alt=""
            class="intern-logo"
            width="46"
            height="46"
            loading="lazy"
            decoding="async"
          />
          <span class="intern-copy">
            <span class="intern-kicker">Internship</span>
            <span class="intern-title">{item.org}</span>
            <span class="intern-meta">{item.cardMeta}</span>
          </span>
          <span class="intern-go" aria-hidden="true">
            <ArrowRight size={16} />
          </span>
        </a>
      {/each}
    </div>
  {/if}
</section>

<style>
  .work {
    width: 100%;
    max-width: 40rem;
    margin: 0.25rem auto 3.25rem;
  }

  .work-head {
    text-align: center;
    margin-bottom: 1.75rem;
  }

  .work-head h2 {
    margin: 0 0 0.35rem;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .work-sub {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 1.25rem 1fr;
    gap: 0.85rem;
    align-items: stretch;
  }

  .rail {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.35rem;
  }

  .node {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 2px solid var(--border-medium);
    background: var(--bg-color);
    flex-shrink: 0;
    z-index: 1;
  }

  .timeline-item.current .node {
    border-color: var(--accent-orange);
    background: var(--accent-orange);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent-orange) 18%, transparent);
  }

  .line {
    flex: 1;
    width: 1px;
    margin-top: 0.35rem;
    background: var(--border-subtle);
    min-height: 1.25rem;
  }

  .row {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    gap: 0.85rem;
    padding: 0.95rem 0.25rem 0.95rem 0;
    text-decoration: none;
    color: inherit;
    border-bottom: 1px solid var(--border-subtle);
    transition: background-color 0.18s ease;
  }

  .timeline-item:last-child .row {
    border-bottom: none;
  }

  .row:hover .org {
    color: var(--accent-orange);
  }

  .row:hover .arrow {
    color: var(--accent-orange);
    transform: translate(1px, -1px);
  }

  .row:hover .arrow.internal {
    transform: translateX(3px);
  }

  .logo-wrap {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-subtle);
    background: var(--subtle-bg);
  }

  .logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  :global(html:not(.Latte)) .logo.dark-invert {
    filter: brightness(0) invert(1);
    opacity: 0.92;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .org-line {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
  }

  .org {
    font-weight: 600;
    font-size: 0.98rem;
    color: var(--text-primary);
    letter-spacing: -0.01em;
    transition: color 0.18s ease;
  }

  .badge {
    flex-shrink: 0;
    padding: 0.12rem 0.45rem;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--bg-color);
    background: var(--accent-orange);
  }

  .role {
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  .period {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .arrow {
    display: inline-flex;
    color: var(--text-muted);
    transition:
      color 0.18s ease,
      transform 0.18s ease;
  }

  .intern-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.15rem;
  }

  .intern-card {
    position: relative;
    isolation: isolate;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.9rem;
    padding: 0.85rem 0.9rem 0.85rem 0.85rem;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    border-radius: 18px;
    border: 1px solid color-mix(in srgb, var(--accent-orange) 28%, var(--border-medium));
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--accent-orange) 8%, transparent),
        transparent 42%
      ),
      color-mix(in srgb, var(--card-bg) 78%, transparent);
    box-shadow: 0 16px 40px -28px var(--shadow-color);
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .intern-card:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--accent-orange) 55%, var(--border-medium));
    box-shadow: 0 18px 36px -24px var(--shadow-medium);
  }

  .intern-glow {
    position: absolute;
    top: -2.5rem;
    right: -1.5rem;
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--accent-blue) 28%, transparent),
      transparent 68%
    );
    pointer-events: none;
    z-index: -1;
  }

  .intern-logo {
    width: 46px;
    height: 46px;
    border-radius: 12px;
    object-fit: cover;
    border: 1px solid var(--border-subtle);
  }

  .intern-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 0.08rem;
  }

  .intern-kicker {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent-orange);
  }

  .intern-title {
    font-size: 0.98rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .intern-meta {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--text-muted);
  }

  .intern-go {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.15rem;
    height: 2.15rem;
    border-radius: 999px;
    color: var(--bg-color);
    background: var(--accent-orange);
    transition: transform 0.2s ease;
  }

  .intern-card:hover .intern-go {
    transform: translateX(3px);
  }

  @media (prefers-reduced-motion: reduce) {
    .intern-card,
    .intern-go {
      transition: none;
    }

    .intern-card:hover,
    .intern-card:hover .intern-go {
      transform: none;
    }
  }

  @media (max-width: 560px) {
    .row {
      grid-template-columns: auto 1fr auto;
      gap: 0.7rem;
    }

    .period {
      display: none;
    }

    .role {
      font-size: 0.78rem;
    }
  }
</style>
