<script>
	import { runs, describe } from './data.js';

	// Every command from every evaluation run, one table per hard scenario.
	const panels = [
		{ id: 'A4', title: 'Cooling failure cascade (A4)' },
		{ id: 'B4', title: 'Power failure cascade (B4)' }
	];
	const models = [
		{ id: 'base', label: 'Base model' },
		{ id: 'trained', label: 'After training' }
	];
	const legend = [
		{ kind: 'diagnose', letter: 'D', text: 'Diagnose a unit' },
		{ kind: 'cooling', letter: 'S', text: 'Change a setpoint' },
		{ kind: 'power', letter: 'G', text: 'Start the generator' },
		{ kind: 'power', letter: 'L', text: 'Set a rack’s load' },
		{ kind: 'wait', letter: '', text: 'Wait' }
	];
	const steps = Array.from({ length: 10 }, (_, i) => i + 1);

	/** Every rack carries 8 kW when these runs start. */
	const START_KW = 8;

	const fmt = (/** @type {number} */ value) => (value < 0 ? `−${(-value).toFixed(3)}` : value.toFixed(3));
	const kw = (/** @type {number} */ value) => `${value.toFixed(1)} kW`;

	/**
	 * Each command with its cell, plus what an accepted rack command did to that rack.
	 * @param {string[]} commands
	 */
	function cells(commands) {
		/** @type {Map<string, number>} */
		const loads = new Map();
		return commands.map((command) => {
			const cell = describe(command);
			let note = '';
			if (cell.letter === 'L') {
				const [, rack, value] = command.split(' ');
				if (cell.rejected) {
					note = `Rejected: there is no rack ${rack}`;
				} else {
					const from = loads.get(rack) ?? START_KW;
					const to = Number(value);
					loads.set(rack, to);
					if (to > from) note = `Raises ${rack} from ${kw(from)} to ${kw(to)}`;
					else if (to < from) note = `Sheds ${rack} from ${kw(from)} to ${kw(to)}`;
					else note = `Leaves ${rack} at ${kw(to)}`;
				}
			}
			return { command, ...cell, note };
		});
	}

	const tables = panels.map((panel) => ({
		...panel,
		groups: models.map((model) => {
			const rows = runs
				.filter((run) => run.scenario === panel.id && run.model === model.id)
				.map((run) => ({ ...run, cells: cells(run.commands) }));
			const mean = rows.reduce((sum, run) => sum + run.total, 0) / rows.length;
			return { ...model, rows, mean };
		})
	}));

	/** @type {HTMLDivElement | undefined} */
	let root = $state();
	/** @type {{ x: number, y: number, value: string, label: string, note: string } | null} */
	let tip = $state(null);

	/**
	 * @param {PointerEvent} event
	 * @param {string} label
	 * @param {{ command: string, note: string }} cell
	 */
	function show(event, label, cell) {
		if (!root) return;
		const box = root.getBoundingClientRect();
		tip = {
			x: Math.min(Math.max(event.clientX - box.left, 120), box.width - 120),
			y: event.clientY - box.top,
			value: cell.command,
			label,
			note: cell.note
		};
	}
</script>

