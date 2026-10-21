<script>
	import Icon from '$components/Icon.svelte';
	import { schedules } from './data.js';

	// The post's schedule figure in miniature: independent luck next to shared luck.
	const panels = [
		{ label: 'Independent luck', rows: schedules.independent },
		{ label: 'Shared luck', rows: schedules.paired }
	];
</script>

<div class="cover" aria-hidden="true">
	<div class="pair">
		{#each panels as panel (panel.label)}
			<div class="panel">
				<div class="grid">
					{#each panel.rows as row, r (r)}
						{#each row as fault, c (c)}
							<span class="cell" class:fault>
								{#if fault}<Icon name="close" strokeWidth={3.25} />{/if}
							</span>
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
		--viz-fault: #eb6834;
		--viz-on-fault: var(--ink);
		--cell: clamp(8px, min(10cqh, 5.8cqw), 24px);
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		padding: 0.75rem;
		container-type: size;
	}

	:global(.dark) .cover {
		--viz-fault: #d95926;
		--viz-on-fault: var(--bg);
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
		grid-template-columns: repeat(7, var(--cell));
		gap: 2px;
	}

	.cell {
		display: grid;
		place-items: center;
		width: var(--cell);
		height: var(--cell);
		border-radius: 3px;
		background: color-mix(in oklab, var(--ink-muted) 25%, var(--surface-2));
	}

	.cell.fault {
		background: var(--viz-fault);
		color: var(--viz-on-fault);
	}

	.cell :global(svg) {
		width: 62%;
		height: 62%;
	}

	.label {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}
</style>
