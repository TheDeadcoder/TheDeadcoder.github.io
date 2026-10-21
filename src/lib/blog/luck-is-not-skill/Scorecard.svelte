<script>
	import Icon from '$components/Icon.svelte';

	// The paper's registered tests and outcomes (its Table 2), in plain words.
	const tests = [
		{
			name: 'Luck shows up in the rewards',
			rule: 'A luck share of at least 0.15 under tool faults; under grader flips, fake disagreement near 57% for independent groups and near zero for paired ones',
			result: 'Luck share 0.33 to 0.38; fake disagreement 55.8% versus 0%',
			verdict: 'pass'
		},
		{
			name: 'Gradient noise goes down',
			rule: 'A lower gradient covariance with pairing at every checkpoint under grader flips, and at most of them under tool faults',
			result: 'Lower at all eight checkpoints, under both kinds of noise',
			verdict: 'pass'
		},
		{
			name: 'Faster learning with tool faults',
			rule: 'Area under the validation curve at least 0.03 higher on average, with every seed ahead',
			result: '+0.037 on average, but one seed was 0.002 behind',
			verdict: 'miss'
		},
		{
			name: 'Faster learning with grader flips',
			rule: 'The same rule, scored on clean validation',
			result: '+0.003, with a 95% interval from −0.029 to +0.033',
			verdict: 'miss'
		},
		{
			name: 'Better recovery from faults',
			rule: 'At least 5 points ahead on the recovery challenge, with every seed ahead',
			result: '+5.4 points and every seed ahead, though the 95% interval (−1.0 to +12.2) includes zero',
			verdict: 'rule'
		},
		{
			name: 'No loss on unseen fault types',
			rule: 'No more than 3 points behind, judged by the lower end of a 90% interval',
			result: '+2.3 points, lower end −0.4',
			verdict: 'pass'
		}
	];

	const verdicts = /** @type {Record<string, { icon: string, label: string }>} */ ({
		pass: { icon: 'check', label: 'Pass' },
		rule: { icon: 'check', label: 'Pass by its rule' },
		miss: { icon: 'close', label: 'Miss' }
	});
</script>

<ol class="scorecard">
	{#each tests as test (test.name)}
		<li>
			<div class="head">
				<p class="name">{test.name}</p>
				<span class="chip {test.verdict}">
					<Icon name={verdicts[test.verdict].icon} size={12} strokeWidth={3.25} />
					{verdicts[test.verdict].label}
				</span>
			</div>
			<p class="detail"><span>Needed</span>{test.rule}</p>
			<p class="detail"><span>Got</span>{test.result}</p>
		</li>
	{/each}
</ol>

<style>
	.scorecard {
		--viz-fault: #eb6834;
		display: grid;
		gap: 0.75rem;
	}

	:global(.dark) .scorecard {
		--viz-fault: #d95926;
	}

	@media (min-width: 48rem) {
		.scorecard {
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

	.chip.pass,
	.chip.rule {
		background: var(--accent-soft);
		color: var(--accent);
	}

	.chip.rule {
		box-shadow: inset 0 0 0 1px color-mix(in oklab, var(--accent) 45%, transparent);
		background: transparent;
	}

	.chip.miss {
		background: color-mix(in oklab, var(--viz-fault) 16%, var(--surface));
		color: var(--ink);
	}

	.chip.miss :global(svg) {
		color: var(--viz-fault);
	}

	.detail {
		display: grid;
		grid-template-columns: 3.5rem minmax(0, 1fr);
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--ink);
	}

	.detail span {
		color: var(--ink-muted);
	}
</style>
