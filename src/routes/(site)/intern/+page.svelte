<script lang="ts">
  import InternshipPanel from '$lib/components/sections/intern/InternshipPanel.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { reveal } from '$lib/actions/reveal';
  import { internships } from '$lib/data/internships';
  import { personSchema } from '$lib/seo/jsonld';

  const description = internships
    .map((item) => `${item.role} at ${item.org} (${item.period}).`)
    .join(' ');
</script>

<SeoHead title="Internships" {description} path="/intern" jsonLd={personSchema()} />

<div class="intern-page">
  <header class="head reveal" use:reveal>
    <h1>Internships</h1>
    <p>Where I interned, and what I worked on.</p>
  </header>

  {#each internships as internship (internship.slug)}
    <InternshipPanel {internship} />
  {/each}
</div>

<style>
  .intern-page {
    padding-top: 10rem;
    padding-bottom: 4rem;
  }

  .head {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto 1.5rem;
    text-align: center;
  }

  h1 {
    margin: 0 0 0.35rem;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
  }

  .head p {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    .intern-page {
      padding-top: 7rem;
    }
  }
</style>
