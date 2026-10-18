<script>
	import Icon from './Icon.svelte';
	import TabBar from './TabBar.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { page } from '$app/state';
	import { site } from '$data/site.js';
	import { setTab, DEFAULT_TAB } from '$lib/tabs.svelte.js';

	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<header
	class="no-print sticky top-0 z-50 border-b transition-colors duration-200
		{scrolled ? 'border-line bg-bg/95 backdrop-blur-xl' : 'border-transparent bg-bg'}"
>
	<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-14 items-center justify-between gap-4">
			<a
				href="/"
				onclick={(e) => {
					if (page.url.pathname !== '/') return;
					e.preventDefault();
					setTab(DEFAULT_TAB, { scroll: false });
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
				class="group flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
			>
				<span
					class="grid size-7 place-items-center rounded-md bg-ink font-mono text-[12px] text-bg transition-transform duration-200 group-hover:scale-105"
					aria-hidden="true">NS</span
				>
				<span class="hidden sm:inline">{site.name}</span>
			</a>

			<div class="flex items-center gap-2">
				<a
					href={site.resume}
					target="_blank"
					rel="noopener"
					class="hidden items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
				>
					<Icon name="file" size={15} />
					Résumé
				</a>
				<ThemeToggle />
				<a
					href="#contact"
					class="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[13px] font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
				>
					Get in touch
				</a>
			</div>
		</div>

		<div class="-mx-1 border-t border-line/60 py-1.5">
			<TabBar />
		</div>
	</div>
</header>
