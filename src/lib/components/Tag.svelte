<script>
	/** @type {{ children: import('svelte').Snippet, tone?: 'default'|'accent' }} */
	let { children, tone = 'default' } = $props();
</script>

<span
	class="inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] leading-5 font-medium whitespace-nowrap
		{tone === 'accent'
		? 'border-transparent bg-accent-soft text-accent'
		: 'border-line bg-surface-2 text-ink-muted'}"
>
	{@render children()}
</span>
