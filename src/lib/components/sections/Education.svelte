<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import Logo from '../Logo.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { education } from '$data/education.js';
</script>

<SectionHeading
	icon="cap"
	eyebrow="Education"
	title="Academic background"
	lead="Computer Science & Engineering at BUET, preceded by Notre Dame College and Cumilla Zilla School."
/>

<div class="space-y-4">
	{#each education as school, i (school.institution)}
		<article
			use:reveal={{ delay: i * 60 }}
			class="rounded-2xl border border-line bg-surface p-5 sm:p-7"
		>
			<div class="flex flex-wrap items-start gap-4">
				<Logo src={school.logo} name={school.short} size={48} />

				<div class="min-w-0 flex-1">
					<h3 class="text-[17px] leading-snug font-semibold">{school.institution}</h3>
					<p class="mt-1 text-[14.5px] text-ink-muted">{school.degree}</p>
					<p class="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-subtle">
						<span class="font-mono">{school.period}</span>
						<span aria-hidden="true">·</span>
						<span class="inline-flex items-center gap-1.5">
							<Icon name="pin" size={13} />
							{school.location}
						</span>
					</p>
				</div>

				{#if school.result}
					<div
						class="rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-center"
					>
						<p class="text-[10.5px] tracking-wide text-ink-subtle uppercase">{school.result.label}</p>
						<p class="mt-0.5 font-mono text-[17px] font-semibold text-accent">
							{school.result.value}
						</p>
					</div>
				{/if}
			</div>

			{#if school.notes?.length || school.links?.length}
				<ul class="mt-5 space-y-2 border-t border-line pt-5">
					{#each school.notes as note}
						<li class="flex gap-3 text-[14px] text-ink-muted">
							<Icon name="check" size={15} class="mt-0.5 shrink-0 text-accent" />
							<span>{note}</span>
						</li>
					{/each}
					{#each school.links ?? [] as link}
						<li class="flex gap-3 text-[14px]">
							<Icon name="file" size={15} class="mt-0.5 shrink-0 text-accent" />
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="text-accent hover:underline">{link.label}</a
							>
						</li>
					{/each}
				</ul>
			{/if}

			{#if school.honours}
				<div class="mt-5 rounded-xl border border-line bg-surface-2/60 p-4">
					<p class="flex items-center gap-2 text-[14.5px] font-semibold">
						<Icon name="medal" size={16} class="text-accent" />
						{school.honours.title}
					</p>
					<p class="mt-1.5 text-[13.5px] text-ink-muted">{school.honours.description}</p>
					<div class="mt-3 flex flex-wrap gap-2">
						{#each school.honours.items as item}
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 text-[12.5px] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
							>
								<Icon name="file" size={13} />
								{item.label}
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if school.awards?.length}
				<ul class="mt-5 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
					{#each school.awards as award}
						<li class="rounded-xl border border-line bg-surface-2/60 p-4">
							<p class="flex items-start gap-2 text-[14.5px] font-semibold">
								<Icon name="trophy" size={15} class="mt-0.5 shrink-0 text-accent" />
								{award.title}
							</p>
							<p class="mt-1.5 text-[13.5px] text-ink-muted">{award.description}</p>
							{#if award.href}
								<a
									href={award.href}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-2 inline-flex items-center gap-1 text-[12.5px] font-medium text-accent hover:underline"
								>
									View certificate
									<Icon name="arrowUpRight" size={11} />
								</a>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}

			{#if school.courses?.length}
				<div class="mt-5 border-t border-line pt-5">
					<p class="mb-3 flex items-center gap-2 text-[14.5px] font-semibold">
						<Icon name="book" size={16} class="text-accent" />
						Notable coursework
					</p>
					<div class="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
						{#each school.courses as course}
							<p class="text-[13.5px] text-ink-muted">
								<span class="font-mono text-[12.5px] text-accent">{course.code}</span>
								<span class="mx-1.5 text-ink-subtle">·</span>{course.name}
							</p>
						{/each}
					</div>
				</div>
			{/if}
		</article>
	{/each}
</div>
