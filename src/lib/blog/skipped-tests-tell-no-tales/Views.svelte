<script>
	// An illustrative history: six tests over eight builds, seen when the selector picks tests for build 9.
	// Builds 7 and 8 have started but not finished. 'f' marks a failure; `ran` lists the builds in which a
	// faithful selector actually ran the test (builds 1 and 2 run everything).
	const BUILDS = 8;
	const RUNNING = [7, 8];
	const tests = [
		{ name: 'Test 1', fails: [], ran: [1, 2, 3, 4, 5, 6, 7, 8] },
		{ name: 'Test 2', fails: [], ran: [1, 2, 3, 5, 7] },
		{ name: 'Test 3', fails: [4], ran: [1, 2, 3, 4, 5, 6, 8] },
		{ name: 'Test 4', fails: [7], ran: [1, 2, 6, 7] },
		{ name: 'Test 5', fails: [6], ran: [1, 2] },
		{ name: 'Test 6', fails: [], ran: [1, 2, 4, 8] }
	];

	const views = [
		{ key: 'full', title: 'Full replay', text: 'Every result of every earlier build' },
		{ key: 'timed', title: 'Finished builds only', text: 'Hides builds still running' },
		{ key: 'faithful', title: 'Faithful replay', text: 'Also hides the tests it skipped' }
	];

	const builds = Array.from({ length: BUILDS }, (_, i) => i + 1);

	/**
	 * @param {string} view
	 * @param {(typeof tests)[number]} test
	 * @param {number} build
	 */
	function visibility(view, test, build) {
		if (view !== 'full' && RUNNING.includes(build)) return 'unseen';
		if (view === 'faithful' && !test.ran.includes(build)) return 'unseen';
		return test.fails.includes(build) ? 'fail' : 'pass';
	}

	const word = { pass: 'passed', fail: 'failed', unseen: 'not visible' };

	/** @param {string} view */
	const failures = (view) =>
		tests.reduce((n, test) => n + test.fails.filter((b) => visibility(view, test, b) === 'fail').length, 0);

	/**
	 * @param {(typeof tests)[number]} test
	 * @param {number} build
	 */
	function explain(test, build) {
		const outcome = test.fails.includes(build) ? 'failed' : 'passed';
		const running = RUNNING.includes(build);
		const ran = test.ran.includes(build);
		const head = `${test.name}, build ${build}: ${outcome}.`;
		if (running) return `${head} The build was still running, so only the full replay shows it.`;
		if (!ran) return `${head} A faithful selector skipped this test here, so it never learns the result.`;
		return `${head} The test ran in a finished build, so every replay shows it.`;
	}

	/** @type {string} */
	let readout = $state('');
</script>

<div class="views">
	<div class="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-ink-muted" aria-hidden="true">
		<span class="inline-flex items-center gap-2"><i class="key pass"></i>Passed</span>
		<span class="inline-flex items-center gap-2"><i class="key fail"></i>Failed</span>
		<span class="inline-flex items-center gap-2"><i class="key unseen"></i>Not visible to the selector</span>
	</div>

	<div class="panels">
		{#each views as view (view.key)}
			<table class="panel">
				<caption>
					<span class="block text-sm font-semibold text-ink">{view.title}</span>
					<span class="block text-[12.5px] leading-snug text-ink-muted">{view.text}</span>
				</caption>
				<thead>
					<tr>
						<td></td>
						{#each builds as build (build)}
							<th scope="col" class:running={RUNNING.includes(build)}>
								<span class="sr-only">Build </span>{build}
							</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each tests as test (test.name)}
						<tr>
							<th scope="row">{test.name.replace('Test ', 'T')}<span class="sr-only">, {test.name}</span></th>
							{#each builds as build (build)}
								{@const s = visibility(view.key, test, build)}
								<td>
									<span
										class="cell {s}"
										role="img"
										aria-label="{test.name}, build {build}: {word[s]}"
										tabindex="-1"
										onpointerenter={() => (readout = explain(test, build))}
										onpointerleave={() => (readout = '')}
									></span>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
			<p class="count sr-only">{view.title}: {failures(view.key)} failures visible.</p>
		{/each}
	</div>

	<div class="foot">
		<p class="text-[13px] leading-snug text-ink-muted" aria-live="polite">
			{#if readout}
				{readout}
			{:else}
				Builds 7 and 8 are still running when the selector picks tests for build 9. Failures it can see:
				<strong class="font-semibold text-ink">3</strong> in the full replay,
				<strong class="font-semibold text-ink">2</strong> with finished builds only,
				<strong class="font-semibold text-ink">1</strong> in the faithful replay.
			{/if}
		</p>
	</div>
</div>

<style>
	.views {
		--viz-err: #eb6834;
		--cell: 1.125rem;
	}

	:global(.dark) .views {
		--viz-err: #d95926;
	}

	.panels {
		display: grid;
		gap: 1.5rem;
	}

	@media (min-width: 48rem) {
		.panels {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	.panel {
		border-collapse: separate;
		border-spacing: 3px;
		margin-inline: auto;
	}

	caption {
		min-height: 3.5rem;
		padding-bottom: 0.5rem;
		text-align: left;
	}

	thead th {
		padding-bottom: 0.125rem;
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: center;
		font-variant-numeric: tabular-nums;
	}

	thead th.running {
		color: var(--ink);
		box-shadow: inset 0 -2px 0 var(--line-strong);
	}

	tbody th {
		padding-right: 0.375rem;
		font-size: 0.6875rem;
		font-weight: 500;
		color: var(--ink-muted);
		text-align: right;
	}

	td {
		padding: 0;
	}

	.cell {
		display: block;
		width: var(--cell);
		height: var(--cell);
		border-radius: 4px;
		transition: transform 120ms;
	}

	.cell:hover {
		transform: scale(1.15);
	}

	.cell.pass,
	.key.pass {
		background: color-mix(in oklab, var(--ink-muted) 28%, var(--surface-2));
	}

	.cell.fail,
	.key.fail {
		background: var(--viz-err);
	}

	.cell.unseen,
	.key.unseen {
		background: transparent;
		box-shadow: inset 0 0 0 1.5px color-mix(in oklab, var(--ink-muted) 55%, transparent);
	}

	.key {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 3px;
	}

	.foot {
		min-height: 2.75rem;
		margin-top: 1rem;
		border-top: 1px solid var(--line);
		padding-top: 0.75rem;
	}
</style>
