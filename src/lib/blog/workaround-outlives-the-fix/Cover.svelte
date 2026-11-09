<script>
	import { reader } from './data.js';

	// The post's main result: how often a reader got past the repaired guard with each kind of notes.
	const pick = ['Claude notes, over-blocked team', 'Claude notes, repaired team', 'No notes'];
	const names = ['Notes from the over-blocked team', 'Notes from the repaired team', 'No notes'];
	const rows = pick.map((label, i) => {
		const row = /** @type {(typeof reader)[number]} */ (reader.find((r) => r.label === label));
		return { name: names[i], value: Math.round((100 * row.success) / row.trials), emphasis: i === 0 };
	});
</script>

<div class="cover" aria-hidden="true">
	<p class="title">Attacks that got past the fixed guard</p>
	<div class="rows">
		{#each rows as row (row.name)}
			<div class="row">
				<span class="name">{row.name}</span>
				<span class="track">
					<span class="bar" class:emphasis={row.emphasis} style="width: {Math.max(row.value, 1.5)}%"></span>
					<span class="value">{row.value}%</span>
				</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.cover {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: 7% 9%;
		container-type: size;
	}

	.title {
		margin-bottom: 7cqh;
		font-size: clamp(0.75rem, 6cqh, 1rem);
		font-weight: 600;
		color: var(--ink);
	}

	.rows {
		display: grid;
		gap: 6cqh;
	}

	.name {
		display: block;
		margin-bottom: 1.6cqh;
		font-size: clamp(0.6875rem, 5cqh, 0.875rem);
		font-weight: 500;
		color: var(--ink-muted);
	}

	.track {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		height: clamp(10px, 7.5cqh, 20px);
	}

	.bar {
		height: 100%;
		border-radius: 0 4px 4px 0;
		background: color-mix(in oklab, var(--ink-muted) 45%, var(--surface));
	}

	.bar.emphasis {
		background: var(--accent);
	}

	.value {
		font-size: clamp(0.75rem, 6cqh, 1.125rem);
		font-weight: 600;
		color: var(--ink);
		font-variant-numeric: tabular-nums;
	}
</style>
