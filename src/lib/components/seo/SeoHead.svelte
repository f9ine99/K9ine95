<script lang="ts">
	import { absoluteUrl, pageTitle, SITE } from '$lib/seo/site';

	interface Props {
		title?: string;
		description?: string;
		path?: string;
		image?: string;
		type?: 'website' | 'article' | 'profile';
		noindex?: boolean;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	}

	let {
		title = SITE.defaultTitle,
		description = SITE.description,
		path = '',
		image = SITE.ogImage,
		type = 'website',
		noindex = false,
		jsonLd
	}: Props = $props();

	const resolvedTitle = $derived(pageTitle(title));
	const canonical = $derived(absoluteUrl(path));
	const ogImage = $derived(image.startsWith('http') ? image : absoluteUrl(image));
	const schemas = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
</script>

<svelte:head>
	<title>{resolvedTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}

	<meta name="author" content={SITE.name} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:title" content={resolvedTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={resolvedTitle} />
	<meta property="og:locale" content={SITE.locale} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content={SITE.twitter} />
	<meta name="twitter:creator" content={SITE.twitter} />
	<meta name="twitter:title" content={resolvedTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{#each schemas as schema (JSON.stringify(schema))}
		{@html `<script type="application/ld+json">${JSON.stringify(schema)}</script>`}
	{/each}
</svelte:head>
