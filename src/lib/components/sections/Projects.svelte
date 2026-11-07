<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import Tag from '../Tag.svelte';
	import Environments from '../projects/Environments.svelte';
	import OpenSource from '../projects/OpenSource.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { projects, projectFilters } from '$data/projects.js';
	import { environments } from '$data/environments.js';
	import { allOpenSource } from '$data/opensource.js';

	let filter = $state('all');
	let shown = $derived(filter === 'all' ? projects : projects.filter((p) => p.category === filter));

	const parts = [
		{ id: 'projects-environments', label: 'RL and benchmark environments', count: environments.length },
		{ id: 'projects-builds', label: 'Projects', count: projects.length },
		{ id: 'projects-open-source', label: 'Open source', count: allOpenSource.length }
	];

	const subheading = 'mb-4 text-[13px] font-semibold tracking-wide text-ink-subtle uppercase';

	/**
	 * Scroll to a part of this tab. A hash link would switch tabs instead.
	 * @param {string} id
	 */
	function jump(id) {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
	}
</script>

<SectionHeading
	icon="layers"
	eyebrow="Projects"
	title="Selected work"
	lead="RL and benchmark environments, research pipelines, production AI systems, award-winning hackathon builds and open-source contributions. Metrics are reported as measured, including the run that did not work."
/>

<nav aria-label="Parts of this tab" class="-mt-4 mb-12 flex flex-wrap gap-2 sm:-mt-8">
	{#each parts as part (part.id)}
		<button
			type="button"
			onclick={() => jump(part.id)}
			class="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-2 pl-3.5 text-[13px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
		>
			{part.label}
			<span class="rounded-full bg-surface-2 px-1.5 font-mono text-[11px] leading-5 text-ink-subtle"
				>{part.count}</span
			>
		</button>
	{/each}
</nav>

<section id="projects-environments" aria-labelledby="projects-environments-title" class="scroll-mt-6">
	<h3 id="projects-environments-title" class={subheading}>RL and benchmark environments</h3>
	<Environments items={environments} />
</section>

<section id="projects-builds" aria-labelledby="projects-builds-title" class="mt-14 scroll-mt-6">
	<h3 id="projects-builds-title" class={subheading}>Projects</h3>

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
				<div class="mb-4 flex min-h-[3.5rem] items-start gap-3">
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
						<h4 class="text-[16px] leading-snug font-semibold">{project.name}</h4>
						<p class="mt-0.5 text-[12px] text-ink-subtle">{project.context}</p>
					</div>
				</div>

				{#if project.metrics?.length}
					<dl
						class="mb-4 grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(8.75rem,1fr))]"
					>
						{#each project.metrics as m}
							<div class="min-w-0 rounded-lg border border-line/80 bg-surface-2/60 px-2.5 py-2">
								<dd class="font-mono text-[15px] leading-tight font-semibold whitespace-nowrap text-accent">
									{m.value}
								</dd>
								<dt class="mt-1 text-[10.5px] leading-4 text-ink-subtle">
									{m.label}
								</dt>
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
</section>

<section id="projects-open-source" aria-labelledby="projects-open-source-title" class="mt-14 scroll-mt-6">
	<h3 id="projects-open-source-title" class={subheading}>Open source</h3>
	<OpenSource items={allOpenSource} />
</section>
