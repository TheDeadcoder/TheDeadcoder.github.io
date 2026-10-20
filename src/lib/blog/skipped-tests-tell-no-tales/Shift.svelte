<script>
	/**
	 * Before and after values per row on one scale, both written out with `format`; an optional reference
	 * marks a meaningful value such as "no change".
	 * @type {{
	 *   rows: { label: string, from: number, to: number }[],
	 *   labelHeader: string,
	 *   fromLabel: string,
	 *   toLabel: string,
	 *   min?: number,
	 *   max?: number,
	 *   ticks?: number[],
	 *   format?: (value: number) => string,
	 *   tickFormat?: (value: number) => string,
	 *   reference?: { value: number, label: string }
	 * }}
	 */
	let {
		rows,
		labelHeader,
		fromLabel,
		toLabel,
		min = 0,
		max = 100,
		ticks = [0, 25, 50, 75, 100],
		format = (value) => String(value),
		tickFormat = format,
		reference
	} = $props();

	const pct = (/** @type {number} */ value) => ((value - min) / (max - min)) * 100;
</script>

<div class="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-ink-muted" aria-hidden="true">
	<span class="inline-flex items-center gap-2"><i class="dot from"></i>{fromLabel}</span>
	<span class="inline-flex items-center gap-2"><i class="dot to"></i>{toLabel}</span>
</div>

<table class="shift">
	<thead>
		<tr>
			<th scope="col" class="sr-only">{labelHeader}</th>
			<td class="head" aria-hidden="true">
				{#if reference}
					<div class="scale">
						<span class="ref-label" style="--at: {pct(reference.value)}">{reference.label}</span>
					</div>
				{/if}
			</td>
			<th scope="col" class="sr-only max-sm:hidden">{fromLabel}, then {toLabel}</th>
		</tr>
	</thead>
	<tbody>
		{#each rows as row (row.label)}
			<tr>
				<th scope="row">
					{row.label}
					<span class="block font-normal text-ink-muted tabular-nums sm:hidden"
						>{format(row.from)}{' → '}<strong class="font-semibold text-ink">{format(row.to)}</strong></span
					>
				</th>
				<td class="track" aria-hidden="true">
					<div class="scale">
						{#each ticks as tick (tick)}
							<span class="grid-line" style="--at: {pct(tick)}"></span>
						{/each}
						{#if reference}
							<span class="grid-line ref" style="--at: {pct(reference.value)}"></span>
						{/if}
						<span
							class="link"
							style="--from: {pct(Math.min(row.from, row.to))}; --to: {pct(Math.max(row.from, row.to))}"
						></span>
						<i class="dot from" style="--at: {pct(row.from)}"></i>
						<i class="dot to" style="--at: {pct(row.to)}"></i>
					</div>
				</td>
				<td class="values max-sm:hidden">
					<span class="sr-only">{`${fromLabel}: `}</span>{format(row.from)}<span aria-hidden="true"
						>{' → '}</span
					><span class="sr-only">{`, ${toLabel}: `}</span><strong>{format(row.to)}</strong>
				</td>
			</tr>
		{/each}
	</tbody>
	<tfoot aria-hidden="true">
		<tr>
			<td></td>
			<td>
				<div class="scale axis">
					{#each ticks as tick, i (tick)}
						<span class={i % 2 ? 'max-sm:hidden' : ''} style="--at: {pct(tick)}">{tickFormat(tick)}</span>
					{/each}
				</div>
			</td>
			<td class="max-sm:hidden"></td>
		</tr>
	</tfoot>
</table>

<style>
	.shift {
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

	.head .scale {
		height: 1.5rem;
	}

	.ref-label {
		position: absolute;
		bottom: 0.25rem;
		left: calc(var(--at) * 1%);
		transform: translateX(-50%);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
		white-space: nowrap;
	}

	.grid-line {
		position: absolute;
		inset-block: 0;
		left: calc(var(--at) * 1%);
		width: 1px;
		background: var(--line);
	}

	.grid-line.ref {
		width: 1.5px;
		background: var(--ink-muted);
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
