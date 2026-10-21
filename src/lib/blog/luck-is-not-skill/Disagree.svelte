<script>
	import { disagreement } from './data.js';

	const MAX = 0.7;
	const ticks = [0, 0.2, 0.4, 0.6];
	const at = (/** @type {number} */ value) => (value / MAX) * 100;
	const pct = (/** @type {number} */ value) => `${Math.round(value * 100)}%`;
	const board = disagreement.leaderboard;
	const low = Math.min(...board);
	const high = Math.max(...board);
</script>

{#snippet grid()}
	{#each ticks as tick (tick)}
		<span class="grid-line" style="--at: {at(tick)}"></span>
	{/each}
{/snippet}

<div class="disagree">
	<p class="group">Open agents in τ-Dice, run four times at temperature 0</p>
	<dl>
		{#each disagreement.agents as agent (agent.label)}
			<div class="row">
				<dt>{agent.label}</dt>
				<dd class="scale" aria-hidden="true">
					{@render grid()}
					<span class="whisker" style="--from: {at(agent.interval[0])}; --to: {at(agent.interval[1])}"></span>
					<span
						class="mark agent"
						style="--at: {at(agent.value)}"
						data-label="{pct(agent.interval[0])} to {pct(agent.interval[1])}"
					></span>
				</dd>
				<dd class="value">
					<strong>{pct(agent.value)}</strong>
					<span class="sr-only">, 95% interval {pct(agent.interval[0])} to {pct(agent.interval[1])}</span>
				</dd>
			</div>
		{/each}
	</dl>

	<p class="group">Public leaderboard submissions, four trials each</p>
	<dl>
		<div class="row">
			<dt>9 submissions</dt>
			<dd class="scale" aria-hidden="true">
				{@render grid()}
				<span class="span" style="--from: {at(low)}; --to: {at(high)}"></span>
				{#each board as value, i (i)}
					<span class="mark board" style="--at: {at(value)}" data-label={pct(value)}></span>
				{/each}
			</dd>
			<dd class="value">
				<strong>{pct(low)}–{pct(high)}</strong>
				<span class="sr-only">: {board.map(pct).join(', ')}</span>
			</dd>
		</div>
	</dl>

	<div class="row axis-row" aria-hidden="true">
		<div class="scale axis">
			{#each ticks as tick (tick)}
				<span style="--at: {at(tick)}">{pct(tick)}</span>
			{/each}
		</div>
	</div>
	<p class="axis-title" aria-hidden="true">Tasks whose result changed between the four runs</p>
</div>

<style>
	.disagree {
		--viz-paired: #00785a;
	}

	:global(.dark) .disagree {
		--viz-paired: #3aa880;
	}

	.group {
		margin: 1rem 0 0.125rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink-muted);
	}

	.group:first-child {
		margin-top: 0;
	}

	.row {
		display: grid;
		grid-template-columns: 8.5rem minmax(0, 1fr) 5.5rem;
		grid-template-areas: 'label track value';
		align-items: center;
		column-gap: 0.75rem;
	}

	dt {
		grid-area: label;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--ink);
		white-space: nowrap;
	}

	.scale {
		grid-area: track;
		position: relative;
		height: 2.25rem;
		margin-inline: 0.5rem;
	}

	.value {
		grid-area: value;
		font-size: 0.8125rem;
		text-align: right;
		white-space: nowrap;
	}

	.value strong {
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 30rem) {
		.row {
			grid-template-columns: minmax(0, 1fr) auto;
			grid-template-areas:
				'label value'
				'track track';
			padding-top: 0.375rem;
		}

		.axis-row {
			padding-top: 0;
		}
	}

	.grid-line {
		position: absolute;
		inset-block: 0;
		left: calc(var(--at) * 1%);
		width: 1px;
		background: var(--line);
	}

	.whisker,
	.span {
		position: absolute;
		top: 50%;
		left: calc(var(--from) * 1%);
		width: calc((var(--to) - var(--from)) * 1%);
		height: 2px;
		transform: translateY(-50%);
		border-radius: 2px;
		background: color-mix(in oklab, var(--viz-paired) 45%, var(--surface));
	}

	.span {
		height: 0.875rem;
		border-radius: 999px;
		background: var(--surface-2);
	}

	.mark {
		position: absolute;
		top: 50%;
		left: calc(var(--at) * 1%);
		width: 0.75rem;
		height: 0.75rem;
		transform: translate(-50%, -50%);
		border-radius: 999px;
		box-shadow: 0 0 0 2px var(--surface);
	}

	.mark::after {
		content: attr(data-label);
		position: absolute;
		bottom: calc(100% + 0.375rem);
		left: 50%;
		transform: translateX(-50%);
		padding: 0.125rem 0.375rem;
		border-radius: 0.375rem;
		background: var(--ink);
		color: var(--bg);
		font-size: 0.6875rem;
		font-weight: 600;
		white-space: nowrap;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s ease;
	}

	.mark:hover::after {
		opacity: 1;
	}

	.mark.agent {
		background: var(--viz-paired);
	}

	.mark.board {
		width: 0.625rem;
		height: 1.125rem;
		border-radius: 0;
		background: linear-gradient(var(--ink-muted), var(--ink-muted)) center / 2px 100% no-repeat;
		box-shadow: none;
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

	.axis-title {
		margin-top: 0.25rem;
		text-align: center;
		font-size: 0.75rem;
		color: var(--ink-muted);
	}
</style>
