<script>
	import Icon from '$components/Icon.svelte';

	const steps = [
		{ title: 'Deploy', text: 'A real application on a Kubernetes cluster' },
		{ title: 'Break', text: 'The benchmark injects a fault' },
		{ title: 'Repair', text: 'An AI agent investigates and acts' },
		{ title: 'Grade', text: 'A script checks the cluster: pass or fail' }
	];

	const outcomes = [
		{
			truth: 'The fix worked',
			cells: [
				{ verdict: 'pass', wrong: false, title: 'Right', text: 'Credit for a real fix' },
				{ verdict: 'fail', wrong: true, title: 'False reject', text: 'A real fix loses its credit' }
			]
		},
		{
			truth: 'Still broken',
			cells: [
				{ verdict: 'pass', wrong: true, title: 'False accept', text: 'Unearned credit' },
				{ verdict: 'fail', wrong: false, title: 'Right', text: 'No credit, as it should be' }
			]
		}
	];
</script>

<div class="loop">
	<ol class="steps">
		{#each steps as step, i (step.title)}
			<li>
				<span class="num" aria-hidden="true">{i + 1}</span>
				<span class="block text-sm font-semibold text-ink">{step.title}</span>
				<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">{step.text}</span>
			</li>
		{/each}
	</ol>

	<table class="outcomes">
		<caption>Two ways a grader can be wrong</caption>
		<thead>
			<tr>
				<td></td>
				<th scope="col">Graded pass</th>
				<th scope="col">Graded fail</th>
			</tr>
		</thead>
		<tbody>
			{#each outcomes as row (row.truth)}
				<tr>
					<th scope="row">{row.truth}</th>
					{#each row.cells as cell (cell.verdict)}
						<td class:wrong={cell.wrong}>
							<span class="chip" class:wrong={cell.wrong} aria-hidden="true">
								<Icon name={cell.verdict === 'pass' ? 'check' : 'close'} size={14} strokeWidth={2.75} />
							</span>
							<span class="block text-sm font-semibold text-ink">{cell.title}</span>
							<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">{cell.text}</span>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.loop {
		--viz-err: #eb6834;
		--viz-on-err: var(--ink);
	}

	:global(.dark) .loop {
		--viz-err: #d95926;
		--viz-on-err: var(--bg);
	}

	.steps {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.steps li {
		position: relative;
		border-radius: 0.75rem;
		background: var(--surface-2);
		padding: 0.75rem 0.875rem;
	}

	.num {
		display: inline-grid;
		place-items: center;
		width: 1.375rem;
		height: 1.375rem;
		margin-bottom: 0.5rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent);
		font-size: 0.75rem;
		font-weight: 600;
	}

	@media (min-width: 40rem) {
		.steps {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 1.25rem;
		}

		.steps li:not(:last-child)::after {
			content: '';
			position: absolute;
			top: 50%;
			right: -0.9rem;
			width: 0.5rem;
			height: 0.5rem;
			border-top: 1.5px solid var(--line-strong);
			border-right: 1.5px solid var(--line-strong);
			transform: translateY(-50%) rotate(45deg);
		}
	}

	.outcomes {
		width: 100%;
		margin-top: 1.75rem;
		border-collapse: separate;
		border-spacing: 0.375rem;
		table-layout: fixed;
	}

	caption {
		padding-bottom: 0.25rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
		text-align: left;
		padding-left: 0.375rem;
	}

	thead th {
		padding: 0.25rem 0.5rem 0;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: left;
	}

	thead td,
	tbody th {
		width: 5.5rem;
	}

	tbody th {
		padding-right: 0.25rem;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1.3;
		color: var(--ink);
		text-align: left;
		vertical-align: middle;
	}

	tbody td {
		border-radius: 0.75rem;
		background: var(--surface-2);
		padding: 0.75rem 0.875rem;
		vertical-align: top;
	}

	tbody td.wrong {
		background: color-mix(in oklab, var(--viz-err) 14%, var(--surface));
	}

	.chip {
		display: grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		margin-bottom: 0.5rem;
		border-radius: 6px;
		background: color-mix(in oklab, var(--ink-muted) 22%, var(--surface));
		color: var(--ink);
	}

	.chip.wrong {
		background: var(--viz-err);
		color: var(--viz-on-err);
	}

	@media (min-width: 40rem) {
		thead td,
		tbody th {
			width: 7.5rem;
		}
	}
</style>
