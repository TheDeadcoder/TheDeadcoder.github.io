<script>
	import { benchmarks, properties, conformance } from './data.js';

	const broken = benchmarks.map((b) => conformance[b].filter((cell) => cell && cell[0] > 0).length);
	const heading = /** @type {Record<string, string>} */ ({ AIOpsLab: 'AIOps\u00adLab' });

	/** @type {HTMLDivElement | undefined} */
	let root = $state();
	/** @type {{ x: number, y: number, value: string, label: string } | null} */
	let tip = $state(null);

	/**
	 * @param {PointerEvent} event
	 * @param {string} benchmark
	 * @param {string} property
	 * @param {number[]} cell
	 */
	function show(event, benchmark, property, cell) {
		if (!root) return;
		const box = root.getBoundingClientRect();
		const [k, n] = cell;
		tip = {
			x: Math.min(Math.max(event.clientX - box.left, 100), box.width - 100),
			y: event.clientY - box.top,
			value: `Broken in ${k} of ${n} tasks (${Math.round((100 * k) / n)}%)`,
			label: `${benchmark} · ${property}`
		};
	}
</script>

<div class="conformance" bind:this={root}>
	<table>
		<caption class="sr-only">
			Tasks where each benchmark's grader breaks each property, out of the tasks measured
		</caption>
		<thead>
			<tr>
				<th scope="col" class="corner">A good grader…</th>
				{#each benchmarks as benchmark (benchmark)}
					<th scope="col">{heading[benchmark] ?? benchmark}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each properties as property, p (property)}
				<tr>
					<th scope="row">{property}</th>
					{#each benchmarks as benchmark (benchmark)}
						{@const cell = conformance[benchmark][p]}
						{#if cell}
							<td
								class:none={cell[0] === 0}
								style="--share: {cell[0] / cell[1]}"
								onpointermove={(event) => show(event, benchmark, property, cell)}
								onpointerleave={() => (tip = null)}
							>
								<strong>{cell[0]}</strong>/{cell[1]}
							</td>
						{:else}
							<td class="na"><span aria-hidden="true">–</span><span class="sr-only">not measured</span></td>
						{/if}
					{/each}
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th scope="row">Properties broken</th>
				{#each broken as count, i (benchmarks[i])}
					<td>{count} of 8</td>
				{/each}
			</tr>
		</tfoot>
	</table>

	{#if tip}
		<div class="tip" style="left: {tip.x}px; top: {tip.y}px" aria-hidden="true">
			<strong>{tip.value}</strong>
			<span>{tip.label}</span>
		</div>
	{/if}
</div>

<style>
	.conformance {
		--viz-err: #eb6834;
		--reach: 86%;
		position: relative;
	}

	/* Dark fills stop short of the full hue so the cell numbers keep 4.5:1. */
	:global(.dark) .conformance {
		--viz-err: #d95926;
		--reach: 61%;
	}

	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 2px;
		table-layout: fixed;
	}

	th {
		font-weight: 500;
		color: var(--ink);
	}

	thead th {
		padding: 0 0.125rem 0.375rem;
		font-size: 0.6875rem;
		font-weight: 600;
		line-height: 1.2;
		vertical-align: bottom;
	}

	thead .corner {
		width: 6.5rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: left;
	}

	tbody th,
	tfoot th {
		padding-right: 0.5rem;
		font-size: 0.75rem;
		line-height: 1.25;
		text-align: left;
	}

	tbody td {
		height: 2.5rem;
		border-radius: 6px;
		background: color-mix(
			in oklab,
			var(--viz-err) calc(14% + var(--share) * var(--reach)),
			var(--surface)
		);
		color: var(--ink);
		font-size: 0.75rem;
		font-variant-numeric: tabular-nums;
		text-align: center;
		transition: box-shadow 120ms;
	}

	tbody td strong {
		font-weight: 600;
	}

	tbody td:not(.na):hover {
		box-shadow: inset 0 0 0 1.5px var(--ink);
	}

	tbody td.none {
		background: var(--surface-2);
		color: var(--ink-muted);
	}

	tbody td.na {
		background: none;
		box-shadow: inset 0 0 0 1px var(--line);
		color: var(--ink-muted);
	}

	tfoot th,
	tfoot td {
		padding-top: 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink);
	}

	tfoot td {
		text-align: center;
		font-variant-numeric: tabular-nums;
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

	@media (min-width: 40rem) {
		thead th {
			font-size: 0.8125rem;
		}

		thead .corner {
			width: 11rem;
		}

		tbody th,
		tfoot th,
		tbody td,
		tfoot td {
			font-size: 0.8125rem;
		}

		tbody td {
			height: 2.75rem;
		}
	}
</style>
