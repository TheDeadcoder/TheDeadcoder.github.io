<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Icon from '$components/Icon.svelte';

	/**
	 * The old site used one route per section. Those URLs are indexed and
	 * bookmarked, so map them onto the equivalent tab instead of 404-ing.
	 */
	const legacyRoutes = {
		education: 'education',
		experiences: 'experience',
		experience: 'experience',
		achievements: 'achievements',
		research_blogs: 'research',
		research: 'research',
		projects: 'projects',
		skill_certifications: 'skills',
		skills: 'skills',
		about: 'about',
		blog: 'blog',
		blogs: 'blog'
	};

	let redirecting = $state(false);

	onMount(() => {
		const slug = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
		const tab = legacyRoutes[slug];
		if (tab) {
			redirecting = true;
			window.location.replace(`/#${tab}`);
		}
	});
</script>

<svelte:head>
	<title>{page.status} | Nazmus Sakib</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section
	class="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center px-4 py-20 text-center"
>
	{#if redirecting}
		<p class="font-mono text-[13px] tracking-[0.16em] text-accent uppercase">Redirecting</p>
		<h1 class="mt-4 text-2xl font-semibold sm:text-3xl">Taking you to the right section…</h1>
		<p class="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
			This page moved into a tab on the main page.
		</p>
	{:else}
		<p class="font-mono text-[13px] tracking-[0.16em] text-accent uppercase">
			Error {page.status}
		</p>
		<h1 class="mt-4 text-3xl font-semibold sm:text-4xl">
			{page.status === 404 ? "This page doesn't exist" : 'Something went wrong'}
		</h1>
		<p class="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
			{page.status === 404
				? 'The portfolio lives entirely on one page now, with everything a tab away.'
				: (page.error?.message ?? 'An unexpected error occurred.')}
		</p>
	{/if}

	<a
		href="/"
		class="mt-7 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
	>
		<Icon name="arrowRight" size={16} />
		Back to the portfolio
	</a>
</section>
