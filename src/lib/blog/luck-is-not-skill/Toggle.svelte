<script>
	/**
	 * A two-way switch for a figure's view.
	 * @type {{ options: { value: string, label: string }[], value: string, label: string }}
	 */
	let { options, value = $bindable(), label } = $props();
</script>

<div class="toggle" role="group" aria-label={label}>
	{#each options as option (option.value)}
		<button type="button" aria-pressed={value === option.value} onclick={() => (value = option.value)}>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.toggle {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 2px;
		padding: 3px;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--surface-2);
	}

	button {
		padding: 0.3125rem 0.875rem;
		border-radius: 999px;
		font-size: 0.8125rem;
		font-weight: 500;
		line-height: 1.35;
		color: var(--ink-muted);
		cursor: pointer;
		transition:
			background-color 0.2s,
			color 0.2s,
			box-shadow 0.2s;
	}

	button:hover {
		color: var(--ink);
	}

	button[aria-pressed='true'] {
		background: var(--surface);
		color: var(--ink);
		box-shadow: 0 1px 3px hsl(var(--shadow-color) / 0.22);
	}
</style>
