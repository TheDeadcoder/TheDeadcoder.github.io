<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import Tag from '../Tag.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { projects, projectFilters } from '$data/projects.js';

	let filter = $state('all');
	let shown = $derived(filter === 'all' ? projects : projects.filter((p) => p.category === filter));
</script>

<SectionHeading
	icon="layers"
	eyebrow="Projects"
	title="Selected work"
	lead="Research pipelines, production AI systems and award-winning hackathon builds. Metrics are reported as measured — including the run that did not work."
/>

<div class="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
	{#each projectFilters as f (f.id)}
		<button
			type="button"
			onclick={() => (filter = f.id)}
			aria-pressed={filter === f.id}
			class="rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors
				{filter === f.id
				? 'border-transparent bg-ink text-bg'
				: 'border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink'}"
		>
			{f.label}
		</button>
	{/each}
	<span class="ml-1 font-mono text-[12px] text-ink-subtle">{shown.length} projects</span>
</div>

<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
	{#each shown as project, i (project.name)}
		<article
			use:reveal={{ delay: Math.min(i, 6) * 50 }}
			class="group flex flex-col rounded-2xl border bg-surface p-5 transition-colors duration-200 hover:border-line-strong
				{project.featured ? 'border-accent/25' : 'border-line'}"
		>
			<div class="mb-4 flex items-start gap-3">
				<img
					src={project.logo}
					alt=""
					width="36"
					height="36"
					loading="lazy"
					decoding="async"
					class="size-9 shrink-0 rounded-lg bg-surface-2 object-contain p-1 ring-1 ring-line"
				/>
				<div class="min-w-0 flex-1">
					<h3 class="text-[16px] leading-snug font-semibold">{project.name}</h3>
					<p class="mt-0.5 text-[12px] text-ink-subtle">{project.context}</p>
				</div>
			</div>

			{#if project.metrics?.length}
				<dl class="mb-4 flex flex-wrap gap-x-5 gap-y-2">
					{#each project.metrics as m}
						<div>
							<dd class="font-mono text-[15px] font-semibold text-accent">{m.value}</dd>
							<dt class="text-[11px] text-ink-subtle">{m.label}</dt>
						</div>
					{/each}
				</dl>
			{/if}

			<p class="flex-1 text-[14px] leading-relaxed text-ink-muted">{project.summary}</p>

			<div class="mt-4 flex flex-wrap gap-1.5">
				{#each project.stack.slice(0, 8) as tech}
					<Tag>{tech}</Tag>
				{/each}
				{#if project.stack.length > 8}
					<Tag>+{project.stack.length - 8}</Tag>
				{/if}
			</div>

			<div class="mt-5 flex items-center gap-2 border-t border-line pt-4">
				{#if project.repo}
					<a
						href={project.repo}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
					>
						<Icon name="github" size={14} />
						Code
					</a>
				{/if}
				{#if project.demo}
					<a
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
					>
						<Icon name="external" size={14} />
						{project.demoLabel ?? 'Demo'}
					</a>
				{/if}
				{#if !project.repo && !project.demo}
					<span class="text-[12.5px] text-ink-subtle">Private repository</span>
				{/if}
			</div>
		</article>
	{/each}
</div>
