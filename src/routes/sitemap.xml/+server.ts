import { projects } from '$lib/data/projects';
import { SITE_URL } from '$lib/seo/site';

const staticRoutes = [
	{ path: '', priority: '1.0', changefreq: 'weekly' },
	{ path: '/about', priority: '0.9', changefreq: 'monthly' },
	{ path: '/projects', priority: '0.9', changefreq: 'weekly' }
];

export function GET() {
	const projectRoutes = projects.map((project) => ({
		path: `/projects/${project.slug}`,
		priority: '0.8',
		changefreq: 'monthly'
	}));

	const urls = [...staticRoutes, ...projectRoutes]
		.map(
			({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
