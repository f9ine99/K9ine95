<script lang="ts">
  import { page } from '$app/state';
  import { projects } from '$lib/data/projects';
  import { sanitizeRichText } from '$lib/utils/sanitizeRichText';
  import ProjectBackLink from '$lib/components/projects/project-detail/ProjectBackLink.svelte';
  import ProjectHeroCard from '$lib/components/projects/project-detail/ProjectHeroCard.svelte';
  import ProjectOverview from '$lib/components/projects/project-detail/ProjectOverview.svelte';
  import ProjectNotFound from '$lib/components/projects/project-detail/ProjectNotFound.svelte';
  import SeoHead from '$lib/components/seo/SeoHead.svelte';
  import { breadcrumbSchema, projectSchema } from '$lib/seo/jsonld';
  import { metaDescription } from '$lib/seo/meta';

  const slug = page.params.slug;
  const project = projects.find((p) => p.slug === slug);
  const safePreviewDescription = $derived(
    project ? sanitizeRichText(project.preview.description) : ''
  );
  const safeLongDescription = $derived(project ? sanitizeRichText(project.longDescription) : '');
  const safeStory = $derived(project?.story ? sanitizeRichText(project.story) : '');

  const seoDescription = $derived(
    project
      ? metaDescription(project.preview.description, project.description, project.longDescription)
      : 'Project not found on this portfolio.'
  );

  const seoJsonLd = $derived(
    project
      ? [
          projectSchema(project),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: project.title, path: `/projects/${project.slug}` }
          ])
        ]
      : undefined
  );
</script>

<SeoHead
  title={project?.title ?? 'Project not found'}
  description={seoDescription}
  path={project ? `/projects/${project.slug}` : '/projects'}
  noindex={!project}
  jsonLd={seoJsonLd}
/>

{#if project}
  <main class="project-detail">
    <div class="project-detail__column">
      <ProjectBackLink />
      <ProjectHeroCard {project} {safePreviewDescription} />
      <ProjectOverview {project} {safeLongDescription} {safeStory} />
    </div>
  </main>
{:else}
  <ProjectNotFound />
{/if}

<style>
  .project-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10rem 2rem 5rem;
    position: relative;
  }
  @media (max-width: 768px) {
    .project-detail {
      padding: 9.5rem 1.25rem 6rem;
    }
  }

  @media (max-width: 480px) {
    .project-detail {
      padding: 9.5rem 1rem 5rem;
    }
  }

  .project-detail__column {
    width: 100%;
    max-width: var(--terminal-detail-frost-max-w);
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .project-detail__column :global(.back-link) {
    align-self: flex-start;
    padding-left: 0;
    margin-bottom: 1.75rem;
  }

  @media (max-width: 480px) {
    .project-detail__column :global(.back-link) {
      margin-bottom: 1.35rem;
    }
  }
</style>
