<script lang="ts">
  import About from '$lib/components/sections/about/About.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { personSchema } from '$lib/seo/jsonld';

  const description =
    'About Firaol Gemeda — software engineer and cybersecurity analyst at HamerAI, based in Addis Ababa. Background in full-stack development, security, and computer science.';
</script>

<SeoHead title="About" description={description} path="/about" jsonLd={personSchema()} />

<div class="about-page">
  <About />
</div>

<style>
  .about-page {
    padding-top: 10rem;
    padding-bottom: 4rem;
  }

  @media (max-width: 768px) {
    .about-page {
      padding-top: 7rem;
    }
  }
</style>
