<script>
	import { curves, steps } from './data.js';

	const series = /** @type {const} */ ([
		{ key: 'paired', label: 'Paired' },
		{ key: 'independent', label: 'Independent' },
		{ key: 'clean', label: 'Trained without noise' }
	]);
	const last = steps.length - 1;

	/** @type {Record<string, number | null>} */
	let active = $state({});

	const x = (/** @type {number} */ i) => steps[i];
	/** @param {(typeof curves)[number]} panel @param {number} value */
	const y = (panel, value) => ((panel.domain[1] - value) / (panel.domain[1] - panel.domain[0])) * 100;
	/** @param {(typeof curves)[number]} panel @param {'paired' | 'independent' | 'clean'} key */
	const path = (panel, key) =>
		panel[key].map((value, i) => `${i ? 'L' : 'M'}${x(i)} ${y(panel, value).toFixed(2)}`).join(' ');
	const pct = (/** @type {number} */ value) => `${(100 * value).toFixed(1)}%`;

	/** @param {PointerEvent} event @param {string} id */
	function track(event, id) {
		const box = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
		const ratio = (event.clientX - box.left) / box.width;
		active[id] = Math.min(Math.max(Math.round(ratio * last), 0), last);
	}

	/** @param {KeyboardEvent} event @param {string} id */
	function step(event, id) {
		const now = active[id] ?? last;
		const moves = /** @type {Record<string, number>} */ ({
			ArrowRight: now + 1,
			ArrowUp: now + 1,
			ArrowLeft: now - 1,
			ArrowDown: now - 1,
			Home: 0,
			End: last
		});
		if (event.key in moves) {
			event.preventDefault();
			active[id] = Math.min(Math.max(moves[event.key], 0), last);
		}
	}
</script>

<div class="curves">
	<div class="legend" aria-hidden="true">
		{#each series as s (s.key)}
			<span><i class="key {s.key}"></i>{s.label}</span>
		{/each}
	</div>

	<div class="panels">
		{#each curves as panel (panel.id)}
			{@const i = active[panel.id] ?? last}
			<div
				class="panel"
				role="slider"
				tabindex="0"
				aria-label="{panel.title}, true success by training step"
				aria-valuemin={steps[0]}
				aria-valuemax={steps[last]}
				aria-valuenow={steps[i]}
				aria-valuetext="Step {steps[i]}: {series
					.map((s) => `${s.label.toLowerCase()} ${pct(panel[s.key][i])}`)
					.join(', ')}"
				onkeydown={(event) => step(event, panel.id)}
				onblur={() => (active[panel.id] = null)}
			>
				<p class="title">{panel.title}</p>
				<dl class="readout">
					<div>
						<dt class="sr-only">Training step</dt>
						<dd class="step">Step {steps[i]}</dd>
					</div>
					{#each series as s (s.key)}
						<div class="row">
							<dt class="sr-only">{s.label}</dt>
							<dd><i class="key {s.key}" aria-hidden="true"></i><strong>{pct(panel[s.key][i])}</strong>
								<span>{s.label.toLowerCase()}</span></dd
							>
						</div>
					{/each}
				</dl>

				<div class="plot">
					<div class="y" aria-hidden="true">
						{#each panel.ticks as tick (tick)}
							<span style="top: {y(panel, tick)}%">{Math.round(tick * 100)}%</span>
						{/each}
					</div>
					<div
						class="canvas"
						role="presentation"
						onpointermove={(event) => track(event, panel.id)}
						onpointerleave={() => (active[panel.id] = null)}
					>
						<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
							{#each panel.ticks as tick (tick)}
								<line class="grid" x1="0" x2="100" y1={y(panel, tick)} y2={y(panel, tick)} />
							{/each}
							<line class="cross" x1={x(i)} x2={x(i)} y1="0" y2="100" />
							{#each [...series].reverse() as s (s.key)}
								<path class="line {s.key}" d={path(panel, s.key)} />
							{/each}
						</svg>
						{#each series as s (s.key)}
							<span
								class="dot {s.key}"
								style="left: {x(i)}%; top: {y(panel, panel[s.key][i])}%"
								aria-hidden="true"
							></span>
						{/each}
					</div>
					<div></div>
					<div class="x" aria-hidden="true">
						{#each steps as s (s)}
							<span style="left: {s}%">{s}</span>
						{/each}
					</div>
				</div>
				<p class="x-title" aria-hidden="true">Training step</p>

				<div class="sr-only">
					<table>
						<caption>{panel.title}: true success (%)</caption>
						<thead>
							<tr>
								<th scope="col">Step</th>
								{#each series as s (s.key)}<th scope="col">{s.label}</th>{/each}
							</tr>
						</thead>
						<tbody>
							{#each steps as s, j (s)}
								<tr>
									<th scope="row">{s}</th>
									{#each series as r (r.key)}<td>{pct(panel[r.key][j])}</td>{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.curves {
		--viz-paired: #00785a;
		--viz-indep: var(--ink-muted);
		--viz-clean: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
		--plot: 9.5rem;
	}

	:global(.dark) .curves {
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

	.key {
		display: inline-block;
		width: 1rem;
		height: 2px;
		border-radius: 2px;
		vertical-align: middle;
	}

	.key.paired {
		background: var(--viz-paired);
	}

	.key.independent {
		background: var(--viz-indep);
	}

	.key.clean {
		background: var(--viz-clean);
	}

	.panels {
		display: grid;
		gap: 1.75rem 1.5rem;
		margin-top: 1.25rem;
	}

	@media (min-width: 48rem) {
		.panels {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	.panel {
		border-radius: 0.75rem;
		outline-offset: 6px;
	}

	.title {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--ink);
	}

	.readout {
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		line-height: 1.5;
	}

	.readout .step {
		color: var(--ink-muted);
	}

	.readout dd {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.readout strong {
		min-width: 3rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	.readout span {
		color: var(--ink-muted);
	}

	.plot {
		display: grid;
		grid-template-columns: 2.25rem minmax(0, 1fr);
		margin-top: 0.75rem;
	}

	.y {
		position: relative;
		height: var(--plot);
	}

	.y span,
	.x span {
		position: absolute;
		font-size: 0.6875rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.y span {
		right: 0.5rem;
		transform: translateY(-50%);
	}

	.canvas {
		position: relative;
		height: var(--plot);
		margin-right: 0.375rem;
		cursor: crosshair;
		touch-action: pan-y;
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	svg line,
	svg path {
		vector-effect: non-scaling-stroke;
		fill: none;
	}

	.grid {
		stroke: var(--line);
		stroke-width: 1;
	}

	.cross {
		stroke: var(--line-strong);
		stroke-width: 1;
	}

	.line {
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.line.paired {
		stroke: var(--viz-paired);
	}

	.line.independent {
		stroke: var(--viz-indep);
	}

	.line.clean {
		stroke: var(--viz-clean);
	}

	.dot {
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		transform: translate(-50%, -50%);
		border-radius: 999px;
		box-shadow: 0 0 0 2px var(--surface);
	}

	.dot.paired {
		background: var(--viz-paired);
	}

	.dot.independent {
		background: var(--viz-indep);
	}

	.dot.clean {
		background: var(--viz-clean);
	}

	.x {
		position: relative;
		height: 1.375rem;
		margin-right: 0.375rem;
	}

	.x span {
		top: 0.3125rem;
		transform: translateX(-50%);
	}

	.x-title {
		margin-left: 2.25rem;
		text-align: center;
		font-size: 0.6875rem;
		color: var(--ink-muted);
	}
</style>
