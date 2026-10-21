<script>
	import Icon from '$components/Icon.svelte';

	// The opening screen of A2 as the simulator renders it, condensed, and the reply the
	// model wrote for that screen in the check right after imitation training.
	const units = [
		{ unit: 'CRAC-1', status: 'RUNNING', setpoint: '18.0°C', supply: '18.0°C', power: '29.1', fault: false },
		{ unit: 'CRAC-2', status: 'RUNNING', setpoint: '18.0°C', supply: '18.0°C', power: '29.1', fault: false },
		{ unit: 'CRAC-3', status: '!! COMPRESSOR', setpoint: '18.0°C', supply: '---', power: '0.0', fault: true },
		{ unit: 'CRAC-4', status: 'RUNNING', setpoint: '18.0°C', supply: '18.0°C', power: '29.1', fault: false }
	];
	const zones = [
		{ zone: 'zone_a', cold: '19.8°C', hot: '30.8°C', inlet: '19.8°C' },
		{ zone: 'zone_b', cold: '19.8°C', hot: '30.8°C', inlet: '19.8°C' }
	];
	const reasoning = [
		'1. Situation: CRAC-3 compressor failure detected, causing potential cooling issues in Zone B.',
		'2. Constraint: Operational procedure requires diagnosing faulty units before compensating.',
		'3. Step: Assess -> diagnose.',
		'4. Action: Diagnose CRAC-3 to understand the extent of the failure and determine next steps.'
	];
</script>

<div class="dashboard">
	<section class="side">
		<p class="label">What the model reads</p>
		<div class="screen">
			<p class="meta">Action Result: Environment initialized. Awaiting your command.</p>
			<p class="meta">Steps Remaining: 15</p>

			<p class="head">
				<span>DC-OPS MONITORING DASHBOARD</span>
				<span class="muted">Step: 0/15</span>
			</p>
			<p class="alert">
				!! ALERT: CRITICAL: CRAC-3 compressor failure detected. Zone B temperatures rising.
				Investigate and stabilize.
			</p>

			<p class="section">COOLING UNITS</p>
			<table>
				<caption class="sr-only">Cooling units</caption>
				<thead>
					<tr>
						<th scope="col">Unit</th>
						<th scope="col">Status</th>
						<th scope="col">Setpoint</th>
						<th scope="col">Supply</th>
						<th scope="col" class="num">kW</th>
					</tr>
				</thead>
				<tbody>
					{#each units as row (row.unit)}
						<tr class:fault={row.fault}>
							<th scope="row">{row.unit}</th>
							<td>{row.status}</td>
							<td>{row.setpoint}</td>
							<td>{row.supply}</td>
							<td class="num">{row.power}</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<p class="section">ZONE TEMPERATURES</p>
			<table>
				<caption class="sr-only">Zone temperatures</caption>
				<thead>
					<tr>
						<th scope="col">Zone</th>
						<th scope="col">Cold Aisle</th>
						<th scope="col">Hot Aisle</th>
						<th scope="col">Max Inlet</th>
					</tr>
				</thead>
				<tbody>
					{#each zones as row (row.zone)}
						<tr>
							<th scope="row">{row.zone}</th>
							<td>{row.cold}</td>
							<td>{row.hot}</td>
							<td>{row.inlet}</td>
						</tr>
					{/each}
				</tbody>
			</table>

			<p class="section">POWER</p>
			<p>IT Load: 160.0 kW | Cooling: 87.2 kW | PUE: 1.73</p>
			<p>Utility: NORMAL | Gen: OFF | ATS: UTILITY</p>
		</div>
	</section>

	<span class="arrow" aria-hidden="true"><Icon name="arrowRight" size={18} /></span>

	<section class="side">
		<p class="label">What it writes back</p>
		<div class="reply">
			<p class="tag">&lt;reasoning&gt;</p>
			{#each reasoning as line (line)}
				<p>{line}</p>
			{/each}
			<p class="tag">&lt;/reasoning&gt;</p>
			<p class="tag">&lt;command&gt;</p>
			<p><span class="command">diagnose CRAC-3</span></p>
			<p class="tag">&lt;/command&gt;</p>
		</div>
	</section>
</div>

<style>
	.dashboard {
		--viz-fault: #eb6834;
		display: grid;
		gap: 0.75rem;
	}

	:global(.dark) .dashboard {
		--viz-fault: #d95926;
	}

	.side {
		min-width: 0;
	}

	.label {
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--ink);
	}

	.screen,
	.reply {
		border-radius: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		line-height: 1.6;
		color: var(--ink);
	}

	.screen {
		overflow-x: auto;
		background: var(--surface-2);
		padding: 0.875rem 0.75rem 1rem;
	}

	.meta {
		color: var(--ink-muted);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0 1rem;
		margin-top: 0.75rem;
		border-top: 1px solid var(--line-strong);
		padding-top: 0.625rem;
		font-weight: 500;
	}

	.muted {
		color: var(--ink-muted);
	}

	.alert {
		margin-top: 0.5rem;
		border-left: 3px solid var(--viz-fault);
		border-radius: 2px;
		background: color-mix(in oklab, var(--viz-fault) 14%, var(--surface-2));
		padding: 0.375rem 0.625rem;
	}

	.section {
		margin-top: 0.875rem;
		font-weight: 500;
		color: var(--ink-muted);
	}

	table {
		margin-top: 0.125rem;
		border-collapse: collapse;
		white-space: nowrap;
	}

	th,
	td {
		padding: 0.0625rem 0.625rem 0.0625rem 0;
		font-weight: 400;
		text-align: left;
	}

	@media (min-width: 40rem) {
		th,
		td {
			padding-right: 1.125rem;
		}
	}

	thead th {
		color: var(--ink-muted);
	}

	.num {
		padding-right: 0;
		text-align: right;
	}

	tr.fault th,
	tr.fault td {
		background: color-mix(in oklab, var(--viz-fault) 14%, var(--surface-2));
		font-weight: 500;
	}

	.arrow {
		display: grid;
		place-items: center;
		color: var(--ink-muted);
		transform: rotate(90deg);
	}

	.reply {
		border: 1px solid var(--line);
		background: var(--surface);
		padding: 0.875rem 1rem 1rem;
		font-size: 0.75rem;
		line-height: 1.65;
	}

	.reply p + p {
		margin-top: 0.125rem;
	}

	.tag {
		color: var(--ink-muted);
	}

	.command {
		display: inline-block;
		margin-block: 0.125rem;
		border-radius: 0.375rem;
		background: var(--accent-soft);
		padding: 0.125rem 0.5rem;
		font-weight: 500;
		color: var(--accent);
	}

	@media (min-width: 64rem) {
		.dashboard {
			grid-template-columns: minmax(0, 1.35fr) auto minmax(0, 1fr);
			align-items: start;
			gap: 0.875rem;
		}

		.arrow {
			align-self: center;
			transform: none;
		}
	}
</style>
