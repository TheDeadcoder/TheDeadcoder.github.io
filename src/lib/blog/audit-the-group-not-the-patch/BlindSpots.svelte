<script>
	import { blindSpots } from './data.js';

	const tasks = Array.from({ length: blindSpots.tasks }, (_, i) => i < blindSpots.flipTasks);
	const passes = Array.from({ length: blindSpots.passesInFlipTasks }, (_, i) => i < blindSpots.flips);
	const share = Math.round((100 * blindSpots.flipTasks) / blindSpots.tasks);
</script>

<div class="spots">
	<section class="panel">
		<p class="title">All {blindSpots.tasks} tasks with large test suites</p>
		<p class="lead">
			<strong>{blindSpots.flipTasks} tasks ({share}%)</strong> hold every one of the {blindSpots.flips} flips
		</p>
		<div
			class="grid tasks"
			role="img"
			aria-label="{blindSpots.tasks} squares, one per task. {blindSpots.flipTasks} are highlighted: the tasks with at least one flip."
		>
			{#each tasks as hit, i (i)}<span class="cell" class:hit></span>{/each}
		</div>
		<div class="legend" aria-hidden="true">
			<span><i class="key square hit"></i>Task with at least one flip</span>
			<span><i class="key square"></i>Task without a flip</span>
		</div>
	</section>

	<section class="panel">
		<p class="title">Attempts in those {blindSpots.flipTasks} tasks that pass the PR’s own tests</p>
		<p class="lead">
			<strong>{blindSpots.flips} of {blindSpots.passesInFlipTasks}</strong> fail the full suite
		</p>
		<div
			class="grid passes"
			role="img"
			aria-label="{blindSpots.passesInFlipTasks} dots, one per passing attempt in those tasks. {blindSpots.flips} are highlighted: the flips."
		>
			{#each passes as hit, i (i)}<span class="dot" class:hit></span>{/each}
		</div>
		<div class="legend" aria-hidden="true">
			<span><i class="key round hit"></i>Flip</span>
			<span><i class="key round"></i>Also passes the full suite</span>
		</div>
	</section>
</div>

<style>
	.spots {
		--viz-flip: #eb6834;
		--viz-rest: color-mix(in oklab, var(--ink-muted) 22%, var(--surface-2));
		display: grid;
		gap: 2rem;
	}

	:global(.dark) .spots {
		--viz-flip: #d95926;
	}

	.title {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.3;
		color: var(--ink);
	}

	.lead {
		margin-top: 0.25rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
	}

	.lead strong {
		font-weight: 600;
		color: var(--ink);
	}

	.grid {
		display: grid;
		gap: 2px;
		margin-top: 0.875rem;
	}

	.tasks {
		grid-template-columns: repeat(31, minmax(0, 1fr));
	}

	.passes {
		grid-template-columns: repeat(30, minmax(0, 1fr));
		gap: 3px;
	}

	.cell,
	.dot {
		aspect-ratio: 1;
		background: var(--viz-rest);
	}

	.cell {
		border-radius: 2px;
	}

	.dot {
		border-radius: 999px;
	}

	.hit {
		background: var(--viz-flip);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem 1.25rem;
		margin-top: 0.75rem;
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
		background: var(--viz-rest);
	}

	.key.hit {
		background: var(--viz-flip);
	}

	.key.square {
		border-radius: 2px;
	}

	.key.round {
		border-radius: 999px;
	}
</style>
