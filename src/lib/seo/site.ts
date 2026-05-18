import { env } from '$env/dynamic/public';

export const SITE_URL = (env.PUBLIC_SITE_URL ?? 'https://firaol.xyz').replace(/\/$/, '');

export const SITE = {
	name: 'Firaol Gemeda',
	shortName: 'Firaol Gemeda',
	tagline: 'Software Engineer & Cybersecurity Analyst',
	description:
		'Portfolio of Firaol Gemeda — software engineer and cybersecurity analyst at HamerAI. Projects in full-stack development, AI platforms, and security tooling.',
	defaultTitle: 'Firaol Gemeda — Software Engineer & Cybersecurity Analyst',
	ogImage: '/images/firaol.jpg',
	locale: 'en_US',
	twitter: '@k9ineP',
	email: 'firaolgemedabuliye@gmail.com',
	sameAs: [
		'https://github.com/f9ine99',
		'https://linkedin.com/in/k9ine95',
		'https://x.com/k9ineP',
		'https://t.me/K9ine95'
	]
} as const;

export function absoluteUrl(path = ''): string {
	const normalized = path.startsWith('/') ? path : path ? `/${path}` : '';
	return `${SITE_URL}${normalized}`;
}

export function pageTitle(title: string): string {
	if (title.includes(SITE.name)) return title;
	return `${title} | ${SITE.name}`;
}
