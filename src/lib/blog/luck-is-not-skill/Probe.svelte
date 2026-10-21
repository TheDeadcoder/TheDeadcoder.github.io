<script>
	import { probe } from './data.js';

	const DOMAIN = 70;
	const ticks = [0, 20, 40, 60];
	const top = (/** @type {number} */ cut) => 100 - (cut / DOMAIN) * 100;

	const panels = [
		{ id: 'flips', title: 'Grader flips', values: probe.flips },
		{ id: 'faults', title: 'Tool faults', values: probe.faults }
	].map((panel) => {
		const points = probe.checkpoints.map((c, i) => ({ ...c, cut: (1 - panel.values[i]) * 100 }));
		const cuts = points.map((p) => p.cut);
		const line = points
			.filter((p) => p.run === 'B')
			.map((p, i) => `${i ? 'L' : 'M'}${p.step} ${top(p.cut).toFixed(2)}`)
			.join(' ');
		return { ...panel, points, line, low: Math.min(...cuts), high: Math.max(...cuts) };
	});

	/** @type {Record<string, number | null>} */
	let active = $state({});

	/** @param {PointerEvent} event @param {(typeof panels)[number]} panel */
	function track(event, panel) {
		const box = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
		const px = ((event.clientX - box.left) / box.width) * 100;
		const py = ((event.clientY - box.top) / box.height) * 100;
		let best = 0;
		panel.points.forEach((p, i) => {
			const d = (p.step - px) ** 2 + (top(p.cut) - py) ** 2;
			const b = panel.points[best];
			if (d < (b.step - px) ** 2 + (top(b.cut) - py) ** 2) best = i;
		});
		active[panel.id] = best;
	}

	/** @param {KeyboardEvent} event @param {(typeof panels)[number]} panel */
	function step(event, panel) {
		const n = panel.points.length;
		const now = active[panel.id];
		const moves = /** @type {Record<string, number>} */ ({
			ArrowRight: (now ?? -1) + 1,
			ArrowLeft: (now ?? n) - 1,
			Home: 0,
			End: n - 1
		});
		if (event.key in moves) {
			event.preventDefault();
			active[panel.id] = Math.min(Math.max(moves[event.key], 0), n - 1);
		} else if (event.key === 'Escape') {
			active[panel.id] = null;
		}
	}
</script>

<div class="probe">
	<div class="legend" aria-hidden="true">
		<span><i class="dot b"></i>Run B, every checkpoint</span>
		<span><i class="dot a"></i>Run A, two checkpoints</span>
	</div>

	<div class="panels">
		{#each panels as panel (panel.id)}
			{@const point = active[panel.id] == null ? null : panel.points[active[panel.id] ?? 0]}
			<div
				class="panel"
				role="slider"
				tabindex="0"
				aria-label="{panel.title}: how much lower gradient noise is with pairing, by checkpoint"
				aria-valuemin={0}
				aria-valuemax={panel.points.length - 1}
				aria-valuenow={active[panel.id] ?? 0}
				aria-valuetext={point
					? `Run ${point.run}, step ${point.step}: ${Math.round(point.cut)}% lower`
					: `${Math.round(panel.low)} to ${Math.round(panel.high)}% lower at every checkpoint`}
				onkeydown={(event) => step(event, panel)}
				onblur={() => (active[panel.id] = null)}
			>
				<p class="title">{panel.title}</p>
				<p class="readout">
					{#if point}
						Run {point.run}, step {point.step}: <strong>{Math.round(point.cut)}% lower</strong>
					{:else}
						<strong>{Math.round(panel.low)} to {Math.round(panel.high)}% lower</strong> at every checkpoint
					{/if}
				</p>

				<div class="plot">
					<div class="y" aria-hidden="true">
						{#each ticks as tick (tick)}
							<span style="top: {top(tick)}%">{tick}%</span>
						{/each}
					</div>
					<div
						class="canvas"
						role="presentation"
						onpointermove={(event) => track(event, panel)}
						onpointerleave={() => (active[panel.id] = null)}
					>
						<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
							{#each ticks as tick (tick)}
								<line class="grid" x1="0" x2="100" y1={top(tick)} y2={top(tick)} />
							{/each}
							{#if point}
								<line class="cross" x1={point.step} x2={point.step} y1="0" y2="100" />
							{/if}
							<path class="line" d={panel.line} />
						</svg>
						{#each panel.points as p, i (i)}
							<span
								class="dot {p.run === 'A' ? 'a' : 'b'}"
								class:on={active[panel.id] === i}
								style="left: {p.step}%; top: {top(p.cut)}%"
								aria-hidden="true"
							></span>
						{/each}
					</div>
					<div></div>
					<div class="x" aria-hidden="true">
						{#each [0, 20, 40, 60, 80, 100] as s (s)}
							<span style="left: {s}%">{s}</span>
						{/each}
					</div>
				</div>
				<p class="x-title" aria-hidden="true">Training step of the checkpoint</p>

				<div class="sr-only">
					<table>
						<caption>{panel.title}: how much lower the gradient covariance trace is with pairing</caption>
						<thead><tr><th scope="col">Checkpoint</th><th scope="col">Reduction</th></tr></thead>
						<tbody>
							{#each panel.points as p, i (i)}
								<tr><th scope="row">Run {p.run}, step {p.step}</th><td>{Math.round(p.cut)}%</td></tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.probe {
		--viz-paired: #00785a;
		--plot: 8.5rem;
	}

	:global(.dark) .probe {
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

	.legend .dot {
		position: static;
		transform: none;
	}

	.panels {
		display: grid;
		gap: 1.75rem 2rem;
		margin-top: 1.25rem;
	}

	@media (min-width: 40rem) {
		.panels {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	.panel {
		border-radius: 0.75rem;
		outline-offset: 6px;
	}

	.title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	.readout {
		margin-top: 0.25rem;
		min-height: 1.5em;
		font-size: 0.8125rem;
		color: var(--ink-muted);
	}

	.readout strong {
		font-weight: 600;
		color: var(--ink);
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
		margin-inline: 0.375rem;
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
		stroke: var(--viz-paired);
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.dot {
		position: absolute;
		display: inline-block;
		width: 0.625rem;
		height: 0.625rem;
		transform: translate(-50%, -50%);
		border-radius: 999px;
		transition: transform 0.15s ease;
	}

	.dot.b {
		background: var(--viz-paired);
		box-shadow: 0 0 0 2px var(--surface);
	}

	.dot.a {
		border: 2px solid var(--viz-paired);
		background: var(--surface);
	}

	.dot.on {
		transform: translate(-50%, -50%) scale(1.4);
	}

	.x {
		position: relative;
		height: 1.375rem;
		margin-inline: 0.375rem;
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
