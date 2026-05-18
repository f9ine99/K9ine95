<script lang="ts">
  import Hero from '$lib/components/sections/home/Hero.svelte';
  import Socials from '$lib/components/sections/home/Socials.svelte';
  import WorkHistory from '$lib/components/sections/home/WorkHistory.svelte';
  import FeaturedProjects from '$lib/components/sections/home/FeaturedProjects.svelte';
  import TypingTest from '$lib/components/sections/home/TypingTest.svelte';
  import BentoStats from '$lib/components/sections/home/BentoStats.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { personSchema, websiteSchema } from '$lib/seo/jsonld';
  import { SITE } from '$lib/seo/site';

  let { data } = $props();
</script>

<SeoHead
  title={SITE.defaultTitle}
  description={SITE.description}
  path="/"
  type="profile"
  jsonLd={[personSchema(), websiteSchema()]}
/>

<main>
  <Hero />
  <Socials />
  <WorkHistory />
  <TypingTest />
  <FeaturedProjects />
  <BentoStats commits={data.commits} languages={data.languages} />
</main>

<style>
  main {
    animation: fadeIn 0.8s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
