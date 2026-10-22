<script>
	import { example } from './data.js';

	// Illustration: attempt 2 of the example group is a flip. Each time the group comes up, it is
	// audited with probability Q; the corrected advantage averages out to the full-suite value.
	const Q = 0.2;
	const N = 1000;
	const STEP = 25;
	const mean = (/** @type {number[]} */ values) => values.reduce((s, v) => s + v, 0) / values.length;
	const cheap = example.pr[1] - mean(example.pr);
	const target = example.full[1] - mean(example.full);
	const audited = cheap + (target - cheap) / Q;
	const TOP = 0.75;
	const BOTTOM = -3.25;
	const levels = [cheap, target, audited];

	/** @param {number} seed */
	function generator(seed) {
		let state = seed >>> 0;
		return () => {
			state = (state + 0x6d2b79f5) >>> 0;
			let t = state;
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	let seed = $state(1);
	let run = $derived.by(() => {
		const next = generator(seed);
		/** @type {number[]} */
		const averages = [];
		/** @type {number[]} */
		const audits = [];
		let sum = 0;
		for (let n = 1; n <= N; n++) {
			const hit = next() < Q;
			if (hit) audits.push(n);
			sum += hit ? audited : cheap;
			averages.push(sum / n);
		}
		return { averages, audits };
	});

	/** @type {number | null} */
	let active = $state(null);
	let n = $derived(active ?? N);
	let auditsSoFar = $derived(run.audits.filter((a) => a <= n).length);

	const x = (/** @type {number} */ draw) => ((draw - 1) / (N - 1)) * 100;
	const y = (/** @type {number} */ value) => ((TOP - value) / (TOP - BOTTOM)) * 100;
	const signed = (/** @type {number} */ value) =>
		`${value > 0 ? '+' : value < 0 ? '−' : ''}${Number(Math.abs(value).toFixed(3))}`;
	const fixed = (/** @type {number} */ value) =>
		`${value > 0.005 ? '+' : value < -0.005 ? '−' : ''}${Math.abs(value).toFixed(2)}`;
	let path = $derived(
		run.averages.map((v, k) => `${k ? 'L' : 'M'}${x(k + 1).toFixed(2)} ${y(v).toFixed(2)}`).join(' ')
	);

	/** @param {PointerEvent} event */
	function track(event) {
		const box = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
		const ratio = (event.clientX - box.left) / box.width;
		active = Math.min(Math.max(Math.round(ratio * (N - 1)) + 1, 1), N);
	}

	/** @param {KeyboardEvent} event */
	function step(event) {
		const moves = /** @type {Record<string, number>} */ ({
			ArrowRight: n + STEP,
			ArrowUp: n + STEP,
			ArrowLeft: n - STEP,
			ArrowDown: n - STEP,
			Home: 1,
			End: N
		});
		if (event.key in moves) {
			event.preventDefault();
			active = Math.min(Math.max(moves[event.key], 1), N);
		}
	}
</script>

<div class="convergence">
	<div class="legend" aria-hidden="true">
		<span><i class="line flip"></i>PR’s tests only</span>
		<span><i class="line good"></i>Full suite</span>
		<span><i class="line ink"></i>Audited estimate, running average</span>
		<span><i class="tick"></i>An audit</span>
	</div>

	<div class="head">
		<dl class="readout" aria-live="polite">
			<div>
				<dt>Draws</dt>
				<dd>{n}</dd>
			</div>
			<div>
				<dt>Audits so far</dt>
				<dd>{auditsSoFar}</dd>
			</div>
			<div>
				<dt>Running average</dt>
				<dd>{fixed(run.averages[n - 1])}</dd>
			</div>
		</dl>
		<button type="button" class="again" onclick={() => (seed += 1)}>Draw again</button>
	</div>

	<div class="plot">
		<div class="y" aria-hidden="true">
			{#each levels as level (level)}
				<span style="top: {y(level)}%">{signed(level)}</span>
			{/each}
		</div>
		<div
			class="canvas"
			role="slider"
			tabindex="0"
			aria-label="Running average of the audited advantage over {N} draws"
			aria-valuemin={1}
			aria-valuemax={N}
			aria-valuenow={n}
			aria-valuetext="After {n} draws and {auditsSoFar} audits, the running average is {fixed(
				run.averages[n - 1]
			)}; the full suite gives {signed(target)} and the PR’s tests alone give {signed(cheap)}"
			onpointermove={track}
			onpointerleave={() => (active = null)}
			onkeydown={step}
			onblur={() => (active = null)}
		>
			<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
				<line class="grid" x1="0" x2="100" y1={y(audited)} y2={y(audited)} />
				<line class="ref flip" x1="0" x2="100" y1={y(cheap)} y2={y(cheap)} />
				<line class="ref good" x1="0" x2="100" y1={y(target)} y2={y(target)} />
				{#each run.audits as draw (draw)}
					<line
						class="audit"
						class:later={draw > n}
						x1={x(draw)}
						x2={x(draw)}
						y1={y(audited) - 2.5}
						y2={y(audited) + 2.5}
					/>
				{/each}
				<line class="cross" x1={x(n)} x2={x(n)} y1="0" y2="100" />
				<path class="average" d={path} />
			</svg>
			<span class="dot" style="left: {x(n)}%; top: {y(run.averages[n - 1])}%" aria-hidden="true"></span>
		</div>
		<div></div>
		<div class="x" aria-hidden="true">
			{#each [1, 250, 500, 750, 1000] as draw (draw)}
				<span style="left: {x(draw)}%">{draw}</span>
			{/each}
		</div>
	</div>
	<p class="x-title" aria-hidden="true">Times the group has come up</p>
</div>

<style>
	.convergence {
		--viz-good: #00785a;
		--viz-flip: #eb6834;
		--plot: 15rem;
	}

	:global(.dark) .convergence {
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

	.line {
		display: inline-block;
		width: 1rem;
		height: 2px;
		border-radius: 2px;
	}

	.line.flip {
		background: var(--viz-flip);
	}

	.line.good {
		background: var(--viz-good);
	}

	.line.ink {
		background: var(--ink);
	}

	.tick {
		display: inline-block;
		width: 2px;
		height: 0.75rem;
		border-radius: 1px;
		background: var(--ink-muted);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.75rem 1.5rem;
		margin-top: 1.25rem;
	}

	.readout {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
	}

	.readout dt {
		font-size: 0.75rem;
		color: var(--ink-muted);
	}

	.readout dd {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	.again {
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--surface-2);
		padding: 0.3125rem 0.875rem;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--ink);
		cursor: pointer;
		transition: border-color 0.2s;
	}

	.again:hover {
		border-color: var(--line-strong);
	}

	.plot {
		display: grid;
		grid-template-columns: 3.25rem minmax(0, 1fr);
		grid-template-rows: var(--plot) 1.75rem;
		margin-top: 1rem;
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
		transform: translateY(-50%);
	}

	.x span {
		position: absolute;
		top: 0.5rem;
		transform: translateX(-50%);
	}

	.canvas {
		position: relative;
		border-radius: 0.25rem;
		outline-offset: 4px;
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
	}

	.grid {
		stroke: var(--line);
		stroke-width: 1;
	}

	.ref {
		stroke-width: 2;
	}

	.ref.flip {
		stroke: var(--viz-flip);
	}

	.ref.good {
		stroke: var(--viz-good);
	}

	.audit {
		stroke: var(--ink-muted);
		stroke-width: 1.5;
		stroke-linecap: round;
	}

	.audit.later {
		opacity: 0.3;
	}

	.cross {
		stroke: var(--line-strong);
		stroke-width: 1;
	}

	.average {
		fill: none;
		stroke: var(--ink);
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.dot {
		position: absolute;
		width: 0.625rem;
		height: 0.625rem;
		transform: translate(-50%, -50%);
		border-radius: 999px;
		background: var(--ink);
		box-shadow: 0 0 0 2px var(--surface);
		pointer-events: none;
	}

	.x-title {
		margin-top: 0.25rem;
		text-align: center;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}
</style>
