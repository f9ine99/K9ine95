<script lang="ts">
  import Hero from '$lib/components/sections/home/Hero.svelte';
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
  <WorkHistory />
  <TypingTest />
  <FeaturedProjects />
  <BentoStats commits={data.commits} languages={data.languages} />
</main>
