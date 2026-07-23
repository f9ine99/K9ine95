import type { Project } from '$lib/data/projects';
import { SITE, SITE_URL, absoluteUrl } from '$lib/seo/site';
import { metaDescription } from '$lib/seo/meta';

function personRef() {
  return {
    '@type': 'Person' as const,
    name: SITE.name,
    url: SITE_URL
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    url: SITE_URL,
    image: absoluteUrl(SITE.ogImage),
    jobTitle: SITE.tagline,
    worksFor: {
      '@type': 'Organization',
      name: 'HamerAI',
      url: 'https://ethiohamerai.vercel.app'
    },
    email: `mailto:${SITE.email}`,
    sameAs: SITE.sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET'
    }
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE_URL,
    description: SITE.description,
    inLanguage: 'en',
    author: personRef()
  };
}

export function projectSchema(project: Project) {
  const path = `/projects/${project.slug}`;
  const description = metaDescription(project.preview.description, project.description);

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description,
    url: absoluteUrl(path),
    author: personRef(),
    ...(project.demoUrl ? { sameAs: project.demoUrl } : {})
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
