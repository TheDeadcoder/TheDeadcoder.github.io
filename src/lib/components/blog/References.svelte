<script>
	/**
	 * Numbered references; cite them in the text with <a href="#ref-1">.
	 * @type {{ items: { authors: string, year: string, title: string, venue: string, href: string }[] }}
	 */
	let { items } = $props();
</script>

<ol class="space-y-3">
	{#each items as ref, i (ref.href)}
		<li
			id="ref-{i + 1}"
			class="grid scroll-mt-32 grid-cols-[1.75rem_minmax(0,1fr)] text-[15px] leading-relaxed text-ink-muted"
		>
			<span class="tabular-nums">{i + 1}.</span>
			<span>
				{ref.authors} ({ref.year}).
				<a
					href={ref.href}
					target="_blank"
					rel="noopener noreferrer"
					class="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
					>{ref.title}</a
				>. <em>{ref.venue}</em>.
			</span>
		</li>
	{/each}
</ol>
