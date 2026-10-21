<script>
	import { finals } from './data.js';

	/** @param {(typeof finals)[number]} panel @param {number} value */
	const at = (panel, value) => ((value - panel.domain[0]) / (panel.domain[1] - panel.domain[0])) * 100;
	const fmt = (/** @type {number} */ value) => value.toFixed(1);
</script>

<div class="seeds">
	<div class="legend" aria-hidden="true">
		<span><i class="dot from"></i>Independent</span>
		<span><i class="dot to"></i>Paired</span>
	</div>

	<div class="panels">
		{#each finals as panel (panel.id)}
			<div class="panel">
				<p class="title">{panel.title}</p>
				<table>
					<caption class="sr-only">{panel.title}: final test success by seed, independent then paired</caption>
					<tbody>
						{#each panel.rows as row (row.label)}
							<tr class:mean={row.mean}>
								<th scope="row">{row.label}</th>
								<td class="track" aria-hidden="true">
									<div class="scale">
										{#each panel.ticks as tick (tick)}
											<span class="grid-line" style="--at: {at(panel, tick)}"></span>
										{/each}
										<span
											class="link"
											style="--from: {at(panel, Math.min(row.from, row.to))}; --to: {at(
												panel,
												Math.max(row.from, row.to)
											)}"
										></span>
										<i class="dot from" style="--at: {at(panel, row.from)}"></i>
										<i class="dot to" style="--at: {at(panel, row.to)}"></i>
									</div>
								</td>
								<td class="values">
									<span class="sr-only">Independent </span>{fmt(row.from)}%<span aria-hidden="true"
										>{' → '}</span
									><span class="sr-only">, paired </span><strong>{fmt(row.to)}%</strong>
								</td>
							</tr>
						{/each}
					</tbody>
					<tfoot aria-hidden="true">
						<tr>
							<td></td>
							<td>
								<div class="scale axis">
									{#each panel.ticks as tick (tick)}
										<span style="--at: {at(panel, tick)}">{tick}%</span>
									{/each}
								</div>
							</td>
							<td></td>
						</tr>
					</tfoot>
				</table>
			</div>
		{/each}
	</div>
</div>

<style>
	.seeds {
		--viz-paired: #00785a;
	}

	:global(.dark) .seeds {
		--viz-paired: #3aa880;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem 1.25rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
	}

	.legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.panels {
		display: grid;
		gap: 1.75rem;
		margin-top: 1.25rem;
	}

	.title {
		margin-bottom: 0.375rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	tbody th {
		width: 1%;
		padding: 0.25rem 0.75rem 0.25rem 0;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: left;
		white-space: nowrap;
	}

	tr.mean th,
	tr.mean .values strong {
		font-weight: 700;
		color: var(--ink);
	}

	tr.mean td,
	tr.mean th {
		border-top: 1px solid var(--line);
	}

	td {
		padding: 0;
	}

	.scale {
		position: relative;
		height: 2.25rem;
		margin-inline: 0.5rem;
	}

	.grid-line {
		position: absolute;
		inset-block: 0;
		left: calc(var(--at) * 1%);
		width: 1px;
		background: var(--line);
	}

	.link {
		position: absolute;
		top: 50%;
		left: calc(var(--from) * 1%);
		width: calc((var(--to) - var(--from)) * 1%);
		height: 2px;
		transform: translateY(-50%);
		background: var(--line-strong);
	}

	.dot {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 999px;
	}

	.scale .dot {
		position: absolute;
		top: 50%;
		left: calc(var(--at) * 1%);
		transform: translate(-50%, -50%);
	}

	.dot.from {
		border: 2px solid var(--ink-muted);
		background: var(--surface);
	}

	.dot.to {
		background: var(--viz-paired);
		box-shadow: 0 0 0 2px var(--surface);
	}

	.values {
		width: 1%;
		padding-left: 0.75rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.values strong {
		font-weight: 600;
		color: var(--ink);
	}

	.axis {
		height: 1.5rem;
	}

	.axis span {
		position: absolute;
		top: 0.375rem;
		left: calc(var(--at) * 1%);
		transform: translateX(-50%);
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}
</style>
