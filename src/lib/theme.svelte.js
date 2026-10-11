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

	// Switch every colour in the same frame. The header, links and buttons have colour
	// transitions, so without this they fade in after the page background has flipped.
	const freeze = document.createElement('style');
	freeze.textContent = '*,*::before,*::after{transition:none!important}';
	document.head.append(freeze);
	document.documentElement.classList.toggle('dark', next === 'dark');
	void document.documentElement.offsetHeight;
	freeze.remove();

	// Keep the browser's own bar on the chosen theme, not just the OS one.
	for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
		meta.setAttribute('content', next === 'dark' ? '#0e1715' : '#f2f4f3');
	}
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
