<script>
	import Icon from '$components/Icon.svelte';
	import Toggle from './Toggle.svelte';
	import { example } from './data.js';

	// Mean-centred advantages of an illustrative group of eight attempts.
	const options = [
		{ value: 'pr', label: 'PR’s own tests' },
		{ value: 'full', label: 'Full suite' }
	];
	const TOP = 0.85;
	const BOTTOM = -1.1;

	let mode = $state('pr');
	let labelled = $derived(mode === 'pr' ? [0, 6] : [0, 1]);
	let rewards = $derived(mode === 'pr' ? example.pr : example.full);
	let mean = $derived(rewards.reduce((sum, r) => sum + r, 0) / rewards.length);
	let attempts = $derived(
		rewards.map((reward, i) => ({
			i,
			pr: example.pr[i] === 1,
			full: example.full[i] === 1,
			flip: example.pr[i] === 1 && example.full[i] === 0,
			advantage: reward - mean
		}))
	);

	const at = (/** @type {number} */ value) => ((TOP - value) / (TOP - BOTTOM)) * 100;
	const zero = at(0);
	const signed = (/** @type {number} */ value) =>
		`${value > 0 ? '+' : value < 0 ? '−' : ''}${Number(Math.abs(value).toFixed(3))}`;
</script>

<div class="verdicts">
	<div class="control">
		<span class="control-label" aria-hidden="true">Reward from</span>
		<Toggle {options} bind:value={mode} label="Which tests decide the reward" />
	</div>

	<div
		class="board"
		role="img"
		aria-label={mode === 'pr'
			? 'Eight attempts. Six pass the PR’s own tests and each gets an advantage of +0.25, including attempts 2, 4 and 6, which break other tests. Attempts 7 and 8 get −0.75.'
			: 'Eight attempts. The full suite passes only attempts 1, 3 and 5, which get +0.625. Attempts 2, 4 and 6 break other tests and get −0.375, like attempts 7 and 8.'}
	>
		<div class="labels" aria-hidden="true">
			<span class="row-label">PR’s own tests</span>
			<span class="row-label">Full suite</span>
			<span class="row-label">Advantage</span>
			<span class="row-label">Attempt</span>
		</div>
		{#each attempts as attempt (attempt.i)}
			<div class="col" class:flip={attempt.flip} aria-hidden="true">
				<span class="mark" class:pass={attempt.pr}
					><Icon name={attempt.pr ? 'check' : 'close'} size={14} strokeWidth={3} /></span
				>
				<span class="mark" class:pass={attempt.full} class:broken={attempt.flip}
					><Icon name={attempt.full ? 'check' : 'close'} size={14} strokeWidth={3} /></span
				>
				<div class="track">
					<span class="zero" style="top: {zero}%"></span>
					<span
						class="bar"
						class:neg={attempt.advantage < 0}
						style="top: {Math.min(at(attempt.advantage), zero)}%; height: {Math.abs(
							at(attempt.advantage) - zero
						)}%"
					></span>
					{#if labelled.includes(attempt.i)}
						<span
							class="value"
							style="top: calc({at(attempt.advantage)}% {attempt.advantage < 0
								? '+ 0.3rem'
								: '- 1.3rem'})">{signed(attempt.advantage)}</span
						>
					{/if}
				</div>
				<span class="name">{attempt.i + 1}</span>
			</div>
		{/each}
	</div>

	<div class="legend" aria-hidden="true">
		<span><i class="swatch good"></i>Reinforced</span>
		<span><i class="swatch neutral"></i>Discouraged</span>
		<span><i class="swatch flip"></i>Flip: passes the PR’s tests, breaks others</span>
	</div>

	<p class="note" aria-live="polite">
		{#if mode === 'pr'}
			The PR’s own tests pass six attempts, so each gets +0.25. Attempts 2, 4 and 6 break other tests in
			the repository, yet training pushes the model toward them exactly as hard as toward the three
			correct fixes.
		{:else}
			The full suite catches attempts 2, 4 and 6. The three correct fixes now get +0.625, and the three
			that break other code are pushed down (−0.375), together with the two that failed outright.
		{/if}
	</p>
</div>

<style>
	.verdicts {
		--viz-good: #00785a;
		--viz-flip: #eb6834;
		--track: 8rem;
	}

	:global(.dark) .verdicts {
		--viz-good: #3aa880;
		--viz-flip: #d95926;
	}

	.control {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem 0.75rem;
	}

	.control-label {
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--ink-muted);
	}

	.board {
		display: grid;
		grid-template-columns: auto repeat(8, minmax(0, 1fr));
		column-gap: clamp(2px, 1vw, 10px);
		margin-top: 1.5rem;
	}

	.labels,
	.col {
		display: grid;
		grid-template-rows: 1.75rem 1.75rem var(--track) 1.5rem;
		row-gap: 0.375rem;
		align-items: center;
	}

	.col {
		border-radius: 0.625rem;
		padding-block: 0.25rem;
		transition: background-color 0.3s ease;
	}

	.col.flip {
		background: color-mix(in oklab, var(--viz-flip) 9%, transparent);
	}

	.row-label {
		padding-right: 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		line-height: 1.2;
		color: var(--ink-muted);
	}

	.mark {
		display: grid;
		place-items: center;
		width: 1.625rem;
		height: 1.625rem;
		justify-self: center;
		border-radius: 999px;
		background: var(--surface-2);
		color: var(--ink-muted);
	}

	.mark.pass {
		background: color-mix(in oklab, var(--viz-good) 16%, var(--surface));
		color: var(--viz-good);
	}

	.mark.broken {
		background: color-mix(in oklab, var(--viz-flip) 20%, var(--surface));
		color: var(--viz-flip);
	}

	.track {
		position: relative;
		height: 100%;
	}

	.zero {
		position: absolute;
		inset-inline: -0.25rem;
		height: 1px;
		background: var(--line-strong);
	}

	.bar {
		position: absolute;
		left: 50%;
		width: min(70%, 1.25rem);
		transform: translateX(-50%);
		border-radius: 4px 4px 0 0;
		background: var(--viz-good);
		transition:
			top 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			background-color 0.3s ease;
	}

	.bar.neg {
		border-radius: 0 0 4px 4px;
		background: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
	}

	.value {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
		transition: top 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.name {
		text-align: center;
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
	}

	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem 1.25rem;
		margin-top: 1rem;
		font-size: 0.8125rem;
		color: var(--ink-muted);
	}

	.legend span {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.swatch {
		display: inline-block;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 3px;
	}

	.swatch.good {
		background: var(--viz-good);
	}

	.swatch.neutral {
		background: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
	}

	.swatch.flip {
		background: color-mix(in oklab, var(--viz-flip) 20%, var(--surface));
		box-shadow: inset 0 0 0 1.5px var(--viz-flip);
	}

	.note {
		margin-top: 1rem;
		border-top: 1px solid var(--line);
		padding-top: 0.875rem;
		font-size: 0.875rem;
		line-height: 1.55;
		color: var(--ink);
	}

	@media (max-width: 30rem) {
		.row-label {
			max-width: 4.5rem;
			padding-right: 0.375rem;
			font-size: 0.6875rem;
		}
	}
</style>
