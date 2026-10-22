<script>
	import { selectors } from './data.js';

	const TOTAL = 49;
	const ticks = [0, 0.25, 0.5, 0.75, 1];
	// Where each direct label sits relative to its point, so that neighbours do not collide.
	const placement = /** @type {Record<string, 'right' | 'left'>} */ ({
		pr: 'right',
		namerts: 'left',
		line: 'right',
		file: 'right',
		full: 'left'
	});

	/** @type {string | null} */
	let active = $state(null);

	const pct = (/** @type {number} */ value) => `${Math.round(value * 100)}%`;
	const x = (/** @type {number} */ share) => share * 100;
	const y = (/** @type {number} */ caught) => (caught / TOTAL) * 100;
</script>

<div class="scatter">
	<div class="legend" aria-hidden="true">
		<span><i class="key flip"></i>What most pipelines run</span>
		<span><i class="key neutral"></i>Test selection</span>
		<span><i class="key good"></i>Run everything</span>
	</div>

	<div class="plot">
		<p class="y-title" aria-hidden="true">Flips caught</p>
		<div class="y" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span style="bottom: {tick * 100}%">{pct(tick)}</span>
			{/each}
		</div>
		<div class="canvas">
			{#each ticks as tick (tick)}
				<span class="h-line" style="bottom: {tick * 100}%" aria-hidden="true"></span>
				<span class="v-line" style="left: {tick * 100}%" aria-hidden="true"></span>
			{/each}

			{#each selectors as s (s.id)}
				<button
					type="button"
					class="point {s.tone}"
					class:active={active === s.id}
					style="left: {x(s.share)}%; bottom: {y(s.caught)}%"
					aria-label="{s.label}: catches {s.caught} of {TOTAL} flips at {pct(s.share)} of full-suite test time"
					onpointerenter={() => (active = s.id)}
					onpointerleave={() => (active = null)}
					onfocus={() => (active = s.id)}
					onblur={() => (active = null)}
				>
					<span class="dot"></span>
				</button>
				<span
					class="label {placement[s.id]}"
					style="left: {x(s.share)}%; bottom: {y(s.caught)}%"
					aria-hidden="true"
				>
					<strong>{s.label}</strong>
					<span>{s.caught} of {TOTAL}</span>
				</span>
				{#if active === s.id}
					<span
						class="tip"
						class:flipside={s.share > 0.6}
						style="left: {x(s.share)}%; bottom: {y(s.caught)}%"
						aria-hidden="true"
					>
						<strong>{pct(s.share)}</strong> of full-suite test time
					</span>
				{/if}
			{/each}
		</div>
		<div></div>
		<div class="x" aria-hidden="true">
			{#each ticks as tick (tick)}
				<span style="left: {tick * 100}%">{pct(tick)}</span>
			{/each}
		</div>
	</div>
	<p class="x-title" aria-hidden="true">Test time, as a share of running the full suite</p>

	<div class="sr-only">
		<table>
			<caption>Flips caught by each check, and the test time it takes</caption>
			<thead>
				<tr>
					<th scope="col">Check</th>
					<th scope="col">Flips caught (of {TOTAL})</th>
					<th scope="col">Share of full-suite test time</th>
				</tr>
			</thead>
			<tbody>
				{#each selectors as s (s.id)}
					<tr>
						<th scope="row">{s.label}</th>
						<td>{s.caught}</td>
						<td>{pct(s.share)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.scatter {
		--viz-good: #00785a;
		--viz-flip: #eb6834;
		--viz-neutral: var(--ink-muted);
		--plot: 15rem;
	}

	:global(.dark) .scatter {
		--viz-good: #3aa880;
		--viz-flip: #d95926;
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

	.key {
		display: inline-block;
		width: 0.625rem;
		height: 0.625rem;
		border-radius: 999px;
	}

	.key.good,
	.point.good .dot {
		background: var(--viz-good);
	}

	.key.flip,
	.point.flip .dot {
		background: var(--viz-flip);
	}

	.key.neutral,
	.point.neutral .dot {
		background: var(--viz-neutral);
	}

	.plot {
		display: grid;
		grid-template-columns: 2.75rem minmax(0, 1fr);
		grid-template-rows: auto var(--plot) 1.75rem;
		margin-top: 1.25rem;
		margin-right: 0.75rem;
	}

	.y-title {
		grid-column: 1 / -1;
		margin-bottom: 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}

	.y,
	.x {
		position: relative;
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.y span {
		position: absolute;
		right: 0.625rem;
		transform: translateY(50%);
	}

	.x span {
		position: absolute;
		top: 0.5rem;
		transform: translateX(-50%);
	}

	.canvas {
		position: relative;
	}

	.h-line,
	.v-line {
		position: absolute;
		background: var(--line);
	}

	.h-line {
		inset-inline: 0;
		height: 1px;
	}

	.v-line {
		inset-block: 0;
		width: 1px;
	}

	.point {
		position: absolute;
		z-index: 2;
		display: grid;
		place-items: center;
		width: 1.75rem;
		height: 1.75rem;
		transform: translate(-50%, 50%);
		border-radius: 999px;
		cursor: default;
	}

	.dot {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 999px;
		box-shadow: 0 0 0 2px var(--surface);
		transition: transform 0.2s ease;
	}

	.point.active .dot,
	.point:focus-visible .dot {
		transform: scale(1.3);
	}

	.label {
		position: absolute;
		z-index: 1;
		display: flex;
		flex-direction: column;
		transform: translateY(50%);
		font-size: 0.75rem;
		line-height: 1.25;
		white-space: nowrap;
		pointer-events: none;
	}

	.label strong {
		font-weight: 600;
		color: var(--ink);
	}

	.label span {
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.label.right {
		margin-left: 0.875rem;
	}

	.label.left {
		align-items: flex-end;
		translate: calc(-100% - 0.875rem) 0;
	}

	.tip {
		position: absolute;
		z-index: 3;
		margin: 0 0 1.25rem 0.75rem;
		border: 1px solid var(--line);
		border-radius: 0.5rem;
		background: var(--surface);
		padding: 0.375rem 0.625rem;
		font-size: 0.75rem;
		color: var(--ink-muted);
		white-space: nowrap;
		box-shadow: 0 4px 14px hsl(var(--shadow-color) / 0.18);
		pointer-events: none;
	}

	.tip.flipside {
		translate: calc(-100% - 1.5rem) 0;
	}

	.tip strong {
		font-weight: 600;
		color: var(--ink);
	}

	.x-title {
		margin-top: 0.25rem;
		text-align: center;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}
</style>
