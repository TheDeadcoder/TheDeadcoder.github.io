<script>
	import Icon from '$components/Icon.svelte';

	// What the review of the evaluation found, and what the next round changes. None of it
	// has been rerun yet.
	const findings = [
		{
			name: 'Every seed, the same screen',
			found:
				'The simulator ignored the seed whenever a scenario was named. All five runs of each evaluation started from one screen, a screen the model had trained on: the 510 training prompts held only 48 distinct screens.',
			next: 'Each seed now varies the start: outside and zone temperatures, rack loads and battery charge. The same 510 prompts become 510 different screens.',
			status: 'written'
		},
		{
			name: 'Half the steps',
			found: 'Both hard scenarios allow 20 steps, but the evaluation stopped every run after 10.',
			next: 'Each run gets its scenario’s full step budget.',
			status: 'written'
		},
		{
			name: 'Graded with its own reward',
			found:
				'Runs were scored with the simulator’s reward, the same signal the physics score was built on during training.',
			next: 'A separate scorecard the model was never rewarded for: peak inlet temperature, how long and how far temperatures ran over the ASHRAE limits, lowest battery charge, time on battery, generator start time, PUE, energy, and invalid or misaddressed commands.',
			status: 'written'
		},
		{
			name: 'Outcomes read from the alert text',
			found:
				'Success and failure were inferred from words in the alert. Both hard scenarios open with an alert that begins with CRITICAL, one of the failure words, and a timeout could not be told from a crash.',
			next: 'The simulator now reports whether the incident is resolved, and a crash is told apart from a timeout.',
			status: 'written'
		},
		{
			name: 'Five runs, no error bars',
			found: 'Five runs per model and scenario, compared by their averages alone.',
			next: 'Twenty seeds per scenario, 95% bootstrap intervals, a paired test on matched seeds, and evaluation seeds kept apart from the training seeds.',
			status: 'written'
		},
		{
			name: 'No imitation-only baseline',
			found: 'The base model was compared with the model after imitation and RL together.',
			next: 'Not added yet. Until an imitation-only model runs the same evaluation, the gain cannot be split between the two phases.',
			status: 'open'
		}
	];

	const statuses = /** @type {Record<string, string>} */ ({
		written: 'Fix written',
		open: 'Still open'
	});
</script>

<ol class="findings">
	{#each findings as finding (finding.name)}
		<li>
			<div class="head">
				<p class="name">{finding.name}</p>
				<span class="chip {finding.status}">
					{#if finding.status === 'written'}
						<Icon name="check" size={12} strokeWidth={3.25} />
					{:else}
						<i class="hollow" aria-hidden="true"></i>
					{/if}
					{statuses[finding.status]}
				</span>
			</div>
			<p class="detail"><span>Found</span>{finding.found}</p>
			<p class="detail"><span>Next</span>{finding.next}</p>
		</li>
	{/each}
</ol>

<style>
	.findings {
		display: grid;
		gap: 0.75rem;
	}

	@media (min-width: 48rem) {
		.findings {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	li {
		border: 1px solid var(--line);
		border-radius: 0.875rem;
		background: var(--bg-elevated);
		padding: 0.875rem 1rem 1rem;
	}

	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.name {
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--ink);
	}

	.chip {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		gap: 0.3125rem;
		border-radius: 999px;
		padding: 0.1875rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.chip.written {
		background: var(--accent-soft);
		color: var(--accent);
	}

	.chip.open {
		box-shadow: inset 0 0 0 1px var(--line-strong);
		color: var(--ink);
	}

	.hollow {
		width: 0.5rem;
		height: 0.5rem;
		border: 1.5px solid var(--accent);
		border-radius: 999px;
	}

	.detail {
		display: grid;
		grid-template-columns: 3.25rem minmax(0, 1fr);
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--ink);
	}

	.detail span {
		color: var(--ink-muted);
	}
</style>
