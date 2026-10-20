<script>
	// The post's idea in two grids: one history of tests (rows) over builds (columns), as a replay shows it
	// and as a selector that only learns from the tests it ran sees it.
	const TESTS = 7;
	const BUILDS = 12;
	const fails = new Set(['2-5', '4-8', '5-10', '1-9', '6-3']);
	const ran = (/** @type {number} */ t, /** @type {number} */ b) =>
		b < 2 || t === 0 || (t * 7 + b * 3) % 5 < 2 || t === 2;

	const cells = Array.from({ length: TESTS * BUILDS }, (_, i) => {
		const t = Math.floor(i / BUILDS);
		const b = i % BUILDS;
		return { fail: fails.has(`${t}-${b}`), ran: ran(t, b) };
	});

	const panels = [
		{ label: 'What the replay shows', faithful: false },
		{ label: 'What the selector sees', faithful: true }
	];
</script>

<div class="cover" aria-hidden="true">
	{#each panels as panel (panel.label)}
		<div class="panel">
			<div class="grid-cells" style="--cols: {BUILDS}">
				{#each cells as cell, i (i)}
					<span
						class="cell"
						class:fail={cell.fail && (!panel.faithful || cell.ran)}
						class:unseen={panel.faithful && !cell.ran}
						class:lost={panel.faithful && !cell.ran && cell.fail}
					></span>
				{/each}
			</div>
			<span class="label">{panel.label}</span>
		</div>
	{/each}
</div>

<style>
	.cover {
		--viz-err: #eb6834;
		--cell: clamp(5px, min(5.4cqh, 3.3cqw), 15px);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 6cqw, 2.25rem);
		width: 100%;
		height: 100%;
		padding: 0.75rem;
		container-type: size;
	}

	:global(.dark) .cover {
		--viz-err: #d95926;
	}

	.panel {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.grid-cells {
		display: grid;
		grid-template-columns: repeat(var(--cols), var(--cell));
		gap: 2px;
	}

	.cell {
		width: var(--cell);
		height: var(--cell);
		border-radius: 2px;
		background: color-mix(in oklab, var(--ink-muted) 28%, var(--surface));
	}

	.cell.fail {
		background: var(--viz-err);
	}

	.cell.unseen {
		background: transparent;
		box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--ink-muted) 55%, transparent);
	}

	.cell.lost {
		box-shadow: inset 0 0 0 1.5px var(--viz-err);
	}

	.label {
		margin-top: 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}
</style>
