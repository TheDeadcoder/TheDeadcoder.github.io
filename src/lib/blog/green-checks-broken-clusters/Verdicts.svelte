<script>
	import Icon from '$components/Icon.svelte';
	import { agents, verdicts } from './data.js';

	const meaning = /** @type {Record<string, { pass: boolean, text: string }>} */ ({
		tp: { pass: true, text: 'Graded pass, and the fix worked' },
		fa: { pass: true, text: 'Graded pass, but the cluster was still broken' },
		fr: { pass: false, text: 'Graded fail, but the fix had worked' }
	});

	const attempt = (/** @type {number} */ i) => `${agents[Math.floor(i / 3)]}, attempt ${(i % 3) + 1}`;

	/** @type {HTMLDivElement | undefined} */
	let root = $state();
	/** @type {{ x: number, y: number, value: string, label: string, note: string } | null} */
	let tip = $state(null);

	/**
	 * @param {PointerEvent} event
	 * @param {string} task
	 * @param {number} i
	 * @param {string} code
	 * @param {string | undefined} changed
	 */
	function show(event, task, i, code, changed) {
		if (!root) return;
		const box = root.getBoundingClientRect();
		tip = {
			x: Math.min(Math.max(event.clientX - box.left, 120), box.width - 120),
			y: event.clientY - box.top,
			value: meaning[code].text,
			label: `${task} · ${attempt(i)}`,
			note: changed ? `The agent ${changed}` : ''
		};
	}
</script>

<div class="verdicts" bind:this={root}>
	<div class="mb-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-ink-muted" aria-hidden="true">
		<span class="inline-flex items-center gap-2">
			<i class="chip"><Icon name="check" size={11} strokeWidth={3} /></i>Passed, and fixed
		</span>
		<span class="inline-flex items-center gap-2">
			<i class="chip wrong"><Icon name="check" size={11} strokeWidth={3} /></i>Passed, still broken
		</span>
		<span class="inline-flex items-center gap-2">
			<i class="chip wrong"><Icon name="close" size={11} strokeWidth={3} /></i>Failed, but fixed
		</span>
		<span class="inline-flex items-center gap-2"><i class="mark"></i>Agent changed the monitoring</span>
	</div>

	<table>
		<caption class="sr-only">
			The benchmark's verdict on every attempt, compared with the reference check
		</caption>
		<thead>
			<tr>
				<td></td>
				{#each agents as agent (agent)}
					<th scope="colgroup" colspan="3">{agent}</th>
				{/each}
			</tr>
			<tr class="attempts" aria-hidden="true">
				<td></td>
				{#each Array.from({ length: 9 }, (_, i) => i) as i (i)}
					<td class:start={i % 3 === 0 && i > 0}>{(i % 3) + 1}</td>
				{/each}
			</tr>
		</thead>
		{#each verdicts as group (group.benchmark)}
			<tbody>
				<tr>
					<th scope="rowgroup" colspan="10" class="group">{group.benchmark}</th>
				</tr>
				{#each group.tasks as task (task.label)}
					<tr>
						<th scope="row">{task.label}</th>
						{#each task.cells as code, i (i)}
							{@const changed = task.changed?.[i]}
							<td
								class:start={i % 3 === 0 && i > 0}
								onpointermove={(event) => show(event, task.label, i, code, changed)}
								onpointerleave={() => (tip = null)}
							>
								<span class="chip" class:wrong={code !== 'tp'} aria-hidden="true">
									<Icon name={meaning[code].pass ? 'check' : 'close'} size={12} strokeWidth={3} />
									{#if changed}<i class="mark"></i>{/if}
								</span>
								<span class="sr-only"
									>{attempt(i)}: {meaning[code].text}{changed ? `; the agent ${changed}` : ''}</span
								>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		{/each}
	</table>

	{#if tip}
		<div class="tip" style="left: {tip.x}px; top: {tip.y}px" aria-hidden="true">
			<strong>{tip.value}</strong>
			<span>{tip.label}</span>
			{#if tip.note}<span>{tip.note}</span>{/if}
		</div>
	{/if}
</div>

<style>
	.verdicts {
		--viz-err: #eb6834;
		--viz-on-err: var(--ink);
		position: relative;
	}

	:global(.dark) .verdicts {
		--viz-err: #d95926;
		--viz-on-err: var(--bg);
	}

	table {
		margin-inline: auto;
		border-collapse: separate;
		border-spacing: 0 3px;
	}

	thead th {
		padding-bottom: 0.125rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink);
		text-align: center;
	}

	.attempts td {
		padding-bottom: 0.25rem;
		font-size: 0.6875rem;
		color: var(--ink-muted);
		text-align: center;
		font-variant-numeric: tabular-nums;
	}

	.group {
		padding: 0.75rem 0 0.125rem;
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: var(--ink-muted);
		text-align: left;
		text-transform: uppercase;
	}

	tbody th[scope='row'] {
		padding-right: 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1.25;
		color: var(--ink);
		text-align: left;
	}

	td {
		padding: 0 0 0 2px;
	}

	td.start {
		padding-left: 0.5rem;
	}

	.chip {
		position: relative;
		display: grid;
		place-items: center;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 5px;
		background: color-mix(in oklab, var(--ink-muted) 22%, var(--surface));
		color: var(--ink);
		transition: box-shadow 120ms;
	}

	.chip.wrong {
		background: var(--viz-err);
		color: var(--viz-on-err);
	}

	td:hover .chip {
		box-shadow: 0 0 0 1.5px var(--surface), 0 0 0 3px var(--ink);
	}

	.mark {
		display: inline-block;
		width: 0.4375rem;
		height: 0.4375rem;
		border-radius: 999px;
		background: var(--ink);
		box-shadow: 0 0 0 1.5px var(--surface);
	}

	.chip .mark {
		position: absolute;
		top: -0.1875rem;
		right: -0.1875rem;
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
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
	}

	@media (min-width: 40rem) {
		tbody th[scope='row'] {
			padding-right: 1.25rem;
			font-size: 0.8125rem;
			white-space: nowrap;
		}

		.chip {
			width: 1.625rem;
			height: 1.625rem;
		}

		td {
			padding-left: 4px;
		}

		td.start {
			padding-left: 1rem;
		}
	}
</style>
