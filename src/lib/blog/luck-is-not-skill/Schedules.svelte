<script>
	import Icon from '$components/Icon.svelte';
	import Toggle from './Toggle.svelte';
	import { schedules } from './data.js';

	const options = [
		{ value: 'independent', label: 'Independent schedules' },
		{ value: 'paired', label: 'Paired schedule' }
	];
	const events = schedules.paired[0].map((_, i) => `e${i + 1}`);

	let mode = $state('independent');
	let rows = $derived(schedules[mode]);
</script>

<div class="schedules">
	<div class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
		<Toggle {options} bind:value={mode} label="Schedule design" />
		<p class="flex items-center gap-4 text-[13px] text-ink-muted" aria-hidden="true">
			<span class="inline-flex items-center gap-1.5"
				><span class="cell key fault"><Icon name="close" size={10} strokeWidth={3.5} /></span>Fault</span
			>
			<span class="inline-flex items-center gap-1.5"
				><span class="cell key"><i class="dot"></i></span>No fault</span
			>
		</p>
	</div>

	<table class="board">
		<caption class="sr-only">
			Faults by rollout and event, {mode === 'paired'
				? 'with one schedule shared by the whole group'
				: 'with a separate schedule for each rollout'}
		</caption>
		<thead>
			<tr>
				<td></td>
				{#each events as event (event)}
					<th scope="col">{event}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row, r (r)}
				<tr>
					<th scope="row">Rollout {r + 1}</th>
					{#each row as fault, c (c)}
						<td>
							<span class="cell" class:fault>
								{#if fault}
									<Icon name="close" size={14} strokeWidth={3} />
								{:else}
									<i class="dot"></i>
								{/if}
								<span class="sr-only">{fault ? 'fault' : 'no fault'}</span>
							</span>
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<p class="axis" aria-hidden="true">Event key</p>

	<p class="note" aria-live="polite">
		{#if mode === 'paired'}
			Every rollout gets the same draw for the same event, so e1, e2 and e5 fail for all four of them.
		{:else}
			Each rollout draws its own luck, so the same event fails for some rollouts and not for others.
		{/if}
	</p>
</div>

<style>
	.schedules {
		--viz-fault: #eb6834;
		--cell: clamp(1.625rem, 7.4vw, 2.25rem);
	}

	:global(.dark) .schedules {
		--viz-fault: #d95926;
	}

	.board {
		margin-top: 1.5rem;
		border-collapse: separate;
		border-spacing: 4px;
		margin-inline: auto;
	}

	th {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}

	thead th {
		padding-bottom: 0.125rem;
		text-align: center;
		font-variant-numeric: tabular-nums;
	}

	tbody th {
		padding-right: 0.625rem;
		text-align: right;
		white-space: nowrap;
	}

	td {
		padding: 0;
	}

	.cell {
		display: grid;
		place-items: center;
		width: var(--cell);
		height: var(--cell);
		border-radius: 7px;
		background: var(--surface-2);
		color: var(--ink-muted);
		transition:
			background-color 0.35s ease,
			color 0.35s ease;
	}

	.cell.fault {
		background: color-mix(in oklab, var(--viz-fault) 20%, var(--surface));
		color: var(--viz-fault);
	}

	.cell.key {
		width: 1.125rem;
		height: 1.125rem;
		border-radius: 4px;
	}

	.dot {
		width: 5px;
		height: 5px;
		border-radius: 999px;
		background: color-mix(in oklab, var(--ink-muted) 70%, var(--surface));
	}

	.axis {
		margin-top: 0.25rem;
		text-align: center;
		font-size: 0.75rem;
		color: var(--ink-muted);
	}

	.note {
		margin-top: 1rem;
		border-top: 1px solid var(--line);
		padding-top: 0.875rem;
		font-size: 0.875rem;
		line-height: 1.55;
		color: var(--ink);
	}
</style>
