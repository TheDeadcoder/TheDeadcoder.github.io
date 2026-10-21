<script>
	import { scores } from './data.js';

	// Each reward function's possible range on one shared scale, with its mean over the run.
	const domain = [-4, 5];
	const ticks = [-4, -2, 0, 2, 4];

	const at = (/** @type {number} */ value) => ((value - domain[0]) / (domain[1] - domain[0])) * 100;
	const bound = (/** @type {number} */ value) => (value < 0 ? `−${-value}` : value > 0 ? `+${value}` : '0');
	const mean = (/** @type {number} */ value) => (value < 0 ? `−${(-value).toFixed(2)}` : value.toFixed(2));
</script>

<div class="scores">
	<div class="legend" aria-hidden="true">
		<span><i class="swatch"></i>Possible range</span>
		<span><i class="dot"></i>Mean over the training run</span>
	</div>

	<ol>
		{#each scores as score (score.name)}
			<li>
				<div class="words">
					<p class="head">
						<span class="name">{score.name}</span>
						<span class="values">
							{bound(score.min)} to {bound(score.max)} · mean {mean(score.mean)}
						</span>
					</p>
					<p class="text">{score.text}</p>
				</div>
				<div class="scale" aria-hidden="true">
					{#each ticks as tick (tick)}
						<span class="grid-line" class:zero={tick === 0} style="--at: {at(tick)}"></span>
					{/each}
					<span class="range" style="--from: {at(score.min)}; --to: {at(score.max)}"></span>
					<i class="dot" style="--at: {at(score.mean)}"></i>
				</div>
			</li>
		{/each}
	</ol>

	<div class="axis-row" aria-hidden="true">
		<div class="scale axis">
			{#each ticks as tick (tick)}
				<span style="--at: {at(tick)}">{bound(tick)}</span>
			{/each}
		</div>
	</div>
</div>

<style>
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

	.swatch {
		display: inline-block;
		width: 1.25rem;
		height: 0.625rem;
		border-radius: 3px;
		background: color-mix(in oklab, var(--ink-muted) 32%, var(--surface));
	}

	ol {
		display: grid;
		gap: 1.125rem;
		margin-top: 1.25rem;
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0 0.75rem;
	}

	.name {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	.values {
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.text {
		margin-top: 0.125rem;
		font-size: 0.8125rem;
		line-height: 1.45;
		color: var(--ink-muted);
	}

	.scale {
		position: relative;
		height: 1.5rem;
		margin-top: 0.375rem;
	}

	.grid-line {
		position: absolute;
		inset-block: 0;
		left: calc(var(--at) * 1%);
		width: 1px;
		background: var(--line);
	}

	.grid-line.zero {
		background: var(--line-strong);
	}

	.range {
		position: absolute;
		top: 50%;
		left: calc(var(--from) * 1%);
		width: calc((var(--to) - var(--from)) * 1%);
		height: 0.625rem;
		transform: translateY(-50%);
		border-radius: 3px;
		background: color-mix(in oklab, var(--ink-muted) 32%, var(--surface));
	}

	.dot {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 0 2px var(--surface);
	}

	.scale .dot {
		position: absolute;
		top: 50%;
		left: calc(var(--at) * 1%);
		transform: translate(-50%, -50%);
	}

	.axis-row {
		margin-top: 0.25rem;
	}

	.axis {
		height: 1.25rem;
		margin-top: 0;
	}

	.axis span {
		position: absolute;
		top: 0.125rem;
		left: calc(var(--at) * 1%);
		transform: translateX(-50%);
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	@media (min-width: 40rem) {
		li,
		.axis-row {
			display: grid;
			grid-template-columns: minmax(0, 15rem) minmax(0, 1fr);
			align-items: center;
			gap: 1.5rem;
		}

		.axis-row .axis {
			grid-column: 2;
		}

		.scale {
			margin-top: 0;
		}
	}
</style>
