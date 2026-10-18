<script>
	// Asking rates from the post's first figure: what the rule asks for, and what
	// Qwen3-4B-Instruct-2507 did with the rule alone.
	const panels = [
		{ label: 'What the rule asks', cells: [100, 0, 0, 0] },
		{ label: 'What the agent did', cells: [61, 45, 44, 27] }
	];

	const tone = (/** @type {number} */ value) => (value >= 76 ? 'strong' : value >= 60 ? 'mid' : '');
</script>

<div class="flex size-full items-center justify-center gap-6 p-5 sm:gap-10" aria-hidden="true">
	{#each panels as panel (panel.label)}
		<div class="flex flex-col items-center">
			<div class="grid grid-cols-2 gap-[3px]">
				{#each panel.cells as value, i (i)}
					<span class="cell {tone(value)}" style="--fill: {6 + value * 0.94}%">{value}</span>
				{/each}
			</div>
			<span class="mt-3 text-xs font-medium text-ink-muted">{panel.label}</span>
		</div>
	{/each}
</div>

<style>
	/* 24px numbers count as large text, so mid-tone fills still clear contrast. */
	.cell {
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.25rem;
		border-radius: 6px;
		background: color-mix(in oklab, var(--accent) var(--fill), var(--surface));
		color: var(--ink);
		font-size: 1.5rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.cell.strong {
		color: var(--accent-contrast);
	}

	:global(.dark) .cell.mid {
		color: var(--accent-contrast);
	}

	@media (min-width: 40rem) {
		.cell {
			width: 4.25rem;
			height: 3.75rem;
		}
	}
</style>
