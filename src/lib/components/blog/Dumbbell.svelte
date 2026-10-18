<script>
	/**
	 * Before and after values per row on one scale, with both numbers written out.
	 * @type {{
	 *   rows: { label: string, from: number, to: number }[],
	 *   labelHeader: string,
	 *   fromLabel: string,
	 *   toLabel: string,
	 *   max?: number,
	 *   ticks?: number[],
	 *   unit?: string
	 * }}
	 */
	let {
		rows,
		labelHeader,
		fromLabel,
		toLabel,
		max = 100,
		ticks = [0, 25, 50, 75, 100],
		unit = '%'
	} = $props();

	const pct = (/** @type {number} */ value) => (value / max) * 100;
</script>

<div class="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-ink-muted" aria-hidden="true">
	<span class="inline-flex items-center gap-2"><i class="dot from"></i>{fromLabel}</span>
	<span class="inline-flex items-center gap-2"><i class="dot to"></i>{toLabel}</span>
</div>

<table class="dumbbell">
	<thead>
		<tr>
			<th scope="col" class="sr-only">{labelHeader}</th>
			<td></td>
			<th scope="col" class="sr-only max-sm:hidden">{fromLabel}, then {toLabel}</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as row (row.label)}
			<tr>
				<th scope="row">
					{row.label}
					<span class="block font-normal text-ink-muted tabular-nums sm:hidden"
						>{row.from}{unit}{' → '}<strong class="font-semibold text-ink">{row.to}{unit}</strong></span
					>
				</th>
				<td class="track" aria-hidden="true">
					<div class="scale">
						{#each ticks as tick (tick)}
							<span class="grid-line" style="--at: {pct(tick)}"></span>
						{/each}
						<span
							class="link"
							style="--from: {pct(Math.min(row.from, row.to))}; --to: {pct(Math.max(row.from, row.to))}"
						></span>
						<i class="dot from" style="--at: {pct(row.from)}"></i>
						<i class="dot to" style="--at: {pct(row.to)}"></i>
					</div>
				</td>
				<td class="values max-sm:hidden">
					<span class="sr-only">{`${fromLabel}: `}</span>{row.from}{unit}<span aria-hidden="true"
						>{' → '}</span
					><span class="sr-only">{`, ${toLabel}: `}</span><strong>{row.to}{unit}</strong>
				</td>
			</tr>
		{/each}
	</tbody>
	<tfoot aria-hidden="true">
		<tr>
			<td></td>
			<td>
				<div class="scale axis">
					{#each ticks as tick (tick)}
						<span class={tick % (max / 2) ? 'max-sm:hidden' : ''} style="--at: {pct(tick)}"
							>{tick}{unit}</span
						>
					{/each}
				</div>
			</td>
			<td class="max-sm:hidden"></td>
		</tr>
	</tfoot>
</table>

<style>
	.dumbbell {
		width: 100%;
		border-collapse: collapse;
	}

	tbody th {
		width: 1%;
		padding: 0.25rem 0.875rem 0.25rem 0;
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--ink);
		text-align: left;
		white-space: nowrap;
	}

	td {
		padding: 0;
	}

	.scale {
		position: relative;
		height: 2.25rem;
		margin-inline: 0.5rem;
	}

	.grid-line {
		position: absolute;
		inset-block: 0;
		left: calc(var(--at) * 1%);
		width: 1px;
		background: var(--line);
	}

	.link {
		position: absolute;
		top: 50%;
		left: calc(var(--from) * 1%);
		width: calc((var(--to) - var(--from)) * 1%);
		height: 2px;
		transform: translateY(-50%);
		background: var(--line-strong);
	}

	.dot {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 999px;
	}

	.scale .dot {
		position: absolute;
		top: 50%;
		left: calc(var(--at) * 1%);
		transform: translate(-50%, -50%);
	}

	.dot.from {
		border: 2px solid var(--ink-muted);
		background: var(--surface);
	}

	.dot.to {
		background: var(--accent);
		box-shadow: 0 0 0 2px var(--surface);
	}

	.values {
		width: 1%;
		padding-left: 0.75rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.values strong {
		font-weight: 600;
		color: var(--ink);
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
