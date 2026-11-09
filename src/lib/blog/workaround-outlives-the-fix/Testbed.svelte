<script>
	// How one command moves through SwarmGate.
	const steps = [
		{ title: 'The agent', text: 'Works its tickets with one shell tool, up to 40 commands a shift' },
		{ title: 'A sealed sandbox', text: 'The command really runs, with no internet, and every system call is traced' },
		{ title: 'The guard', text: 'Reads what the command actually did, not how it was typed' }
	];
</script>

<div class="testbed">
	<ol class="steps">
		{#each steps as step, i (step.title)}
			<li>
				<span class="num" aria-hidden="true">{i + 1}</span>
				<span class="block text-sm font-semibold text-ink">{step.title}</span>
				<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">{step.text}</span>
			</li>
		{/each}
	</ol>

	<div class="outcomes">
		<p class="allow">
			<span class="block text-sm font-semibold text-ink">Allowed</span>
			<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">
				Files and messages go through
			</span>
		</p>
		<p class="deny">
			<span class="block text-sm font-semibold text-ink">Denied</span>
			<span class="mt-0.5 block text-[13px] leading-snug text-ink-muted">
				The workspace is rolled back, and the agent sees “Tool call not approved.”
			</span>
		</p>
	</div>
</div>

<style>
	.steps {
		display: grid;
		gap: 0.75rem;
	}

	.steps li {
		position: relative;
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

	.outcomes {
		display: grid;
		gap: 0.75rem;
		margin-top: 0.75rem;
	}

	.outcomes p {
		border-radius: 0.75rem;
		padding: 0.75rem 0.875rem;
	}

	.allow {
		border: 1.5px solid color-mix(in oklab, var(--accent) 55%, var(--line));
	}

	.deny {
		border: 1.5px dashed var(--line-strong);
	}

	@media (min-width: 40rem) {
		.steps {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}

		.steps li:not(:last-child)::after {
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

		.outcomes {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.25rem;
			margin-top: 1.25rem;
		}
	}
</style>
