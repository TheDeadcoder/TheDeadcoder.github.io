<script>
	import { usualChecks } from './data.js';

	const all = usualChecks.reduce(
		(sum, row) => ({ ...sum, caught: sum.caught + row.caught, missed: sum.missed + row.missed }),
		{ label: 'All four', caught: 0, missed: 0, total: true }
	);
	const rows = [...usualChecks, all];

	/** @type {HTMLDivElement | undefined} */
	let root = $state();
	/** @type {{ x: number, y: number, value: string, label: string } | null} */
	let tip = $state(null);

	/**
	 * @param {PointerEvent} event
	 * @param {{ label: string, caught: number, missed: number }} row
	 */
	function show(event, row) {
		if (!root) return;
		const box = root.getBoundingClientRect();
		const n = row.caught + row.missed;
		tip = {
			x: Math.min(Math.max(event.clientX - box.left, 100), box.width - 100),
			y: event.clientY - box.top,
			value: `${Math.round((100 * row.missed) / n)}% missed by the usual checks`,
			label: `${row.label} · ${row.caught} caught, ${row.missed} missed`
		};
	}
</script>

<div class="usual" bind:this={root}>
	<div class="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-ink-muted" aria-hidden="true">
		<span class="inline-flex items-center gap-2"><i class="swatch caught"></i>Caught by the usual checks</span>
		<span class="inline-flex items-center gap-2"><i class="swatch missed"></i>Missed by the usual checks</span>
	</div>

	<table>
		<caption class="sr-only">Tasks with at least one grading defect, by whether the usual checks catch it</caption>
		<thead class="sr-only">
			<tr>
				<th scope="col">Benchmark</th>
				<th scope="col">Caught and missed</th>
				<th scope="col">Missed, of all tasks with a defect</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.label)}
				<tr class:total={row.total}>
					<th scope="row">{row.label}</th>
					<td
						class="track"
						onpointermove={(event) => show(event, row)}
						onpointerleave={() => (tip = null)}
					>
						<div class="bar" aria-hidden="true">
							{#if row.caught}<span class="seg caught" style="flex-grow: {row.caught}"></span>{/if}
							<span class="seg missed" style="flex-grow: {row.missed}"></span>
						</div>
						<span class="sr-only">{row.caught} caught, {row.missed} missed</span>
					</td>
					<td class="value"><strong>{row.missed}</strong> of {row.caught + row.missed}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if tip}
		<div class="tip" style="left: {tip.x}px; top: {tip.y}px" aria-hidden="true">
			<strong>{tip.value}</strong>
			<span>{tip.label}</span>
		</div>
	{/if}
</div>

<style>
	.usual {
		--viz-err: #eb6834;
		--viz-context: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
		position: relative;
	}

	:global(.dark) .usual {
		--viz-err: #d95926;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th {
		width: 1%;
		padding: 0.25rem 0.875rem 0.25rem 0;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--ink);
		text-align: left;
		white-space: nowrap;
	}

	td {
		padding: 0;
	}

	.track {
		height: 2.25rem;
	}

	.bar {
		display: flex;
		gap: 2px;
		height: 0.875rem;
	}

	.seg {
		flex-basis: 0;
		transition: filter 120ms;
	}

	.track:hover .seg {
		filter: brightness(1.08);
	}

	.seg.caught {
		background: var(--viz-context);
	}

	.seg.missed {
		border-radius: 0 4px 4px 0;
		background: var(--viz-err);
	}

	.value {
		width: 1%;
		padding-left: 0.75rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.value strong {
		font-weight: 600;
		color: var(--ink);
	}

	tr.total th,
	tr.total td {
		border-top: 1px solid var(--line);
	}

	tr.total th {
		font-weight: 600;
	}

	.swatch {
		display: inline-block;
		width: 0.875rem;
		height: 0.625rem;
		border-radius: 2px;
	}

	.swatch.caught {
		background: var(--viz-context);
	}

	.swatch.missed {
		background: var(--viz-err);
	}

	.tip {
		position: absolute;
		z-index: 10;
		display: grid;
		gap: 0.125rem;
		min-width: 10rem;
		transform: translate(-50%, calc(-100% - 0.75rem));
		border: 1px solid var(--line);
		border-radius: 0.5rem;
		background: var(--surface);
		padding: 0.5rem 0.625rem;
		box-shadow: 0 6px 18px rgb(0 0 0 / 0.12);
		pointer-events: none;
		font-size: 0.75rem;
		line-height: 1.35;
		color: var(--ink-muted);
	}

	.tip strong {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
	}
</style>
