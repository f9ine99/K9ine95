import type { HandleServerError } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const handleError: HandleServerError = ({ error, event, status, message }) => {
	const path = event.url.pathname;
	const cause = error instanceof Error ? error : new Error(String(error));

	console.error(`[handleError] ${status} ${path}`, message, cause);

	if (dev) {
		return { message: cause.message || message };
	}

	if (status === 404) {
		return { message: 'Page not found' };
	}

	return {
		message: status >= 500 ? 'Something went wrong' : message || 'Request failed'
	};
};
