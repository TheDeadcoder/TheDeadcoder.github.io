<script>
	import Icon from '$components/Icon.svelte';
	import { example } from './data.js';

	// The post's example group in miniature: the PR's own tests against the full suite.
	const rows = [
		{ label: 'PR’s own tests', verdicts: example.pr.map((pass) => ({ pass: pass === 1, flip: false })) },
		{
			label: 'Full suite',
			verdicts: example.full.map((pass, i) => ({ pass: pass === 1, flip: example.pr[i] === 1 && pass === 0 }))
		}
	];
</script>

<div class="cover" aria-hidden="true">
	<div class="group">
		{#each rows as row (row.label)}
			<div class="row">
				<span class="label">{row.label}</span>
				<div class="cells">
					{#each row.verdicts as verdict, i (i)}
						<span class="cell" class:pass={verdict.pass} class:flip={verdict.flip}>
							<Icon name={verdict.pass ? 'check' : 'close'} strokeWidth={3.25} />
						</span>
					{/each}
				</div>
			</div>
		{/each}
		<span class="audit">Audit the whole group</span>
	</div>
</div>

<style>
	.cover {
		--viz-good: #00785a;
		--viz-flip: #eb6834;
		--cell: clamp(10px, min(11cqh, 7.5cqw), 30px);
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		padding: 0.75rem;
		container-type: size;
	}

	:global(.dark) .cover {
		--viz-good: #3aa880;
		--viz-flip: #d95926;
	}

	.group {
		position: relative;
		display: grid;
		gap: calc(var(--cell) * 0.45);
		border: 1.5px solid var(--line-strong);
		border-radius: calc(var(--cell) * 0.55);
		padding: calc(var(--cell) * 0.6) calc(var(--cell) * 0.7) calc(var(--cell) * 0.9);
		background: var(--surface);
	}

	.row {
		display: grid;
		gap: calc(var(--cell) * 0.2);
	}

	.label {
		font-size: clamp(9px, calc(var(--cell) * 0.42), 13px);
		font-weight: 500;
		color: var(--ink-muted);
	}

	.cells {
		display: grid;
		grid-template-columns: repeat(8, var(--cell));
		gap: calc(var(--cell) * 0.18);
	}

	.cell {
		display: grid;
		place-items: center;
		width: var(--cell);
		height: var(--cell);
		border-radius: calc(var(--cell) * 0.22);
		background: color-mix(in oklab, var(--ink-muted) 22%, var(--surface-2));
		color: var(--ink-muted);
	}

	.cell.pass {
		background: color-mix(in oklab, var(--viz-good) 18%, var(--surface));
		color: var(--viz-good);
	}

	.cell.flip {
		background: var(--viz-flip);
		color: var(--surface);
	}

	.cell :global(svg) {
		width: 60%;
		height: 60%;
	}

	.audit {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
		border: 1.5px solid var(--line-strong);
		border-radius: 999px;
		background: var(--surface);
		padding: 0.15em 0.75em;
		font-size: clamp(9px, calc(var(--cell) * 0.42), 13px);
		font-weight: 600;
		color: var(--ink);
		white-space: nowrap;
	}
</style>
