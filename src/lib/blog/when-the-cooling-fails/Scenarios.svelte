<script>
	import { scenarios } from './data.js';

	const systems = [
		{ id: 'cooling', label: 'Cooling' },
		{ id: 'power', label: 'Power' }
	];
	const levels = ['Easy', 'Medium', 'Hard'];
</script>

<div class="scenarios">
	{#each systems as system (system.id)}
		<section>
			<p class="title">{system.label}</p>
			<ol>
				{#each scenarios.filter((scenario) => scenario.system === system.id) as scenario (scenario.id)}
					<li class:hard={scenario.level === 3}>
						<p class="head">
							<span class="id">{scenario.id}</span>
							<span class="level">
								<span class="pips" aria-hidden="true">
									{#each [1, 2, 3] as pip (pip)}<i class:on={pip <= scenario.level}></i>{/each}
								</span>
								{levels[scenario.level - 1]}
							</span>
						</p>
						<p class="name">{scenario.name}</p>
						<p class="fault">{scenario.fault}</p>
						{#if scenario.level === 3}<p class="used">Used in the evaluation</p>{/if}
					</li>
				{/each}
			</ol>
		</section>
	{/each}
</div>

<style>
	.scenarios {
		display: grid;
		gap: 1.5rem;
	}

	.title {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	ol {
		display: grid;
		gap: 0.5rem;
	}

	li {
		border-radius: 0.75rem;
		background: var(--surface-2);
		padding: 0.75rem 0.875rem 0.8125rem;
	}

	li.hard {
		background: var(--surface);
		box-shadow: inset 0 0 0 1.5px var(--accent);
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.id {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-muted);
	}

	.level {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: var(--ink-muted);
	}

	.pips {
		display: inline-flex;
		gap: 2px;
	}

	.pips i {
		width: 0.375rem;
		height: 0.625rem;
		border-radius: 1.5px;
		background: color-mix(in oklab, var(--ink-muted) 25%, var(--surface));
	}

	.pips i.on {
		background: var(--ink-muted);
	}

	.name {
		margin-top: 0.25rem;
		font-size: 0.9375rem;
		font-weight: 600;
		line-height: 1.35;
		color: var(--ink);
	}

	.fault {
		margin-top: 0.125rem;
		font-size: 0.8125rem;
		line-height: 1.45;
		color: var(--ink-muted);
	}

	.used {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--accent);
	}

	@media (min-width: 36rem) {
		.scenarios {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}
	}
</style>
