<script>
	import { runs, describe } from './data.js';

	// The post's evaluation figure in miniature: every step of the cooling-cascade runs.
	const panels = [
		{ label: 'Base model', model: 'base' },
		{ label: 'After training', model: 'trained' }
	].map((panel) => ({
		...panel,
		rows: runs
			.filter((run) => run.scenario === 'A4' && run.model === panel.model)
			.map((run) => run.commands.map((command) => describe(command).kind))
	}));
</script>

<div class="cover" aria-hidden="true">
	<div class="pair">
		{#each panels as panel (panel.label)}
			<div class="panel">
				<div class="grid">
					{#each panel.rows as row, r (r)}
						{#each row as kind, c (c)}
							<span class="cell {kind}"></span>
						{/each}
					{/each}
				</div>
				<span class="label">{panel.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.cover {
		--viz-diagnose: #256abf;
		--viz-cooling: #1baf7a;
		--viz-power: #eb6834;
		--cell: clamp(7px, min(9cqh, 3.7cqw), 22px);
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		padding: 0.75rem;
		container-type: size;
	}

	:global(.dark) .cover {
		--viz-diagnose: #3987e5;
		--viz-cooling: #199e70;
		--viz-power: #d95926;
	}

	.pair {
		display: flex;
		gap: calc(var(--cell) * 1.2);
	}

	.panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: calc(var(--cell) * 0.5);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(10, var(--cell));
		gap: 2px;
	}

	.cell {
		width: var(--cell);
		height: var(--cell);
		border-radius: 3px;
		background: color-mix(in oklab, var(--ink-muted) 25%, var(--surface-2));
	}

	.cell.diagnose {
		background: var(--viz-diagnose);
	}

	.cell.cooling {
		background: var(--viz-cooling);
	}

	.cell.power {
		background: var(--viz-power);
	}

	.label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}
</style>
