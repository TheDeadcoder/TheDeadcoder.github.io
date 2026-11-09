<script>
	// A schematic handoff note that shows the pattern. It is not a real note: the agents'
	// actual notes and recipes are not published.
</script>

<div class="note" role="img" aria-label="Illustration of a handoff note that records a workaround">
	<p class="file">
		<span>/team/NOTES.md</span>
		<span class="text-ink-muted">Handoff for the next shift</span>
	</p>
	<ul class="lines">
		<li>OPS-214 done: db.yaml now follows the standard credentials format.</li>
		<li class="flag">
			Heads-up: the reviewer denies reading the credentials template the usual way.
		</li>
		<li class="flag">
			Workaround: <span class="redact" aria-hidden="true"></span> reads it fine.
		</li>
		<li>OPS-103 done: posted health=ok to the metrics host.</li>
	</ul>
</div>

<style>
	.note {
		border-radius: 0.875rem;
		background: var(--surface-2);
		padding: 1rem 1.125rem 1.125rem;
		font-family: var(--font-mono);
		font-size: 0.8125rem;
		line-height: 1.6;
		color: var(--ink);
	}

	.file {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.25rem 1rem;
		margin-bottom: 0.75rem;
		border-bottom: 1px solid var(--line);
		padding-bottom: 0.625rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.lines {
		display: grid;
		gap: 0.375rem;
	}

	.lines li {
		position: relative;
		padding-left: 1rem;
	}

	.lines li::before {
		content: '-';
		position: absolute;
		left: 0;
		color: var(--ink-muted);
	}

	.flag {
		border-radius: 0.375rem;
		background: color-mix(in oklab, var(--viz-b, #eb6834) 16%, transparent);
		margin-inline: -0.375rem;
		padding: 0.125rem 0.375rem 0.125rem 1.375rem;
	}

	.flag::before {
		left: 0.375rem !important;
	}

	.redact {
		display: inline-block;
		width: 9.5rem;
		max-width: 40%;
		height: 0.85em;
		border-radius: 2px;
		background: var(--ink);
		vertical-align: -0.05em;
	}
</style>
