import { browser } from '$app/environment';

export const tabs = [
	{ id: 'about', label: 'About', icon: 'user' },
	{ id: 'research', label: 'Research', icon: 'beaker' },
	{ id: 'experience', label: 'Experience', icon: 'briefcase' },
	{ id: 'education', label: 'Education', icon: 'cap' },
	{ id: 'projects', label: 'Projects', icon: 'layers' },
	{ id: 'achievements', label: 'Achievements', icon: 'trophy' },
	{ id: 'skills', label: 'Skills', icon: 'sparkles' },
	{ id: 'blog', label: 'Blog', icon: 'book' },
];

const ids = tabs.map((t) => t.id);
export const DEFAULT_TAB = 'about';

export const tabState = $state({ active: DEFAULT_TAB });

/** @param {string} raw */
function normalise(raw) {
	const id = raw.replace(/^#\/?/, '').split('?')[0];
	return ids.includes(id) ? id : null;
}

/**
 * Switch tabs. Uses the hash purely as a deep-link handle; no route
 * navigation happens, so there is never a server round trip or a 404.
 *
 * @param {string} id
 * @param {{ push?: boolean, scroll?: boolean }} [opts]
 */
export function setTab(id, opts = {}) {
	const { push = true, scroll = true } = opts;
	if (!ids.includes(id) || tabState.active === id) return;

	tabState.active = id;

	if (!browser) return;

	if (push) {
		const url = id === DEFAULT_TAB ? window.location.pathname : `#${id}`;
		history.pushState({ tab: id }, '', url);
	}

	if (scroll) {
		const anchor = document.getElementById('panels');
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		// Also scroll when the panel top is only partly tucked under the sticky header.
		const offset = anchor ? parseFloat(getComputedStyle(anchor).scrollMarginTop) || 0 : 0;
		if (anchor && anchor.getBoundingClientRect().top < offset) {
			anchor.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
		}
	}
}

/**
 * Pick the tab named by a URL hash. Used when navigating to the home page from
 * another route (a blog post), before the panels render.
 *
 * @param {string} hash
 */
export function syncTab(hash) {
	tabState.active = normalise(hash) ?? DEFAULT_TAB;
}

/** Wire up deep links and browser history. Returns a teardown function. */
export function initTabs() {
	if (!browser) return () => {};

	const fromHash = normalise(window.location.hash);
	if (fromHash) {
		tabState.active = fromHash;
		// Land on the panel when someone opens a deep link.
		requestAnimationFrame(() => {
			document.getElementById('panels')?.scrollIntoView({ behavior: 'auto', block: 'start' });
		});
	}

	const onPop = () => {
		// Hash links on other routes (a post's references) are not tab switches.
		if (window.location.pathname !== '/') return;
		const id = normalise(window.location.hash) ?? DEFAULT_TAB;
		tabState.active = id;
	};

	window.addEventListener('popstate', onPop);
	window.addEventListener('hashchange', onPop);

	return () => {
		window.removeEventListener('popstate', onPop);
		window.removeEventListener('hashchange', onPop);
	};
}
