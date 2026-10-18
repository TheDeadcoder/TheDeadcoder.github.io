<script>
	/**
	 * How often an agent asked for confirmation (%), split by target and environment.
	 * Fill strength follows the value; every cell also prints its number.
	 * @type {{ title: string, values: { dp: number, ds: number, bp: number, bs: number }, note?: string }}
	 */
	let { title, values, note = '' } = $props();

	let rows = $derived([
		{ label: 'Destructive', cells: [values.dp, values.ds] },
		{ label: 'Benign', cells: [values.bp, values.bs] }
	]);

	// Darker fills take the contrast colour; the switch point differs per theme so
	// every number clears 3:1 (the cell numbers are 24px, large text).
	const tone = (/** @type {number} */ value) => (value >= 76 ? 'strong' : value >= 60 ? 'mid' : '');
</script>

<div>
	<table class="truth">
		<caption>{title}</caption>
		<thead>
			<tr>
				<td></td>
				<th scope="col">Production</th>
				<th scope="col">Staging</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.label)}
				<tr>
					<th scope="row">{row.label}</th>
					{#each row.cells as value, i (i)}
						<td class={tone(value)} style="--fill: {6 + value * 0.94}%"
							>{value}<span class="sr-only">%</span></td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	{#if note}
		<p class="mt-2 text-center text-[13px] text-ink-muted tabular-nums">{note}</p>
	{/if}
</div>

<style>
	.truth {
		margin-inline: auto;
		border-collapse: separate;
		border-spacing: 2px;
	}

	caption {
		padding-bottom: 0.625rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	th {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}

	thead th {
		padding-bottom: 0.25rem;
	}

	tbody th {
		padding-right: 0.5rem;
		text-align: right;
	}

	tbody td {
		width: 4.25rem;
		height: 3.75rem;
		border-radius: 6px;
		background: color-mix(in oklab, var(--accent) var(--fill), var(--surface));
		color: var(--ink);
		font-size: 1.5rem;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		text-align: center;
		vertical-align: middle;
	}

	tbody td.strong {
		color: var(--accent-contrast);
	}

	:global(.dark) tbody td.mid {
		color: var(--accent-contrast);
	}
</style>
