<script>
	/**
	 * Horizontal bars with each value at its tip. Emphasised rows take the accent and
	 * the rest stay neutral; an optional reference marks a target on the same scale.
	 * Built as a table, so the numbers stay readable without the bars.
	 * @type {{
	 *   rows: { label: string, value: number, emphasis?: boolean }[],
	 *   labelHeader: string,
	 *   valueHeader: string,
	 *   max?: number,
	 *   ticks?: number[],
	 *   format?: (value: number) => string,
	 *   tickFormat?: (value: number) => string,
	 *   showValues?: boolean,
	 *   reference?: { value: number, label: string }
	 * }}
	 */
	let {
		rows,
		labelHeader,
		valueHeader,
		max = 1,
		ticks = [],
		format = (value) => String(value),
		tickFormat = format,
		showValues = true,
		reference
	} = $props();

	const pct = (/** @type {number} */ value) => (Math.max(0, value) / max) * 100;
</script>

<table class="bars">
	<thead>
		<tr>
			<th scope="col" class="sr-only">{labelHeader}</th>
			<th scope="col" class="head">
				<span class="sr-only">{valueHeader}</span>
				{#if reference}
					<span class="ref-label" style="--at: {pct(reference.value)}" aria-hidden="true"
						>{reference.label}</span
					>
				{/if}
			</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as row (row.label)}
			<tr>
				<th scope="row">{row.label}</th>
				<td>
					<div class="scale">
						{#each ticks as tick (tick)}
							<span class="grid-line" style="--at: {pct(tick)}" aria-hidden="true"></span>
						{/each}
						{#if reference}
							<span class="ref" style="--at: {pct(reference.value)}" aria-hidden="true"></span>
						{/if}
						<span
							class="bar"
							class:emphasis={row.emphasis}
							style="width: {pct(row.value)}%"
							aria-hidden="true"
						></span>
						{#if showValues}
							<span class="value" style="--at: {pct(row.value)}">{format(row.value)}</span>
						{/if}
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
	{#if ticks.length}
		<tfoot aria-hidden="true">
			<tr>
				<td></td>
				<td>
					<div class="scale axis">
						{#each ticks as tick (tick)}
							<span style="--at: {pct(tick)}">{tickFormat(tick)}</span>
						{/each}
					</div>
				</td>
			</tr>
		</tfoot>
	{/if}
</table>

<style>
	.bars {
		width: 100%;
		border-collapse: collapse;
	}

	tbody th {
		width: 1%;
		padding: 0.25rem 0.875rem 0.25rem 0;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1.3;
		color: var(--ink);
		text-align: left;
		white-space: nowrap;
	}

	td {
		padding: 0;
	}

	/* The scale leaves room on the right for the value written past the longest bar. */
	.scale {
		position: relative;
		width: calc(100% - 3.25rem);
		height: 2rem;
	}

	.grid-line,
	.ref {
		position: absolute;
		inset-block: 0;
		left: calc(var(--at) * 1%);
		width: 1px;
		background: var(--line);
	}

	.ref {
		width: 1.5px;
		background: var(--ink-muted);
	}

	.bar {
		position: absolute;
		top: 50%;
		left: 0;
		height: 0.875rem;
		transform: translateY(-50%);
		border-radius: 0 4px 4px 0;
		background: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
	}

	.bar.emphasis {
		background: var(--accent);
	}

	.value {
		position: absolute;
		top: 50%;
		left: calc(var(--at) * 1% + 0.5rem);
		transform: translateY(-50%);
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.head {
		position: relative;
		height: 1.5rem;
	}

	.ref-label {
		position: absolute;
		bottom: 0.25rem;
		left: calc((100% - 3.25rem) * var(--at) / 100);
		transform: translateX(-50%);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
		white-space: nowrap;
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
</style>
