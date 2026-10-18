<script>
	import '../app.css';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import Icon from '$components/Icon.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { initTheme } from '$lib/theme.svelte.js';
	import { initTabs, syncTab } from '$lib/tabs.svelte.js';

	let { children } = $props();
	let showTop = $state(false);

	$effect(() => initTheme());
	$effect(() => initTabs());

	// Coming home from a post (/#blog), open the right panel before it renders.
	beforeNavigate(({ from, to }) => {
		if (to?.url.pathname === '/' && from?.url.pathname !== '/') syncTab(to.url.hash);
	});
</script>

<svelte:window onscroll={() => (showTop = window.scrollY > 600)} />

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-contrast"
>
	Skip to content
</a>

<div class="flex min-h-screen flex-col">
	<Header />
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>

<button
	type="button"
	onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
	aria-label="Back to top"
	class="no-print fixed right-5 bottom-5 z-40 grid size-10 place-items-center rounded-full border border-line bg-surface text-ink-muted shadow-lg transition-all duration-200 hover:text-ink
		{showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}"
>
	<Icon name="arrowUp" size={17} />
</button>
