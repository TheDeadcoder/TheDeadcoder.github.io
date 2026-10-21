<script>
	// Probability that a group of eight correct attempts shows reward variance under independent grader
	// slips at rate q: 1 - (1 - q)^8 - q^8. Shared slips give 0. Measured: 2,080 of 3,726 independent
	// groups at q = 0.10, and 0 of 3,989 paired groups.
	const G = 8;
	const QMAX = 0.25;
	const MEASURED = 0.558;
	const fake = (/** @type {number} */ q) => 1 - (1 - q) ** G - q ** G;

	const line = Array.from({ length: 101 }, (_, i) => {
		const q = (i / 100) * QMAX;
		return `${i ? 'L' : 'M'}${((q / QMAX) * 100).toFixed(2)} ${(100 - fake(q) * 100).toFixed(2)}`;
	}).join(' ');
	const xTicks = [0, 0.05, 0.1, 0.15, 0.2, 0.25];
	const yTicks = [0, 0.25, 0.5, 0.75, 1];
	const examples = [0.02, 0.05, 0.1];

	let q = $state(0.1);
	let share = $derived(fake(q));

	const rate = (/** @type {number} */ v) => `${+(100 * v).toFixed(1)}%`;
	const whole = (/** @type {number} */ v) => `${Math.round(100 * v)}%`;
	const left = (/** @type {number} */ v) => (v / QMAX) * 100;

	/** @param {PointerEvent} event */
	function track(event) {
		const box = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
		const ratio = Math.min(Math.max((event.clientX - box.left) / box.width, 0), 1);
		q = Math.round(ratio * QMAX * 200) / 200;
	}
</script>

<div class="spurious">
	<div class="legend" aria-hidden="true">
		<span><i class="key indep"></i>Independent slips</span>
		<span><i class="key paired"></i>Shared slips</span>
		<span><i class="ring"></i>Measured during training</span>
	</div>

	<p class="readout" aria-live="polite">
		At a {rate(q)} slip rate, <strong>{whole(share)}</strong> of correct groups look mixed with independent
		slips, and <strong>0%</strong> with shared slips.
	</p>

	<div class="plot">
		<div class="y" aria-hidden="true">
			{#each yTicks as tick (tick)}
				<span style="bottom: {tick * 100}%">{whole(tick)}</span>
			{/each}
		</div>
		<div class="canvas" role="presentation" onpointermove={track}>
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				{#each yTicks as tick (tick)}
					<line class="grid" x1="0" x2="100" y1={100 - tick * 100} y2={100 - tick * 100} />
				{/each}
				<line class="cross" x1={left(q)} x2={left(q)} y1="0" y2="100" />
				<path class="indep" d={line} />
				<line class="paired" x1="0" x2="100" y1="99.4" y2="99.4" />
			</svg>
			{#each examples as example (example)}
				<span class="tick-dot" style="left: {left(example)}%; bottom: {fake(example) * 100}%" aria-hidden="true"
				></span>
			{/each}
			<span class="ring measured" style="left: {left(0.1)}%; bottom: {MEASURED * 100}%" aria-hidden="true"></span>
			<span class="tag" style="left: {left(0.1)}%; bottom: {MEASURED * 100}%" aria-hidden="true"
				>55.8% measured</span
			>
			<span class="ring measured paired-ring" style="left: {left(0.1)}%; bottom: 0%" aria-hidden="true"></span>
			<span class="dot indep-dot" style="left: {left(q)}%; bottom: {share * 100}%" aria-hidden="true"></span>
			<span class="dot paired-dot" style="left: {left(q)}%; bottom: 0%" aria-hidden="true"></span>
		</div>
		<div></div>
		<div class="x" aria-hidden="true">
			{#each xTicks as tick (tick)}
				<span style="left: {left(tick)}%">{rate(tick)}</span>
			{/each}
		</div>
	</div>
	<p class="x-title" aria-hidden="true">Grader slip rate</p>

	<label class="slider">
		<span>Slip rate</span>
		<input type="range" min="0" max={QMAX} step="0.005" bind:value={q} />
		<output>{rate(q)}</output>
	</label>

	<div class="sr-only">
		<table>
			<caption>Share of all-correct groups of eight with fake disagreement</caption>
			<thead>
				<tr><th scope="col">Slip rate</th><th scope="col">Independent slips</th><th scope="col">Shared slips</th></tr>
			</thead>
			<tbody>
				{#each examples as example (example)}
					<tr><td>{rate(example)}</td><td>{whole(fake(example))}</td><td>0%</td></tr>
				{/each}
				<tr><td>10%, measured in training</td><td>55.8%</td><td>0%</td></tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.spurious {
		--viz-paired: #00785a;
		--plot: clamp(11rem, 34vw, 15rem);
	}

	:global(.dark) .spurious {
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
		width: 1rem;
		height: 2px;
		border-radius: 2px;
	}

	.key.indep {
		background: var(--ink-muted);
	}

	.key.paired {
		background: var(--viz-paired);
	}

	.legend .ring {
		position: static;
		transform: none;
	}

	.readout {
		margin-top: 0.875rem;
		font-size: 0.9375rem;
		line-height: 1.5;
		color: var(--ink);
	}

	.readout strong {
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.plot {
		display: grid;
		grid-template-columns: 2.5rem minmax(0, 1fr);
		margin-top: 1rem;
	}

	.y {
		position: relative;
		height: var(--plot);
	}

	.y span,
	.x span {
		position: absolute;
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.y span {
		right: 0.5rem;
		transform: translateY(50%);
	}

	.canvas {
		position: relative;
		height: var(--plot);
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

	.indep {
		stroke: var(--ink-muted);
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.paired {
		stroke: var(--viz-paired);
		stroke-width: 2.5;
		stroke-linecap: round;
	}

	.dot,
	.tick-dot,
	.ring {
		position: absolute;
		transform: translate(-50%, 50%);
		border-radius: 999px;
	}

	.dot {
		width: 0.625rem;
		height: 0.625rem;
		box-shadow: 0 0 0 2px var(--surface);
	}

	.indep-dot {
		background: var(--ink-muted);
	}

	.paired-dot {
		background: var(--viz-paired);
	}

	.tick-dot {
		width: 0.375rem;
		height: 0.375rem;
		background: var(--ink-muted);
	}

	.ring {
		display: inline-block;
		width: 1.125rem;
		height: 1.125rem;
		border: 2px solid var(--ink);
	}

	.legend .ring {
		width: 0.75rem;
		height: 0.75rem;
	}

	.paired-ring {
		border-color: var(--viz-paired);
	}

	.tag {
		position: absolute;
		transform: translate(0.75rem, 115%);
		padding-left: 0.25rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink);
		white-space: nowrap;
	}

	.x {
		position: relative;
		height: 1.5rem;
	}

	.x span {
		top: 0.375rem;
		transform: translateX(-50%);
	}

	.x-title {
		margin-left: 2.5rem;
		text-align: center;
		font-size: 0.75rem;
		color: var(--ink-muted);
	}

	.slider {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-top: 1rem;
		border-top: 1px solid var(--line);
		padding-top: 0.875rem;
		font-size: 0.875rem;
		color: var(--ink);
	}

	.slider input {
		flex: 1;
		accent-color: var(--viz-paired);
	}

	.slider output {
		min-width: 3rem;
		text-align: right;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
</style>
