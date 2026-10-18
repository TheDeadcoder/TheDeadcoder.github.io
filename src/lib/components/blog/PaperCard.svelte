<script>
	import { site } from '$data/site.js';
	import { isSettled } from '$lib/status.js';

	/**
	 * The paper a post is based on.
	 * @type {{
	 *   title: string,
	 *   authors: string[],
	 *   status: string,
	 *   statusText: string,
	 *   links: { label: string, href: string }[]
	 * }}
	 */
	let { title, authors, status, statusText, links } = $props();
</script>

<aside class="my-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
	<p class="text-[13px] font-medium text-ink-muted">Based on the paper</p>
	<p class="mt-1.5 font-serif text-lg leading-snug font-medium">{title}</p>
	<p class="mt-2 text-sm text-ink-muted">
		{#each authors as author, i (author)}{i > 0 ? ', ' : ''}<span
				class={author === site.name ? 'font-semibold text-ink' : ''}>{author}</span
			>{/each}
	</p>
	<p class="mt-1 inline-flex items-center gap-1.5 text-sm text-ink">
		<span
			aria-hidden="true"
			class="size-[7px] shrink-0 rounded-full {isSettled(status)
				? 'bg-accent'
				: 'border-[1.5px] border-accent'}"
		></span>
		{statusText}
	</p>
	{#if links.length}
		<p class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
			{#each links as link (link.href)}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
					>{link.label}</a
				>
			{/each}
		</p>
	{/if}
</aside>
