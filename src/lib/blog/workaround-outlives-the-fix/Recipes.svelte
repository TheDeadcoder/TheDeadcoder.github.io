<script>
	import { recipes } from './data.js';

	// Share of notes files with a labelled workaround after each shift, command-based guard.
	const series = [
		{ key: 'claude', label: 'Claude, over-blocking guard', values: recipes.claude },
		{ key: 'qwen', label: 'Qwen, over-blocking guard', values: recipes.qwen },
		{ key: 'repaired', label: 'Both models, repaired guard', values: recipes.repaired }
	];
	const ticks = [0, 0.25, 0.5, 0.75, 1];
	const last = recipes.shifts.length - 1;

	const x = (/** @type {number} */ i) => 6 + (i / last) * 88;
	const y = (/** @type {number} */ v) => (1 - v) * 100;
	const path = (/** @type {number[]} */ values) =>
		values.map((v, i) => `${i ? 'L' : 'M'}${x(i)} ${y(v).toFixed(2)}`).join(' ');
	const pct = (/** @type {number} */ v) => `${Math.round(v * 100)}%`;
</script>

<div class="recipes">
	<div class="legend" aria-hidden="true">
		{#each series as s (s.key)}
			<span><i class="key {s.key}"></i>{s.label}</span>
		{/each}
	</div>

	<div class="plot" aria-hidden="true">
		<div class="y">
			{#each ticks as tick (tick)}
				<span style="top: {y(tick)}%">{pct(tick)}</span>
			{/each}
		</div>
		<div class="canvas">
			<svg viewBox="0 0 100 100" preserveAspectRatio="none">
				{#each ticks as tick (tick)}
					<line class="gridline" x1="0" x2="100" y1={y(tick)} y2={y(tick)} />
				{/each}
				{#each [...series].reverse() as s (s.key)}
					<path class="line {s.key}" d={path(s.values)} />
				{/each}
			</svg>
			{#each series as s (s.key)}
				{#each s.values as v, i (i)}
					<span class="dot {s.key}" style="left: {x(i)}%; top: {y(v)}%"></span>
				{/each}
				{#if s.key !== 'repaired'}
					<span class="end {s.key}" style="top: {y(s.values[last])}%">{pct(s.values[last])}</span>
				{/if}
			{/each}
		</div>
		<div></div>
		<div class="x">
			{#each recipes.shifts as shift, i (shift)}
				<span style="left: {x(i)}%">Shift {shift}</span>
			{/each}
		</div>
	</div>

	<table class="sr-only">
		<caption>Share of notes files with a labelled workaround, by shift</caption>
		<thead>
			<tr>
				<th scope="col">Series</th>
				{#each recipes.shifts as shift (shift)}<th scope="col">Shift {shift}</th>{/each}
			</tr>
		</thead>
		<tbody>
			{#each series as s (s.key)}
				<tr>
					<th scope="row">{s.label}</th>
					{#each s.values as v, i (i)}<td>{pct(v)}</td>{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.recipes {
		--viz-a: #00785a;
		--viz-b: #eb6834;
		--viz-c: color-mix(in oklab, var(--ink-muted) 70%, var(--surface));
	}

	:global(.dark) .recipes {
		--viz-a: #3aa880;
		--viz-b: #d95926;
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
		width: 1rem;
		height: 2px;
		border-radius: 2px;
	}

	.key.claude {
		background: var(--viz-a);
	}

	.key.qwen {
		background: var(--viz-b);
	}

	.key.repaired {
		background: repeating-linear-gradient(90deg, var(--viz-c) 0 4px, transparent 4px 7px);
	}

	.plot {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		grid-template-rows: 11rem auto;
		margin-top: 1.25rem;
		padding-right: 2.75rem;
	}

	.y {
		position: relative;
	}

	.y span {
		position: absolute;
		right: 0.5rem;
		transform: translateY(-50%);
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.canvas {
		position: relative;
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.gridline {
		stroke: var(--line);
		stroke-width: 1;
		vector-effect: non-scaling-stroke;
	}

	.line {
		fill: none;
		stroke-width: 2;
		stroke-linejoin: round;
		vector-effect: non-scaling-stroke;
	}

	.line.claude {
		stroke: var(--viz-a);
	}

	.line.qwen {
		stroke: var(--viz-b);
	}

	.line.repaired {
		stroke: var(--viz-c);
		stroke-dasharray: 5 4;
	}

	.dot {
		position: absolute;
		width: 0.625rem;
		height: 0.625rem;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 0 2px var(--surface);
	}

	.dot.claude {
		border-radius: 999px;
		background: var(--viz-a);
	}

	.dot.qwen {
		border-radius: 2px;
		background: var(--viz-b);
	}

	.dot.repaired {
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--viz-c);
	}

	.end {
		position: absolute;
		left: calc(94% + 0.75rem);
		transform: translateY(-50%);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	.end.qwen {
		margin-top: 0.4rem;
	}

	.end.claude {
		margin-top: -0.4rem;
	}

	.x {
		position: relative;
		height: 1.75rem;
	}

	.x span {
		position: absolute;
		top: 0.5rem;
		transform: translateX(-50%);
		font-size: 0.75rem;
		color: var(--ink-muted);
		white-space: nowrap;
	}
</style>
