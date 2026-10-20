<script>
	import { flip } from './data.js';

	// The four orders ranked by escape (lower is better) under each replay, joined by a line per order.
	const ROW = 44;
	const byFull = [...flip].sort((a, b) => a.full - b.full);
	const byFaithful = [...flip].sort((a, b) => a.faithful - b.faithful);
	const y = (/** @type {number} */ rank) => ROW * (rank + 0.5);
	const ordinal = ['1st', '2nd', '3rd', '4th'];

	/** @type {string | null} */
	let active = $state(null);
	const dim = (/** @type {string} */ label) => active !== null && active !== label;
</script>

<div class="flip" role="group" aria-label="Ranking of four orders under a full and a faithful replay">
	<div class="mb-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-ink-muted" aria-hidden="true">
		<span class="inline-flex items-center gap-2"><i class="key history"></i>Recent failures first</span>
		<span class="inline-flex items-center gap-2"><i class="key learned"></i>Learned model</span>
		<span class="inline-flex items-center gap-2"><i class="key context"></i>Other orders</span>
	</div>

	<div class="bump" aria-hidden="true" style="--rows: {flip.length}; --row: {ROW}px">
		<p class="head left">Full replay</p>
		<span></span>
		<p class="head right">Faithful replay</p>

		<ol class="side left">
			{#each byFull as row, i (row.label)}
				<li
					class={row.tone}
					class:dim={dim(row.label)}
					onpointerenter={() => (active = row.label)}
					onpointerleave={() => (active = null)}
				>
					<span class="label"><span class="rank">{ordinal[i]}</span>{row.label}</span>
					<span class="value">{row.full.toFixed(1)}%</span>
					<i class="dot"></i>
				</li>
			{/each}
		</ol>

		<svg viewBox="0 0 100 {ROW * flip.length}" preserveAspectRatio="none">
			{#each flip as row (row.label)}
				<line
					class="{row.tone} {dim(row.label) ? 'dim' : ''}"
					x1="0"
					x2="100"
					y1={y(byFull.indexOf(row))}
					y2={y(byFaithful.indexOf(row))}
				/>
			{/each}
		</svg>

		<ol class="side right">
			{#each byFaithful as row, i (row.label)}
				<li
					class={row.tone}
					class:dim={dim(row.label)}
					onpointerenter={() => (active = row.label)}
					onpointerleave={() => (active = null)}
				>
					<i class="dot"></i>
					<span class="value">{row.faithful.toFixed(1)}%</span>
					<span class="label"><span class="rank">{ordinal[i]}</span>{row.label}</span>
				</li>
			{/each}
		</ol>
	</div>

	<table class="table-view">
		<caption class="sr-only">Escape at 20% of test time, and rank, under each replay</caption>
		<thead>
			<tr>
				<th scope="col"><span class="sr-only">Order</span></th>
				<th scope="col">Full replay</th>
				<th scope="col">Faithful replay</th>
			</tr>
		</thead>
		<tbody>
			{#each byFaithful as row (row.label)}
				<tr>
					<th scope="row" class={row.tone}><i class="key" aria-hidden="true"></i>{row.label}</th>
					<td>{row.full.toFixed(1)}%<span class="rank-after">{ordinal[byFull.indexOf(row)]}</span></td>
					<td>
						<strong>{row.faithful.toFixed(1)}%</strong><span class="rank-after"
							>{ordinal[byFaithful.indexOf(row)]}</span
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.flip {
		position: relative;
		--viz-history: #eb6834;
		--viz-learned: #1baf7a;
		--viz-context: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
	}

	:global(.dark) .flip {
		--viz-history: #d95926;
		--viz-learned: #199e70;
	}

	.history {
		--series: var(--viz-history);
	}

	.learned {
		--series: var(--viz-learned);
	}

	.context {
		--series: var(--viz-context);
	}

	.key {
		display: inline-block;
		width: 0.875rem;
		height: 2px;
		border-radius: 1px;
		background: var(--series);
	}

	.bump {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(3.5rem, 9rem) minmax(0, 1fr);
		grid-template-rows: auto calc(var(--rows) * var(--row));
		column-gap: 0;
	}

	.head {
		margin-bottom: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink-muted);
	}

	.head.left {
		text-align: right;
		padding-right: 0.75rem;
	}

	.head.right {
		padding-left: 0.75rem;
	}

	.side {
		display: grid;
		grid-template-rows: repeat(var(--rows), var(--row));
	}

	.side li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
		transition: opacity 150ms;
	}

	.side.left li {
		justify-content: flex-end;
		text-align: right;
	}

	.label {
		min-width: 0;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1.25;
		color: var(--ink);
	}

	.rank {
		margin-inline-end: 0.375rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.value {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.dot {
		flex-shrink: 0;
		width: 0.625rem;
		height: 0.625rem;
		border-radius: 999px;
		background: var(--series);
		box-shadow: 0 0 0 2px var(--surface);
	}

	.side.left .dot {
		margin-right: -0.3125rem;
	}

	.side.right .dot {
		margin-left: -0.3125rem;
	}

	svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	line {
		stroke: var(--series);
		stroke-width: 2px;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
		transition: opacity 150ms;
	}

	.dim,
	line.dim {
		opacity: 0.25;
	}

	/* Below 40rem the labels no longer fit beside the lines, so the table carries the figure. */
	.table-view {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}

	.table-view thead th {
		padding: 0 0 0.5rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink-muted);
		text-align: right;
	}

	.table-view tbody th {
		padding: 0.5rem 0;
		font-weight: 500;
		color: var(--ink);
		text-align: left;
	}

	.table-view tbody th .key {
		margin-right: 0.5rem;
		vertical-align: middle;
	}

	.table-view td {
		padding: 0.5rem 0 0.5rem 0.75rem;
		color: var(--ink);
		text-align: right;
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.table-view tbody tr + tr > * {
		border-top: 1px solid var(--line);
	}

	.table-view strong {
		font-weight: 600;
	}

	.rank-after {
		display: block;
		font-size: 0.75rem;
		color: var(--ink-muted);
	}

	@media (max-width: 39.99rem) {
		.bump {
			display: none;
		}
	}

	@media (min-width: 40rem) {
		.table-view {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip: rect(0 0 0 0);
			white-space: nowrap;
		}
	}
</style>
