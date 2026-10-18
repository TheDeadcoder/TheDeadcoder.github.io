<script>
	import Icon from '$components/Icon.svelte';
	import { agents, verdicts } from './data.js';

	// The post's agent verdict grid: every attempt on nine tasks, wrong grades highlighted.
	const groups = verdicts.map((group) => group.tasks);
</script>

<div class="cover" aria-hidden="true">
	<div class="grid-wrap">
		<div class="heads">
			{#each agents as agent (agent)}
				<span>{agent}</span>
			{/each}
		</div>
		{#each groups as tasks, g (g)}
			<div class="group">
				{#each tasks as task (task.label)}
					<div class="row">
						{#each task.cells as code, i (i)}
							<span class="cell" class:wrong={code !== 'tp'} class:start={i % 3 === 0 && i > 0}>
								<Icon name={code === 'fr' ? 'close' : 'check'} strokeWidth={3.25} />
							</span>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
	<span class="label">Highlighted: the grade was wrong</span>
</div>

<style>
	.cover {
		--viz-err: #eb6834;
		--viz-on-err: var(--ink);
		--cell: clamp(10px, 6.5cqh, 20px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 0.75rem;
		container-type: size;
	}

	:global(.dark) .cover {
		--viz-err: #d95926;
		--viz-on-err: var(--bg);
	}

	.grid-wrap {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.heads {
		display: grid;
		grid-template-columns: repeat(3, calc(3 * var(--cell) + 4px));
		column-gap: calc(var(--cell) * 0.5 + 2px);
		margin-bottom: 2px;
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: center;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.group + .group {
		margin-top: 4px;
	}

	.row {
		display: flex;
		gap: 2px;
	}

	.cell {
		display: grid;
		place-items: center;
		width: var(--cell);
		height: var(--cell);
		border-radius: 3px;
		background: color-mix(in oklab, var(--ink-muted) 25%, var(--surface-2));
		color: var(--ink);
	}

	.cell.start {
		margin-left: calc(var(--cell) * 0.5);
	}

	.cell.wrong {
		background: var(--viz-err);
		color: var(--viz-on-err);
	}

	.cell :global(svg) {
		width: 62%;
		height: 62%;
	}

	.label {
		margin-top: 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}
</style>
