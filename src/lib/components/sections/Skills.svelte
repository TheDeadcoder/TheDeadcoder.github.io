<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import Tag from '../Tag.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { skillGroups, certifications } from '$data/skills.js';
</script>

<SectionHeading
	icon="sparkles"
	eyebrow="Skills"
	title="Toolkit & certifications"
	lead="The stack I reach for, grouped by what I actually use it to build."
/>

<div class="grid items-start gap-4 lg:grid-cols-2">
	{#each skillGroups as group, i (group.name)}
		<section
			use:reveal={{ delay: i * 50 }}
			class="rounded-2xl border border-line bg-surface p-5 sm:p-6"
		>
			<div class="mb-4 flex items-start gap-3">
				<span
					class="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"
					aria-hidden="true"
				>
					<Icon name={group.icon} size={17} />
				</span>
				<div>
					<h3 class="text-[15.5px] font-semibold">{group.name}</h3>
					<p class="mt-0.5 text-[13px] text-ink-subtle">{group.summary}</p>
				</div>
			</div>

			<ul class="flex flex-wrap gap-2">
				{#each group.skills as skill (skill.name)}
					<li
						class="inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/70 py-1.5 pr-3 pl-2 text-[13px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
					>
						<img
							src={skill.icon}
							alt=""
							width="16"
							height="16"
							loading="lazy"
							decoding="async"
							class="size-4 shrink-0 object-contain"
						/>
						{skill.name}
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<h3 class="mt-12 mb-4 text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">
	Certifications
</h3>

<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
	{#each certifications as cert, i (cert.name)}
		<a
			use:reveal={{ delay: Math.min(i, 6) * 40 }}
			href={cert.href}
			target="_blank"
			rel="noopener noreferrer"
			class="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
		>
			<div class="mb-3 flex items-start gap-3">
				<img
					src={cert.logo}
					alt=""
					width="32"
					height="32"
					loading="lazy"
					decoding="async"
					class="size-8 shrink-0 rounded-lg bg-surface-2 object-contain p-1 ring-1 ring-line"
				/>
				<div class="min-w-0 flex-1">
					<h4 class="text-[14.5px] leading-snug font-semibold">{cert.name}</h4>
					<p class="mt-0.5 text-[12.5px] text-ink-subtle">{cert.issuer}</p>
				</div>
				<Icon
					name="arrowUpRight"
					size={14}
					class="mt-0.5 shrink-0 text-ink-subtle opacity-0 transition-opacity group-hover:opacity-100"
				/>
			</div>

			<div class="mt-auto flex flex-wrap gap-1.5 pt-1">
				{#each cert.topics.slice(0, 5) as topic}
					<Tag>{topic}</Tag>
				{/each}
				{#if cert.topics.length > 5}
					<Tag>+{cert.topics.length - 5}</Tag>
				{/if}
			</div>
		</a>
	{/each}
</div>
