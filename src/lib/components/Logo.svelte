<script>
	/**
	 * Renders a logo image, or a typographic monogram when no asset exists.
	 * @type {{ src?: string|null, name: string, size?: number, rounded?: string }}
	 */
	let { src = null, name, mark = null, size = 40, rounded = 'rounded-xl' } = $props();

	let initials = $derived.by(() => {
		if (mark) return mark;
		const words = name
			.replace(/[^\p{L}\p{N}\s]/gu, ' ')
			.split(/\s+/)
			.filter(Boolean);
		// One word ("Sluqe") reads better as two letters than one.
		return (words.length > 1 ? words.slice(0, 2).map((w) => w[0]).join('') : name.slice(0, 2))
			.toUpperCase();
	});
</script>

{#if src}
	<img
		{src}
		alt=""
		width={size}
		height={size}
		loading="lazy"
		decoding="async"
		class="{rounded} shrink-0 bg-surface-2 object-contain p-1 ring-1 ring-line"
		style="width:{size}px;height:{size}px"
	/>
{:else}
	<span
		aria-hidden="true"
		class="{rounded} grid shrink-0 place-items-center bg-accent-soft font-semibold tracking-tight text-accent ring-1 ring-line"
		style="width:{size}px;height:{size}px;font-size:{Math.round(size * 0.36)}px"
	>
		{initials}
	</span>
{/if}
