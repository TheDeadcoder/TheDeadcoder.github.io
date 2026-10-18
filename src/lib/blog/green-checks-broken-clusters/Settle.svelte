<script>
	import { settle } from './data.js';

	const LIMIT = 600;
	const PROBLEMS = 8;
	const major = [0, 5, 10];
	const minor = [1, 2, 3, 4, 6, 7, 8, 9];

	const series = settle.map((s) => {
		const times = s.firstPass.filter((t) => t !== null).sort((a, b) => a - b);
		let line = `M0 ${PROBLEMS}`;
		times.forEach((t, i) => (line += ` H${t} V${PROBLEMS - i - 1}`));
		line += ` H${LIMIT}`;
		return { ...s, times, line, area: `${line} V${PROBLEMS} H0 Z` };
	});

	const passed = (/** @type {number[]} */ times, /** @type {number} */ t) =>
		times.filter((x) => x <= t).length;

	const summary = series
		.map((s) => `${s.label}: ${passed(s.times, 0)} of 8 right away, ${passed(s.times, 300)} within 5 minutes, ${passed(s.times, LIMIT)} within 10 minutes`)
		.join('. ');

	/** @type {number | null} */
	let t = $state(null);
	/** @type {number | null} */
	let active = $state(null);

	const clock = (/** @type {number} */ s) =>
		s < 60 ? `${s} s` : `${Math.floor(s / 60)} min${s % 60 ? ` ${s % 60} s` : ''}`;

	const at = (/** @type {number} */ s) =>
		`Within ${clock(s)}: ` + series.map((x) => `${x.label} ${passed(x.times, s)} of 8`).join(', ');

	/**
	 * @param {PointerEvent} event
	 * @param {number} i
	 */
	function track(event, i) {
		const box = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
		const x = Math.min(Math.max(event.clientX - box.left, 0), box.width);
		t = Math.round((x / box.width) * LIMIT);
		active = i;
	}

	/** @param {KeyboardEvent} event */
	function step(event) {
		const by = event.shiftKey ? 60 : 10;
		const moves = /** @type {Record<string, number>} */ ({
			ArrowRight: (t ?? 0) + by,
			ArrowUp: (t ?? 0) + by,
			ArrowLeft: (t ?? 0) - by,
			ArrowDown: (t ?? 0) - by,
			Home: 0,
			End: LIMIT
		});
		if (event.key === 'Escape') {
			t = null;
		} else if (event.key in moves) {
			event.preventDefault();
			t = Math.min(Math.max(moves[event.key], 0), LIMIT);
			active ??= 0;
		}
	}
</script>

<div
	class="settle"
	role="slider"
	aria-label="How long the grader may wait. {summary}"
	aria-valuemin={0}
	aria-valuemax={LIMIT}
	aria-valuenow={t ?? 0}
	aria-valuetext={t === null ? undefined : at(t)}
	tabindex="0"
	onkeydown={step}
	onfocus={() => {
		t ??= 300;
		active ??= 0;
	}}
	onblur={() => {
		t = null;
		active = null;
	}}
