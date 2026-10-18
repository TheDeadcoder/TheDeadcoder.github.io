<script>
	/**
	 * A numbered figure for blog posts. `wide` lets it run past the text column on
	 * large screens.
	 * @type {{ children: import('svelte').Snippet, caption?: string, wide?: boolean }}
	 */
	let { children, caption = '', wide = false } = $props();
</script>

<figure class="figure my-10 {wide ? 'lg:-mx-20' : ''}">
	<div class="rounded-2xl border border-line bg-surface p-4 sm:p-6">
		{@render children()}
	</div>
	{#if caption}
		<figcaption class="mt-3 px-1 text-sm leading-relaxed text-ink-muted">{caption}</figcaption>
	{/if}
</figure>

<style>
	.figure {
		counter-increment: figure;
	}

	figcaption::before {
		content: 'Figure ' counter(figure) '. ';
		font-weight: 600;
		color: var(--ink);
	}
</style>