<div class="runs" bind:this={root}>
	<div class="legend" aria-hidden="true">
		{#each legend as item (item.text)}
			<span><i class="chip {item.kind}">{item.letter}</i>{item.text}</span>
		{/each}
		<span><i class="chip power rejected">L</i>Rejected: no such rack</span>
	</div>

	<div class="panels">
		{#each tables as table (table.id)}
			<div class="panel">
				<p class="title">{table.title}</p>
				<table>
					<caption class="sr-only">
						{table.title}: every command, ten steps per run, with each run's total reward
					</caption>
					<thead>
						<tr>
							<th scope="col" class="run">Run</th>
							{#each steps as step (step)}
								<th scope="col">{step}</th>
							{/each}
							<th scope="col" class="total">Reward</th>
						</tr>
					</thead>
					{#each table.groups as group (group.id)}
						<tbody>
							<tr>
								<th scope="rowgroup" colspan="12" class="group">
									{group.label} · mean {fmt(group.mean)}
								</th>
							</tr>
							{#each group.rows as run (run.run)}
								<tr>
									<th scope="row" class="run">{run.run}</th>
									{#each run.cells as cell, i (i)}
										{@const label = `${group.label}, run ${run.run}, step ${i + 1}`}
										<td
											onpointermove={(event) => show(event, label, cell)}
											onpointerdown={(event) => show(event, label, cell)}
											onpointerleave={() => (tip = null)}
										>
											<span class="chip {cell.kind}" class:rejected={cell.rejected} aria-hidden="true"
												>{cell.letter}</span
											>
											<span class="sr-only">{cell.command}{cell.note ? `. ${cell.note}` : ''}</span>
										</td>
									{/each}
									<td class="total">{fmt(run.total)}</td>
								</tr>
							{/each}
						</tbody>
					{/each}
				</table>
			</div>
		{/each}
	</div>

	{#if tip}
		<div class="tip" style="left: {tip.x}px; top: {tip.y}px" aria-hidden="true">
			<strong>{tip.value}</strong>
			<span>{tip.label}</span>
			{#if tip.note}<span>{tip.note}</span>{/if}
		</div>
	{/if}
</div>

<style>
	.runs {
		--viz-diagnose: #256abf;
		--viz-on-diagnose: #ffffff;
		--viz-cooling: #1baf7a;
		--viz-on-cooling: var(--ink);
		--viz-power: #eb6834;
		--viz-on-power: var(--ink);
		--viz-strike: var(--ink);
		position: relative;
	}

	:global(.dark) .runs {
		--viz-diagnose: #3987e5;
		--viz-on-diagnose: var(--bg);
		--viz-cooling: #199e70;
		--viz-on-cooling: var(--bg);
		--viz-power: #d95926;
		--viz-on-power: var(--bg);
		--viz-strike: var(--bg);
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.5rem 1.125rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
	}

	.legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.4375rem;
	}

	.panels {
		display: grid;
		gap: 1.75rem;
		margin-top: 1.5rem;
	}

	.panel {
		min-width: 0;
	}

	.title {
		margin-bottom: 0.25rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	table {
		border-collapse: separate;
		border-spacing: 0 3px;
	}

	thead th {
		padding: 0 0 0.125rem 2px;
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: center;
		font-variant-numeric: tabular-nums;
	}

	th.run {
		padding-right: 0.5rem;
		text-align: left;
	}

	thead th.total {
		padding-left: 0.625rem;
		text-align: right;
	}

	.group {
		padding: 0.625rem 0 0.125rem;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--ink-muted);
		text-align: left;
		text-transform: uppercase;
		font-variant-numeric: tabular-nums;
	}

	tbody th.run {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	td {
		padding: 0 0 0 2px;
	}

	td.total {
		padding-left: 0.625rem;
		font-size: 0.75rem;
		color: var(--ink);
		text-align: right;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.chip {
		display: grid;
		place-items: center;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 5px;
		background: color-mix(in oklab, var(--ink-muted) 22%, var(--surface));
		font-size: 0.6875rem;
		font-style: normal;
		font-weight: 600;
		line-height: 1;
		transition: box-shadow 120ms;
	}

	.chip.diagnose {
		background: var(--viz-diagnose);
		color: var(--viz-on-diagnose);
	}

	.chip.cooling {
		background: var(--viz-cooling);
		color: var(--viz-on-cooling);
	}

	.chip.power {
		background: var(--viz-power);
		color: var(--viz-on-power);
	}

	.chip.rejected {
		background-image: linear-gradient(
			to top right,
			transparent calc(50% - 0.75px),
			var(--viz-strike) calc(50% - 0.75px),
			var(--viz-strike) calc(50% + 0.75px),
			transparent calc(50% + 0.75px)
		);
	}

	td:hover .chip {
		box-shadow:
			0 0 0 1.5px var(--surface),
			0 0 0 3px var(--ink);
	}

	.tip {
		position: absolute;
		z-index: 10;
		display: grid;
		gap: 0.125rem;
		width: max-content;
		max-width: 15rem;
		transform: translate(-50%, calc(-100% - 0.875rem));
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

	.tip strong {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink);
	}

	@media (min-width: 40rem) {
		.chip {
			width: 1.5rem;
			height: 1.5rem;
			font-size: 0.75rem;
		}

		td {
			padding-left: 3px;
		}
	}

	@media (min-width: 64rem) {
		.panels {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 2rem;
		}
	}
</style>
