<script>
	import Icon from '../Icon.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { isSettled, statusLabel } from '$lib/status.js';

	/** @type {{ items: (typeof import('$data/opensource.js').allOpenSource) }} */
	let { items } = $props();

	// Counted from link labels, which read "Issue #N" or "Pull request #N".
	let links = $derived(
		items.flatMap((project) =>
			project.contributions.flatMap((contribution) =>
				contribution.links.map((link) => ({ label: link.label, status: contribution.status }))
			)
		)
	);
	let pulls = $derived(links.filter((link) => link.label.startsWith('Pull request')));
	let stats = $derived([
		{ value: pulls.length, label: 'Pull requests' },
		{ value: pulls.filter((link) => link.status === 'merged').length, label: 'Merged' },
		{ value: links.filter((link) => link.label.startsWith('Issue')).length, label: 'Issues reported' }
	]);
</script>

{#snippet status(/** @type {string} */ value)}
	<span class="inline-flex items-center gap-1.5 text-ink">
		<span
			aria-hidden="true"
			class="size-[7px] shrink-0 rounded-full {isSettled(value)
				? 'bg-accent'
				: 'border-[1.5px] border-accent'}"
		></span>
		{statusLabel(value)}
	</span>
{/snippet}

<dl class="mb-5 flex flex-wrap gap-x-8 gap-y-3">
	{#each stats as stat (stat.label)}
		<div class="flex flex-row-reverse items-baseline justify-end gap-2">
			<dt class="text-[13px] text-ink-muted">{stat.label}</dt>
			<dd class="font-mono text-[18px] font-semibold text-accent">{stat.value}</dd>
		</div>
	{/each}
</dl>

<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
	{#each items as project, i (project.name)}
		<article
			use:reveal={{ delay: Math.min(i, 6) * 50 }}
			class="flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors duration-200 hover:border-line-strong"
		>
			<h4 class="text-[16px] leading-snug font-semibold">
				<a
					href={project.href}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 transition-colors hover:text-accent"
				>
					{project.name}
					<Icon name="arrowUpRight" size={14} class="text-ink-subtle" />
				</a>
			</h4>
			{#if project.tagline}
				<p class="mt-0.5 text-[12.5px] text-ink-subtle">{project.tagline}</p>
			{/if}

			<ul class="mt-4 divide-y divide-line">
				{#each project.contributions as contribution (contribution.links[0].href)}
					<li class="py-4 first:pt-0 last:pb-0">
						<p class="text-[13px]">{@render status(contribution.status)}</p>
						<p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{contribution.summary}</p>
						<p class="mt-3 flex flex-wrap gap-1.5">
							{#each contribution.links as link (link.href)}
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center rounded-md border border-line px-2 py-0.5 text-[12px] leading-5 font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
									>{link.label}</a
								>
							{/each}
						</p>
					</li>
				{/each}
			</ul>
		</article>
	{/each}
</div>
