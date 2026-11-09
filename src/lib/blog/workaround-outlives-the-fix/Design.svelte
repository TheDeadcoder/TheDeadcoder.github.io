<script>
	// Two teams on the same ticket schedule; only the guard differs.
	const arms = [
		{
			key: 'over',
			title: 'Over-blocking guard',
			text: 'Wrongly blocks three harmless files the tickets need'
		},
		{
			key: 'repaired',
			title: 'Repaired guard',
			text: 'Lets those three through and decides everything else the same way'
		}
	];
	const shifts = [1, 2, 3, 4];
</script>

<div class="design">
	{#each arms as arm (arm.key)}
		<div class="arm {arm.key}">
			<p class="label">
				<span class="block text-sm font-semibold text-ink">{arm.title}</span>
				<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">{arm.text}</span>
			</p>
			<ol class="row" aria-label="{arm.title}: four shifts">
				{#each shifts as shift (shift)}
					<li><span>Shift {shift}</span></li>
				{/each}
			</ol>
		</div>
	{/each}
	<p class="foot">
		Arrows carry the team's notes, the only thing one shift passes to the next. Both teams get the
		same tickets in the same order.
	</p>
</div>

<style>
	.design {
		display: grid;
		gap: 1.25rem;
	}

	.arm {
		display: grid;
		gap: 0.625rem;
	}

	.row {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.875rem;
	}

	.row li {
		position: relative;
		display: grid;
		place-items: center;
		height: 2.75rem;
		border-radius: 0.625rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--ink);
	}

	.over .row li {
		background: color-mix(in oklab, #eb6834 18%, var(--surface));
	}

	.repaired .row li {
		background: var(--accent-soft);
	}

	.row li:not(:last-child)::after {
		content: '';
		position: absolute;
		top: 50%;
		right: -0.75rem;
		width: 0.4rem;
		height: 0.4rem;
		border-top: 1.5px solid var(--line-strong);
		border-right: 1.5px solid var(--line-strong);
		transform: translateY(-50%) rotate(45deg);
	}

	.foot {
		border-top: 1px solid var(--line);
		padding-top: 0.875rem;
		font-size: 0.8125rem;
		line-height: 1.5;
		color: var(--ink-muted);
	}

	@media (min-width: 40rem) {
		.arm {
			grid-template-columns: 12rem minmax(0, 1fr);
			align-items: center;
			gap: 1.25rem;
		}

		.row {
			gap: 1.25rem;
		}

		.row li:not(:last-child)::after {
			right: -0.95rem;
		}
	}
</style>
