<script>
	// The three training phases. The first and the last run inside the simulator.
	const phases = [
		{
			title: 'A teacher plays',
			text: 'DeepSeek-R1-Distill-Qwen-32B plays live episodes and explains every move',
			stat: '1,083 episodes kept',
			inside: true
		},
		{
			title: 'The student imitates',
			text: 'Qwen2.5-7B-Instruct learns to write the reasoning and the command',
			stat: '7,107 turns',
			inside: false
		},
		{
			title: 'The student practises',
			text: 'GRPO: eight replies to each screen, each run in its own copy of the simulator and scored',
			stat: '510 prompts',
			inside: true
		}
	];
</script>

<div class="pipeline">
	<ol class="phases">
		{#each phases as phase, i (phase.title)}
			<li class:inside={phase.inside}>
				<span class="num" aria-hidden="true">{i + 1}</span>
				<span class="block text-sm font-semibold text-ink">{phase.title}</span>
				<span class="mt-0.5 block grow text-[13px] leading-snug text-ink-muted">{phase.text}</span>
				<span class="stat">{phase.stat}</span>
			</li>
		{/each}
	</ol>

	<p class="sim">
		<span class="block text-sm font-semibold text-ink">DC-Ops simulator</span>
		<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">
			The teacher plays in it, and it scores every reply during RL
		</span>
	</p>
</div>

<style>
	.phases {
		display: grid;
		gap: 0.75rem;
	}

	.phases li {
		position: relative;
		display: flex;
		flex-direction: column;
		border-radius: 0.75rem;
		background: var(--surface-2);
		padding: 0.75rem 0.875rem 0.875rem;
	}

	.num {
		display: inline-grid;
		place-items: center;
		width: 1.375rem;
		height: 1.375rem;
		margin-bottom: 0.5rem;
		border-radius: 999px;
		background: var(--accent-soft);
		color: var(--accent);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.stat {
		align-self: flex-start;
		margin-top: 0.75rem;
		border-radius: 999px;
		background: var(--surface);
		padding: 0.1875rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}

	.sim {
		margin-top: 0.75rem;
		border: 1.5px dashed var(--line-strong);
		border-radius: 0.75rem;
		padding: 0.75rem 0.875rem;
	}

	@media (min-width: 40rem) {
		.phases {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}

		.phases li:not(:last-child)::after {
			content: '';
			position: absolute;
			top: 50%;
			right: -0.9rem;
			width: 0.5rem;
			height: 0.5rem;
			border-top: 1.5px solid var(--line-strong);
			border-right: 1.5px solid var(--line-strong);
			transform: translateY(-50%) rotate(45deg);
		}

		.phases li.inside::before {
			content: '';
			position: absolute;
			bottom: -1.25rem;
			left: 50%;
			width: 1.5px;
			height: 1.25rem;
			background: var(--line-strong);
		}

		.sim {
			margin-top: 1.25rem;
			text-align: center;
		}
	}
</style>
