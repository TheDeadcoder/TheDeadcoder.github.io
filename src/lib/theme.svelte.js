import { browser } from '$app/environment';

const STORAGE_KEY = 'theme';

/** @type {{ value: 'light' | 'dark' }} */
export const theme = $state({ value: 'light' });

export function initTheme() {
	if (!browser) return;
	theme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

	// Follow the OS only while the user has not made an explicit choice.
	const mq = window.matchMedia('(prefers-color-scheme: dark)');
	const onChange = (/** @type {MediaQueryListEvent} */ e) => {
		if (localStorage.getItem(STORAGE_KEY)) return;
		apply(e.matches ? 'dark' : 'light');
	};
	mq.addEventListener('change', onChange);
	return () => mq.removeEventListener('change', onChange);
}

/** @param {'light'|'dark'} next */
function apply(next) {
	theme.value = next;
	document.documentElement.classList.toggle('dark', next === 'dark');
	document
		.querySelector('meta[name="theme-color"]:not([media])')
		?.setAttribute('content', next === 'dark' ? '#09090b' : '#fbfbfd');
}

export function toggleTheme() {
	const next = theme.value === 'dark' ? 'light' : 'dark';
	apply(next);
	try {
		localStorage.setItem(STORAGE_KEY, next);
	} catch {
		/* Storage unavailable; theme still applies for this session. */
	}
}