>
	{#each series as s, i (s.label)}
		<div class="panel {s.tone}">
			<p class="flex items-center gap-2 text-sm font-semibold text-ink">
				<i class="key" aria-hidden="true"></i>{s.label}
			</p>
			<p class="mt-0.5 text-[12.5px] leading-snug text-ink-muted">
				{passed(s.times, 0)} right away, {passed(s.times, 300)} within 5 min, {passed(s.times, LIMIT)} within 10
			</p>

			<div class="plot">
				<div class="y" aria-hidden="true">
					<span style="top: 0%">8</span>
					<span style="top: 50%">4</span>
					<span style="top: 100%">0</span>
				</div>
				<div
					class="canvas"
					role="presentation"
					onpointermove={(event) => track(event, i)}
					onpointerleave={() => {
						t = null;
						active = null;
					}}
				>
					<svg viewBox="0 0 {LIMIT} {PROBLEMS}" preserveAspectRatio="none" aria-hidden="true">
						{#each minor as m (m)}
							<line class="grid minor" x1={m * 60} x2={m * 60} y1="0" y2={PROBLEMS} />
						{/each}
						{#each major as m (m)}
							<line class="grid" x1={m * 60} x2={m * 60} y1="0" y2={PROBLEMS} />
						{/each}
						<line class="grid" x1="0" x2={LIMIT} y1="0" y2="0" />
						<line class="grid" x1="0" x2={LIMIT} y1={PROBLEMS / 2} y2={PROBLEMS / 2} />
						<path class="wash" d={s.area} />
						<line class="axis" x1="0" x2={LIMIT} y1={PROBLEMS} y2={PROBLEMS} />
						<path class="step" d={s.line} />
					</svg>
					<i class="end" style="top: {((PROBLEMS - s.times.length) / PROBLEMS) * 100}%" aria-hidden="true"></i>

					{#if t !== null}
						<span class="cursor" style="left: {(t / LIMIT) * 100}%" aria-hidden="true"></span>
					{/if}
					{#if t !== null && active === i}
						<div
							class="tip"
							style="left: {(t / LIMIT) * 100}%; --shift: {t < 150 ? '0%' : t > 450 ? '-100%' : '-50%'}"
							aria-hidden="true"
						>
							<span class="tip-head">Within {clock(t)}</span>
							{#each series as other (other.label)}
								<span class="tip-row {other.tone}">
									<i class="key"></i><strong>{passed(other.times, t)} of 8</strong>{other.label}
								</span>
							{/each}
						</div>
					{/if}
				</div>
				<div class="x" aria-hidden="true">
					{#each major as m (m)}
						<span style="left: {(m / 10) * 100}%">{m}{m === 10 ? ' min' : ''}</span>
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.settle {
		--viz-fix: #1baf7a;
		--viz-err: #eb6834;
		display: grid;
		gap: 1.75rem;
		border-radius: 0.75rem;
		outline: none;
	}

	:global(.dark) .settle {
		--viz-fix: #199e70;
		--viz-err: #d95926;
	}

	.settle:focus-visible {
		box-shadow: 0 0 0 2px var(--accent-ring);
	}

	.panel.fix {
		--series: var(--viz-fix);
	}

	.panel.err,
	.tip-row.err {
		--series: var(--viz-err);
	}

	.tip-row.fix {
		--series: var(--viz-fix);
	}

	.key {
		display: inline-block;
		width: 0.875rem;
		height: 2px;
		border-radius: 1px;
		background: var(--series);
	}

	.plot {
		position: relative;
		margin-top: 0.875rem;
		padding-left: 1.25rem;
	}

	.y {
		position: absolute;
		inset: 0 auto 1.5rem 0;
		width: 1.25rem;
	}

	.y span,
	.x span {
		position: absolute;
		font-size: 0.6875rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.y span {
		left: 0;
		transform: translateY(-50%);
	}

	.canvas {
		position: relative;
		height: 6.5rem;
		touch-action: pan-y;
	}

	svg {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.grid,
	.axis {
		vector-effect: non-scaling-stroke;
		stroke-width: 1px;
	}

	.grid {
		stroke: var(--line-strong);
	}

	.grid.minor {
		stroke: var(--line);
	}

	.axis {
		stroke: var(--line-strong);
	}

	.wash {
		fill: var(--series);
		opacity: 0.1;
	}

	.step {
		fill: none;
		stroke: var(--series);
		stroke-width: 2px;
		stroke-linejoin: round;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}

	.end {
		position: absolute;
		left: 100%;
		width: 0.5rem;
		height: 0.5rem;
		border-radius: 999px;
		background: var(--series);
		box-shadow: 0 0 0 2px var(--surface);
		transform: translate(-50%, -50%);
	}

	.cursor {
		position: absolute;
		inset-block: 0;
		width: 1px;
		background: var(--ink-muted);
		pointer-events: none;
	}

	.x {
		position: relative;
		height: 1.5rem;
	}

	.x span {
		top: 0.375rem;
		transform: translateX(-50%);
		white-space: nowrap;
	}

	.x span:first-child {
		transform: none;
	}

	.x span:last-child {
		transform: translateX(-100%);
	}

	.tip {
		position: absolute;
		bottom: calc(100% + 0.5rem);
		z-index: 10;
		display: grid;
		gap: 0.25rem;
		width: max-content;
		transform: translateX(var(--shift));
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

	.tip-head {
		font-weight: 600;
		color: var(--ink);
	}

	.tip-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.tip-row strong {
		min-width: 2.75rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	@media (min-width: 40rem) {
		.settle {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.5rem;
		}
	}
</style>
