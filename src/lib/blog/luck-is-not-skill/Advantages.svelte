<script>
	import Icon from '$components/Icon.svelte';
	import Toggle from './Toggle.svelte';

	// The paper's spurious-variance example: eight correct attempts, standard-deviation normalized advantages.
	const options = [
		{ value: 'independent', label: 'Independent luck' },
		{ value: 'paired', label: 'Shared luck' }
	];
	const FLIPPED = 5;
	const TOP = 0.75;
	const BOTTOM = -2.75;

	let mode = $state('independent');
	let attempts = $derived(
		Array.from({ length: 8 }, (_, i) => {
			const flipped = mode === 'independent' && i === FLIPPED;
			return { i, flipped, advantage: mode === 'paired' ? 0 : flipped ? -2.47 : 0.35 };
		})
	);

	const at = (/** @type {number} */ value) => ((TOP - value) / (TOP - BOTTOM)) * 100;
	const zero = at(0);
</script>

<div class="advantages">
	<Toggle {options} bind:value={mode} label="How grading slips are drawn" />

	<div
		class="board"
		role="img"
		aria-label={mode === 'independent'
			? 'Eight attempts all solved the task. The grader misreports attempt 6 as a failure, so its advantage is −2.47 and each of the other seven gets +0.35.'
			: 'Eight attempts all solved the task. A shared slip hits all of them or none, so every advantage is 0.'}
	>
		<div class="labels" aria-hidden="true">
			<span class="row-label">Solved the task</span>
			<span class="row-label">Grader says</span>
			<span class="row-label track-label">Advantage</span>
			<span class="row-label">Attempt</span>
		</div>
		{#each attempts as attempt (attempt.i)}
			<div class="col" aria-hidden="true">
				<span class="mark"><Icon name="check" size={14} strokeWidth={3} /></span>
				<span class="mark" class:bad={attempt.flipped}
					><Icon name={attempt.flipped ? 'close' : 'check'} size={14} strokeWidth={3} /></span
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
					{#if attempt.flipped}
						<span class="value" style="top: calc({at(attempt.advantage)}% + 0.25rem)">−2.47</span>
					{:else if attempt.i === 0}
						<span class="value above" style="top: calc({at(attempt.advantage)}% - 1.25rem)"
							>{mode === 'paired' ? '0' : '+0.35'}</span
						>
					{/if}
				</div>
				<span class="name">{attempt.i + 1}</span>
			</div>
		{/each}
	</div>

	<p class="note" aria-live="polite">
		{#if mode === 'independent'}
			One grading slip makes a correct attempt the worst in its group. The update pushes its actions down
			(−2.47) and nudges the seven others up (+0.35 each), although all eight solved the task.
		{:else}
			A shared slip hits all eight attempts or none of them. Either way they all look the same, every
			advantage is 0, and the noise teaches the model nothing.
		{/if}
	</p>
</div>

<style>
	.advantages {
		--viz-fault: #eb6834;
		--track: 8.5rem;
	}

	:global(.dark) .advantages {
		--viz-fault: #d95926;
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
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.mark.bad {
		background: color-mix(in oklab, var(--viz-fault) 20%, var(--surface));
		color: var(--viz-fault);
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
		background: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
		transition:
			top 0.45s cubic-bezier(0.22, 1, 0.36, 1),
			height 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.bar.neg {
		border-radius: 0 0 4px 4px;
		background: var(--viz-fault);
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
	}

	.name {
		text-align: center;
		font-size: 0.75rem;
		color: var(--ink-muted);
		font-variant-numeric: tabular-nums;
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
